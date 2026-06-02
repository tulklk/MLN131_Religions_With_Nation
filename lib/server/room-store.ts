import { RoomState, Player, PowerUpType, LeaderboardEntry } from '../room-types'
import { QUIZ_QUESTIONS } from '../quiz-data'
import { supabaseAdmin } from './supabase-admin'

function genCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)]
  return code
}

function genId(): string {
  return Math.random().toString(36).slice(2, 9) + Date.now().toString(36)
}

const ALL_POWER_UPS: PowerUpType[] = ['double_points', 'shield', 'precision', 'lucky']
function randPowerUp(): PowerUpType {
  return ALL_POWER_UPS[Math.floor(Math.random() * ALL_POWER_UPS.length)]
}

async function getRoomRaw(code: string): Promise<RoomState | null> {
  const roomCode = code.toUpperCase()
  const { data, error } = await supabaseAdmin
    .from('quiz_rooms')
    .select('state')
    .eq('code', roomCode)
    .maybeSingle()

  if (error) {
    throw new Error(`Failed to get room ${roomCode}: ${error.message}`)
  }
  return (data?.state as RoomState | null) ?? null
}

async function saveRoom(room: RoomState): Promise<void> {
  const code = room.code.toUpperCase()
  const { error } = await supabaseAdmin
    .from('quiz_rooms')
    .upsert(
      {
        code,
        state: room,
      },
      { onConflict: 'code' },
    )
  if (error) {
    throw new Error(`Failed to save room ${code}: ${error.message}`)
  }
}

async function deleteRoom(code: string): Promise<void> {
  const roomCode = code.toUpperCase()
  const { error } = await supabaseAdmin.from('quiz_rooms').delete().eq('code', roomCode)
  if (error) {
    throw new Error(`Failed to delete room ${roomCode}: ${error.message}`)
  }
}

function buildLeaderboard(room: RoomState): LeaderboardEntry[] {
  return Object.values(room.players)
    .filter(p => p.id !== room.hostId) // host doesn't compete
    .sort((a, b) => b.score - a.score)
    .map((p, i) => ({
      rank: i + 1,
      playerId: p.id,
      name: p.name,
      score: p.score,
      streak: p.streak,
      lastEarned: room.currentAnswers[p.id]?.scoreEarned ?? 0,
      timeTakenMs: room.currentAnswers[p.id]?.timeTakenMs ?? null,
      isCorrect: room.currentAnswers[p.id]?.isCorrect,
    }))
}

// ── Create ──────────────────────────────────────────────────────────────────
export async function createRoom(hostName: string): Promise<{ room: RoomState; playerId: string }> {
  let code = genCode()
  for (let attempts = 0; attempts < 10; attempts++) {
    const existing = await getRoomRaw(code)
    if (!existing) break
    code = genCode()
  }

  const playerId = genId()
  const host: Player = {
    id: playerId, name: hostName,
    score: 0, streak: 0, maxStreak: 0, correct: 0, wrong: 0,
    powerUps: [], lastSeen: Date.now(),
  }

  const room: RoomState = {
    code, hostId: playerId, hostName,
    status: 'waiting',
    currentQ: 0, totalQ: QUIZ_QUESTIONS.length,
    questionStartedAt: 0,
    players: { [playerId]: host },
    currentAnswers: {},
    leaderboard: [],
    createdAt: Date.now(), lastActivity: Date.now(),
  }
  await saveRoom(room)
  return { room, playerId }
}

// ── Join ─────────────────────────────────────────────────────────────────────
export async function joinRoom(code: string, name: string): Promise<{ room: RoomState; playerId: string } | { error: string }> {
  const room = await getRoomRaw(code)
  if (!room) return { error: 'Không tìm thấy phòng' }
  if (room.status !== 'waiting') return { error: 'Phòng đã bắt đầu hoặc kết thúc' }
  if (Object.keys(room.players).length >= 40) return { error: 'Phòng đã đầy (tối đa 40 người)' }

  const playerId = genId()
  room.players[playerId] = {
    id: playerId, name,
    score: 0, streak: 0, maxStreak: 0, correct: 0, wrong: 0,
    powerUps: [], lastSeen: Date.now(),
  }
  room.lastActivity = Date.now()
  await saveRoom(room)
  return { room, playerId }
}

// ── Start ────────────────────────────────────────────────────────────────────
export async function startGame(code: string, hostId: string): Promise<RoomState | null> {
  const room = await getRoomRaw(code)
  if (!room || room.hostId !== hostId || room.status !== 'waiting') return null
  room.status = 'playing'
  room.currentQ = 0
  room.questionStartedAt = Date.now()
  room.currentAnswers = {}
  room.lastActivity = Date.now()
  await saveRoom(room)
  return room
}

// ── Answer ───────────────────────────────────────────────────────────────────
export async function submitAnswer(
  code: string,
  playerId: string,
  answerIndex: number,
  powerUpUsed: PowerUpType | null,
): Promise<{ success: boolean; room?: RoomState; error?: string }> {
  const room = await getRoomRaw(code)
  if (!room || room.status !== 'playing') return { success: false, error: 'Không hợp lệ' }
  if (room.currentAnswers[playerId]) return { success: false, error: 'Đã trả lời' }

  const player = room.players[playerId]
  if (!player) return { success: false, error: 'Không tìm thấy người chơi' }

  const timeTakenMs = Date.now() - room.questionStartedAt
  const q = QUIZ_QUESTIONS[room.currentQ]
  const isCorrect = answerIndex === q.correct

  // Validate and consume power-up
  if (powerUpUsed) {
    const idx = player.powerUps.indexOf(powerUpUsed)
    if (idx !== -1) player.powerUps.splice(idx, 1)
    else powerUpUsed = null // didn't actually have it
  }

  let scoreEarned = 0
  let luckyMultiplier: number | undefined

  if (isCorrect) {
    const timeBonus = Math.max(0, 1 - timeTakenMs / 15000)
    const newStreak = player.streak + 1
    const streakBonus = newStreak >= 3 ? (newStreak - 2) * 50 : 0
    const base = Math.round(100 + timeBonus * 100) + streakBonus

    let multiplier = 1
    if (powerUpUsed === 'double_points') multiplier = 2
    else if (powerUpUsed === 'lucky') {
      const options = [0.5, 1.5, 2]
      multiplier = options[Math.floor(Math.random() * options.length)]
      luckyMultiplier = multiplier
    }
    scoreEarned = Math.round(base * multiplier)

    player.streak = newStreak
    player.maxStreak = Math.max(player.maxStreak, newStreak)
    player.correct += 1
    player.score += scoreEarned

    // Award power-ups
    if (newStreak === 3 || newStreak === 6 || newStreak === 9) {
      if (player.powerUps.length < 3) player.powerUps.push(randPowerUp())
    }
    if (Math.random() < 0.15 && player.powerUps.length < 3) {
      player.powerUps.push(randPowerUp())
    }
  } else {
    // Shield keeps streak
    if (powerUpUsed !== 'shield') player.streak = 0
    player.wrong += 1
    // Small deduction for bomb-style wrong (optional flavour)
    if (powerUpUsed === 'lucky') {
      scoreEarned = -50
      player.score = Math.max(0, player.score - 50)
    }
  }

  player.lastSeen = Date.now()

  room.currentAnswers[playerId] = {
    playerId, answerIndex, timeTakenMs, isCorrect, scoreEarned, powerUpUsed, luckyMultiplier,
  }
  room.leaderboard = buildLeaderboard(room)
  room.lastActivity = Date.now()
  await saveRoom(room)
  return { success: true, room }
}

// ── Show post-question leaderboard ───────────────────────────────────────────
export async function showResults(code: string, hostId: string): Promise<RoomState | null> {
  const room = await getRoomRaw(code)
  if (!room || room.hostId !== hostId) return null
  room.status = 'post_question'
  room.leaderboard = buildLeaderboard(room)
  room.lastActivity = Date.now()
  await saveRoom(room)
  return room
}

// ── Next question ────────────────────────────────────────────────────────────
export async function nextQuestion(code: string, hostId: string): Promise<RoomState | null> {
  const room = await getRoomRaw(code)
  if (!room || room.hostId !== hostId) return null
  if (room.currentQ + 1 >= QUIZ_QUESTIONS.length) {
    room.status = 'finished'
    room.leaderboard = buildLeaderboard(room)
  } else {
    room.status = 'playing'
    room.currentQ += 1
    room.questionStartedAt = Date.now()
    room.currentAnswers = {}
  }
  room.lastActivity = Date.now()
  await saveRoom(room)
  return room
}

// ── End game ─────────────────────────────────────────────────────────────────
export async function endGame(code: string, hostId: string): Promise<RoomState | null> {
  const room = await getRoomRaw(code)
  if (!room || room.hostId !== hostId) return null
  room.status = 'finished'
  room.leaderboard = buildLeaderboard(room)
  room.lastActivity = Date.now()
  await saveRoom(room)
  return room
}

// ── Read ──────────────────────────────────────────────────────────────────────
export async function getRoom(code: string): Promise<RoomState | null> {
  return await getRoomRaw(code)
}

export async function touchPlayer(code: string, playerId: string): Promise<void> {
  const room = await getRoomRaw(code)
  if (!room?.players[playerId]) return
  room.players[playerId].lastSeen = Date.now()
  room.lastActivity = Date.now()
  await saveRoom(room)
}

export async function cleanupInactiveRooms(): Promise<void> {
  const cutoff = Date.now() - 3 * 60 * 60 * 1000
  const { data, error } = await supabaseAdmin.from('quiz_rooms').select('code, state')
  if (error) {
    throw new Error(`Failed to list rooms for cleanup: ${error.message}`)
  }
  for (const row of data ?? []) {
    const state = row.state as RoomState
    if (state.lastActivity < cutoff) {
      await deleteRoom(row.code)
    }
  }
}

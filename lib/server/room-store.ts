import { RoomState, Player, PlayerAnswer, PowerUpType, LeaderboardEntry } from '../room-types'
import { QUIZ_QUESTIONS } from '../quiz-data'

// Persist across hot-reloads in Next.js dev
declare global {
  // eslint-disable-next-line no-var
  var __roomStore: Map<string, RoomState> | undefined
}
const rooms: Map<string, RoomState> = global.__roomStore ?? (global.__roomStore = new Map())

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
export function createRoom(hostName: string): { room: RoomState; playerId: string } {
  let code = genCode()
  while (rooms.has(code)) code = genCode()

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
  rooms.set(code, room)
  return { room, playerId }
}

// ── Join ─────────────────────────────────────────────────────────────────────
export function joinRoom(code: string, name: string): { room: RoomState; playerId: string } | { error: string } {
  const room = rooms.get(code.toUpperCase())
  if (!room) return { error: 'Không tìm thấy phòng' }
  if (room.status !== 'waiting') return { error: 'Phòng đã bắt đầu hoặc kết thúc' }
  if (Object.keys(room.players).length >= 30) return { error: 'Phòng đã đầy (tối đa 30 người)' }

  const playerId = genId()
  room.players[playerId] = {
    id: playerId, name,
    score: 0, streak: 0, maxStreak: 0, correct: 0, wrong: 0,
    powerUps: [], lastSeen: Date.now(),
  }
  room.lastActivity = Date.now()
  return { room, playerId }
}

// ── Start ────────────────────────────────────────────────────────────────────
export function startGame(code: string, hostId: string): RoomState | null {
  const room = rooms.get(code)
  if (!room || room.hostId !== hostId || room.status !== 'waiting') return null
  room.status = 'playing'
  room.currentQ = 0
  room.questionStartedAt = Date.now()
  room.currentAnswers = {}
  room.lastActivity = Date.now()
  return room
}

// ── Answer ───────────────────────────────────────────────────────────────────
export function submitAnswer(
  code: string,
  playerId: string,
  answerIndex: number,
  powerUpUsed: PowerUpType | null,
): { success: boolean; room?: RoomState; error?: string } {
  const room = rooms.get(code)
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
    let base = Math.round(100 + timeBonus * 100) + streakBonus

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
  return { success: true, room }
}

// ── Show post-question leaderboard ───────────────────────────────────────────
export function showResults(code: string, hostId: string): RoomState | null {
  const room = rooms.get(code)
  if (!room || room.hostId !== hostId) return null
  room.status = 'post_question'
  room.leaderboard = buildLeaderboard(room)
  room.lastActivity = Date.now()
  return room
}

// ── Next question ────────────────────────────────────────────────────────────
export function nextQuestion(code: string, hostId: string): RoomState | null {
  const room = rooms.get(code)
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
  return room
}

// ── End game ─────────────────────────────────────────────────────────────────
export function endGame(code: string, hostId: string): RoomState | null {
  const room = rooms.get(code)
  if (!room || room.hostId !== hostId) return null
  room.status = 'finished'
  room.leaderboard = buildLeaderboard(room)
  room.lastActivity = Date.now()
  return room
}

// ── Read ──────────────────────────────────────────────────────────────────────
export function getRoom(code: string): RoomState | null {
  return rooms.get(code.toUpperCase()) ?? null
}

export function touchPlayer(code: string, playerId: string): void {
  const room = rooms.get(code)
  if (room?.players[playerId]) room.players[playerId].lastSeen = Date.now()
}

// Cleanup rooms inactive for 3 hours
if (typeof global.__cleanupRoomInterval === 'undefined') {
  global.__cleanupRoomInterval = setInterval(() => {
    const cutoff = Date.now() - 3 * 60 * 60 * 1000
    for (const [code, room] of rooms) {
      if (room.lastActivity < cutoff) rooms.delete(code)
    }
  }, 30 * 60 * 1000) as unknown as number
}
declare global { var __cleanupRoomInterval: number | undefined }

export type PowerUpType = 'double_points' | 'shield' | 'precision' | 'lucky'

export const POWER_UP_INFO: Record<PowerUpType, { icon: string; name: string; desc: string; color: string }> = {
  double_points: { icon: '⚡', name: 'Nhân Đôi', desc: 'Điểm câu này ×2', color: 'text-yellow-400 border-yellow-500/40 bg-yellow-500/10' },
  shield:        { icon: '🛡️', name: 'Khiên',    desc: 'Bảo vệ streak khi sai', color: 'text-blue-400 border-blue-500/40 bg-blue-500/10' },
  precision:     { icon: '🎯', name: 'Chính Xác', desc: 'Loại 2 đáp án sai',    color: 'text-green-400 border-green-500/40 bg-green-500/10' },
  lucky:         { icon: '🎲', name: 'May Mắn',  desc: 'Nhân ngẫu nhiên ×0.5/1.5/2', color: 'text-purple-400 border-purple-500/40 bg-purple-500/10' },
}

export interface Player {
  id: string
  name: string
  score: number
  streak: number
  maxStreak: number
  correct: number
  wrong: number
  powerUps: PowerUpType[]
  lastSeen: number
}

export interface PlayerAnswer {
  playerId: string
  answerIndex: number
  timeTakenMs: number
  isCorrect: boolean
  scoreEarned: number
  powerUpUsed: PowerUpType | null
  luckyMultiplier?: number
}

export interface LeaderboardEntry {
  rank: number
  playerId: string
  name: string
  score: number
  streak: number
  lastEarned: number
  timeTakenMs: number | null
  isCorrect?: boolean
}

export type RoomStatus = 'waiting' | 'playing' | 'post_question' | 'finished'

export interface RoomState {
  code: string
  hostId: string
  hostName: string
  status: RoomStatus
  currentQ: number
  totalQ: number
  questionStartedAt: number
  players: Record<string, Player>
  currentAnswers: Record<string, PlayerAnswer>
  leaderboard: LeaderboardEntry[]
  createdAt: number
  lastActivity: number
}

export interface RoomSession {
  code: string
  playerId: string
  isHost: boolean
  name: string
}

export interface ClientRoomState extends Omit<RoomState, 'hostId'> {
  myPlayerId: string
  isHost: boolean
}

'use client'

import { motion } from 'framer-motion'
import { LeaderboardEntry } from '@/lib/room-types'

interface Props {
  entries: LeaderboardEntry[]
  myPlayerId: string
  questionIndex: number
  totalQ: number
}

const RANK_STYLE = [
  'text-yellow-400 bg-yellow-500/10 border-yellow-500/40',
  'text-gray-300 bg-gray-500/10 border-gray-500/40',
  'text-orange-400 bg-orange-500/10 border-orange-500/40',
]

export default function MiniLeaderboard({ entries, myPlayerId, questionIndex, totalQ }: Props) {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-4">
        <span className="text-xs font-mono text-ghost/60 uppercase tracking-widest">
          Sau câu {questionIndex + 1}/{totalQ} · Bảng xếp hạng
        </span>
      </div>

      <div className="space-y-2">
        {entries.slice(0, 10).map((e, idx) => {
          const isMe = e.playerId === myPlayerId
          const styleBase = idx < 3 ? RANK_STYLE[idx] : 'text-ghost bg-surface/30 border-white/10'
          return (
            <motion.div
              key={e.playerId}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${styleBase} ${isMe ? 'ring-1 ring-white/30' : ''}`}
            >
              <span className="w-6 text-center font-mono font-black text-base">
                {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`}
              </span>
              <span className={`flex-1 font-viet font-semibold truncate ${isMe ? 'text-gold-400' : ''}`}>
                {e.name}{isMe ? ' (bạn)' : ''}
              </span>
              <div className="flex items-center gap-2 text-right">
                {e.lastEarned !== 0 && (
                  <span className={`text-xs font-mono ${e.isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                    {e.lastEarned > 0 ? `+${e.lastEarned}` : e.lastEarned}
                  </span>
                )}
                {e.streak >= 2 && (
                  <span className="text-xs text-orange-400 font-mono">🔥{e.streak}</span>
                )}
                <span className="font-mono font-bold text-sm">{e.score.toLocaleString()}</span>
              </div>
            </motion.div>
          )
        })}
        {entries.length === 0 && (
          <p className="text-center text-ghost/50 font-viet text-sm py-8">Chưa có người chơi nào trả lời</p>
        )}
      </div>
    </div>
  )
}

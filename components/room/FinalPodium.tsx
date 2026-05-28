'use client'

import { motion } from 'framer-motion'
import { LeaderboardEntry } from '@/lib/room-types'
import Link from 'next/link'

interface Props {
  entries: LeaderboardEntry[]
  myPlayerId: string
  isHost: boolean
}

const PODIUM = [
  { rank: 1, emoji: '🥇', height: 'h-28', bg: 'bg-yellow-500/20 border-yellow-500/40', text: 'text-yellow-400', label: '1ST' },
  { rank: 2, emoji: '🥈', height: 'h-20', bg: 'bg-gray-400/10 border-gray-400/30', text: 'text-gray-300', label: '2ND' },
  { rank: 3, emoji: '🥉', height: 'h-14', bg: 'bg-orange-500/10 border-orange-500/30', text: 'text-orange-400', label: '3RD' },
]

export default function FinalPodium({ entries, myPlayerId, isHost }: Props) {
  const top3 = PODIUM.map(p => ({ ...p, player: entries.find(e => e.rank === p.rank) ?? null }))
  // reorder for visual: 2nd, 1st, 3rd
  const visual = [top3[1], top3[0], top3[2]]

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4 pt-12" style={{ background: '#0f0e17' }}>
      {/* Confetti-like header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
        <div className="text-5xl mb-2">🏆</div>
        <h1 className="font-display text-4xl font-black text-white mb-1">Kết quả cuối cùng!</h1>
        <p className="text-ghost font-viet text-sm">Cảm ơn tất cả đã tham gia</p>
      </motion.div>

      {/* Podium visual */}
      <div className="flex items-end justify-center gap-3 mb-10">
        {visual.map((p, i) => (
          <motion.div
            key={p.rank}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 + 0.2 }}
            className="flex flex-col items-center"
          >
            {p.player && (
              <>
                <div className={`text-3xl mb-1 ${p.player.playerId === myPlayerId ? 'animate-bounce' : ''}`}>{p.emoji}</div>
                <div className={`text-xs font-viet font-bold mb-1 ${p.text} max-w-[90px] truncate text-center`}>
                  {p.player.name}
                  {p.player.playerId === myPlayerId ? ' 👈' : ''}
                </div>
                <div className="text-xs font-mono text-ghost/70 mb-2">{p.player.score.toLocaleString()} pts</div>
              </>
            )}
            <div className={`w-24 ${p.height} rounded-t-xl border ${p.bg} flex items-center justify-center`}>
              <span className={`font-display font-black text-xl ${p.text}`}>{p.label}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Full leaderboard */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="w-full max-w-md space-y-2 mb-8"
      >
        {entries.slice(3).map((e, idx) => (
          <div
            key={e.playerId}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl bg-surface/30 border border-white/8 ${e.playerId === myPlayerId ? 'ring-1 ring-white/20' : ''}`}
          >
            <span className="w-8 text-center font-mono text-ghost/60 text-sm">#{e.rank}</span>
            <span className={`flex-1 font-viet truncate ${e.playerId === myPlayerId ? 'text-gold-400 font-semibold' : 'text-white'}`}>
              {e.name}{e.playerId === myPlayerId ? ' (bạn)' : ''}
            </span>
            <span className="font-mono text-ghost text-sm">{e.score.toLocaleString()}</span>
          </div>
        ))}
      </motion.div>

      {/* Actions */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="flex gap-3">
        <Link
          href={isHost ? '/room' : '/room'}
          onClick={() => localStorage.removeItem('roomSession')}
          className="px-6 py-3 rounded-xl font-viet font-semibold text-sm text-ghost border border-white/15 hover:bg-surface/40 transition-colors"
        >
          {isHost ? '+ Tạo phòng mới' : '← Về trang chủ'}
        </Link>
        <Link
          href="/"
          className="px-6 py-3 rounded-xl font-viet font-semibold text-sm text-ink"
          style={{ background: 'linear-gradient(135deg, #f4e04d, #d4a017)' }}
        >
          Về trang chủ
        </Link>
      </motion.div>
    </div>
  )
}

'use client'

import { motion } from 'framer-motion'
import { LeaderboardEntry } from '@/lib/room-types'

const D = "'Cormorant Garamond', Georgia, serif"
const B = "'Lora', Georgia, serif"
const GOLD = '#C9A84C'
const PARCHMENT = '#F5EDD6'
const MUTED = 'rgba(245,237,214,0.55)'

interface Props {
  entries: LeaderboardEntry[]
  myPlayerId: string
  questionIndex: number
  totalQ: number
}

const RANK_COLORS = [
  { color: GOLD, bg: 'rgba(201,168,76,0.1)', border: 'rgba(201,168,76,0.3)' },
  { color: 'rgba(245,237,214,0.75)', bg: 'rgba(245,237,214,0.06)', border: 'rgba(245,237,214,0.2)' },
  { color: '#e8a060', bg: 'rgba(232,160,96,0.08)', border: 'rgba(232,160,96,0.28)' },
]

export default function MiniLeaderboard({ entries, myPlayerId, questionIndex, totalQ }: Props) {
  return (
    <div style={{ width: '100%', maxWidth: '480px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <span style={{ fontFamily: B, fontSize: '0.72rem', color: MUTED, textTransform: 'uppercase', letterSpacing: '0.18em' }}>
          Sau câu {questionIndex + 1}/{totalQ} · Bảng xếp hạng
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {entries.slice(0, 10).map((e, idx) => {
          const isMe = e.playerId === myPlayerId
          const rankStyle = idx < 3 ? RANK_COLORS[idx] : { color: MUTED, bg: 'rgba(201,168,76,0.04)', border: 'rgba(201,168,76,0.12)' }

          return (
            <motion.div
              key={e.playerId}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '0.65rem 1rem', borderRadius: '6px',
                background: rankStyle.bg, border: `1px solid ${rankStyle.border}`,
                outline: isMe ? `1px solid rgba(201,168,76,0.4)` : 'none',
              }}
            >
              <span style={{ width: '24px', textAlign: 'center', fontFamily: D, fontWeight: 700, fontSize: '0.95rem', color: rankStyle.color, flexShrink: 0 }}>
                {idx + 1}
              </span>
              <span style={{ flex: 1, fontFamily: B, fontSize: '0.9rem', color: isMe ? GOLD : PARCHMENT, fontWeight: isMe ? 600 : 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {e.name}{isMe ? ' (bạn)' : ''}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {e.lastEarned !== 0 && (
                  <span style={{ fontFamily: B, fontSize: '0.78rem', color: e.isCorrect ? '#7dc99a' : '#c87070' }}>
                    {e.lastEarned > 0 ? `+${e.lastEarned}` : e.lastEarned}
                  </span>
                )}
                {e.streak >= 2 && (
                  <span style={{ fontFamily: B, fontSize: '0.78rem', color: '#e8a060' }}>×{e.streak}</span>
                )}
                <span style={{ fontFamily: D, fontSize: '1rem', fontWeight: 700, color: rankStyle.color }}>{e.score.toLocaleString()}</span>
              </div>
            </motion.div>
          )
        })}
        {entries.length === 0 && (
          <p style={{ textAlign: 'center', fontFamily: B, fontSize: '0.88rem', color: MUTED, padding: '2rem 0' }}>
            Chưa có người chơi nào trả lời
          </p>
        )}
      </div>
    </div>
  )
}

'use client'

import { motion } from 'framer-motion'
import { LeaderboardEntry } from '@/lib/room-types'
import Link from 'next/link'

const D = "'Cormorant Garamond', Georgia, serif"
const B = "'Lora', Georgia, serif"
const GOLD = '#C9A84C'
const PARCHMENT = '#F5EDD6'
const MUTED = 'rgba(245,237,214,0.55)'
const BG: React.CSSProperties = {
  minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center',
  justifyContent: 'flex-start', padding: '3rem 1.5rem',
  backgroundImage: 'radial-gradient(ellipse at 50% 35%, #1e1508 0%, #0d0d0d 65%)',
  backgroundAttachment: 'fixed', backgroundSize: 'cover', backgroundColor: '#0D0D0D',
  color: PARCHMENT, fontFamily: B,
}

interface Props {
  entries: LeaderboardEntry[]
  myPlayerId: string
  isHost: boolean
}

const PODIUM_CONFIG = [
  { rank: 1, height: 112, color: GOLD, border: 'rgba(201,168,76,0.4)', bg: 'rgba(201,168,76,0.1)', label: '1' },
  { rank: 2, height: 80,  color: 'rgba(245,237,214,0.75)', border: 'rgba(245,237,214,0.25)', bg: 'rgba(245,237,214,0.05)', label: '2' },
  { rank: 3, height: 56,  color: '#e8a060', border: 'rgba(232,160,96,0.35)', bg: 'rgba(232,160,96,0.08)', label: '3' },
]

export default function FinalPodium({ entries, myPlayerId, isHost }: Props) {
  const podium = PODIUM_CONFIG.map(p => ({ ...p, player: entries.find(e => e.rank === p.rank) ?? null }))
  const visual = [podium[1], podium[0], podium[2]] // 2nd, 1st, 3rd visual order

  return (
    <div style={BG}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{ width: '44px', height: '2px', background: GOLD, margin: '0 auto 1.25rem', opacity: 0.55 }} />
        <h1 style={{ fontFamily: D, fontSize: '3rem', fontWeight: 700, color: PARCHMENT, lineHeight: 1.1, marginBottom: '0.4rem' }}>
          Kết quả cuối cùng
        </h1>
        <p style={{ fontFamily: B, fontSize: '0.88rem', color: MUTED, fontStyle: 'italic' }}>Cảm ơn tất cả đã tham gia</p>
      </motion.div>

      {/* Podium */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '0.75rem', marginBottom: '2.5rem' }}>
        {visual.map((p, i) => (
          <motion.div
            key={p.rank}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 + 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            {p.player && (
              <>
                <div style={{
                  fontFamily: D, fontSize: '1.5rem', fontWeight: 700, color: p.color,
                  marginBottom: '0.25rem', animation: p.player.playerId === myPlayerId ? 'bounce 1s infinite' : 'none',
                }}>
                  {p.rank}
                </div>
                <div style={{ fontFamily: B, fontSize: '0.78rem', fontWeight: 600, color: p.color, maxWidth: '90px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textAlign: 'center', marginBottom: '0.2rem' }}>
                  {p.player.name}{p.player.playerId === myPlayerId ? ' *' : ''}
                </div>
                <div style={{ fontFamily: B, fontSize: '0.72rem', color: MUTED, marginBottom: '0.5rem' }}>
                  {p.player.score.toLocaleString()} xu
                </div>
              </>
            )}
            <div style={{
              width: '88px', height: `${p.height}px`, borderRadius: '6px 6px 0 0',
              background: p.bg, border: `1px solid ${p.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontFamily: D, fontSize: '1.5rem', fontWeight: 700, color: p.color }}>{p.label}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Remaining leaderboard */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        style={{ width: '100%', maxWidth: '420px', display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '2rem' }}
      >
        {entries.slice(3).map(e => (
          <div key={e.playerId} style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            padding: '0.65rem 1rem', borderRadius: '6px',
            background: 'rgba(201,168,76,0.04)', border: '1px solid rgba(201,168,76,0.12)',
            outline: e.playerId === myPlayerId ? '1px solid rgba(201,168,76,0.35)' : 'none',
          }}>
            <span style={{ width: '24px', fontFamily: D, fontSize: '0.88rem', color: MUTED, textAlign: 'center' }}>#{e.rank}</span>
            <span style={{ flex: 1, fontFamily: B, fontSize: '0.9rem', color: e.playerId === myPlayerId ? GOLD : PARCHMENT, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {e.name}{e.playerId === myPlayerId ? ' (bạn)' : ''}
            </span>
            <span style={{ fontFamily: D, fontSize: '0.95rem', fontWeight: 600, color: MUTED }}>{e.score.toLocaleString()}</span>
          </div>
        ))}
      </motion.div>

      {/* Actions */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} style={{ display: 'flex', gap: '0.75rem' }}>
        <Link
          href="/room"
          onClick={() => localStorage.removeItem('roomSession')}
          style={{
            padding: '0.75rem 1.5rem', borderRadius: '6px', fontFamily: D, fontSize: '0.95rem',
            fontWeight: 600, color: MUTED, border: '1px solid rgba(245,237,214,0.15)',
            background: 'transparent', textDecoration: 'none',
          }}
        >
          {isHost ? 'Tạo phòng mới' : 'Quay lại'}
        </Link>
        <Link
          href="/landing.html"
          style={{
            padding: '0.75rem 1.5rem', borderRadius: '6px', fontFamily: D, fontSize: '0.95rem',
            fontWeight: 600, letterSpacing: '0.06em', color: '#0D0D0D', textDecoration: 'none',
            background: `linear-gradient(135deg, ${GOLD}, #a07830)`,
          }}
        >
          Về trang chủ
        </Link>
      </motion.div>
    </div>
  )
}

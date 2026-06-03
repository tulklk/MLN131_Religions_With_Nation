'use client'

import { motion } from 'framer-motion'
import { useQuizStore } from '@/lib/store/quiz-store'
import Link from 'next/link'

const D = "'Cormorant Garamond', Georgia, serif"
const B = "'Lora', Georgia, serif"
const GOLD = '#C9A84C'
const PARCHMENT = '#F5EDD6'
const MUTED = 'rgba(245,237,214,0.55)'
const BG: React.CSSProperties = {
  minHeight: '100vh',
  backgroundImage: 'radial-gradient(ellipse at 50% 35%, #1e1508 0%, #0d0d0d 65%)',
  backgroundAttachment: 'fixed',
  backgroundSize: 'cover',
  backgroundColor: '#0D0D0D',
  color: PARCHMENT,
  fontFamily: B,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem',
}

function getRank(pct: number) {
  if (pct >= 90) return { label: 'Xuất sắc!', sub: 'Nắm vững kiến thức chương 6', color: GOLD }
  if (pct >= 70) return { label: 'Tốt lắm!', sub: 'Hiểu tốt nội dung', color: GOLD }
  if (pct >= 50) return { label: 'Khá tốt!', sub: 'Cần ôn thêm một số phần', color: MUTED }
  return { label: 'Cần ôn thêm!', sub: 'Hãy đọc lại bài giảng Chương 6', color: '#c87070' }
}

export default function QuizResults() {
  const { coins, correctCount, wrongCount, maxStreak, questions, restartGame } = useQuizStore()
  const total = questions.length
  const pct = Math.round((correctCount / total) * 100)
  const rank = getRank(pct)

  return (
    <div style={BG}>
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: '100%', maxWidth: '460px' }}
      >
        {/* Rank */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ width: '44px', height: '2px', background: GOLD, margin: '0 auto 1.5rem', opacity: 0.55 }} />
          <motion.h2
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            style={{ fontFamily: D, fontSize: '3rem', fontWeight: 700, color: rank.color, marginBottom: '0.5rem', lineHeight: 1.1 }}
          >
            {rank.label}
          </motion.h2>
          <p style={{ fontFamily: B, fontSize: '0.88rem', color: MUTED, fontStyle: 'italic' }}>{rank.sub}</p>
          <p style={{ fontFamily: B, fontSize: '0.78rem', color: MUTED, marginTop: '0.25rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Kết quả Quiz MLN131 · Chương 6
          </p>
        </div>

        {/* Stats card */}
        <div style={{
          background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.22)',
          borderRadius: '8px', padding: '1.5rem', marginBottom: '1.5rem',
        }}>
          {/* Coins */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span style={{ fontFamily: B, fontSize: '0.85rem', color: MUTED }}>Tổng xu</span>
            <span style={{ fontFamily: D, fontSize: '1.5rem', fontWeight: 700, color: GOLD }}>{coins.toLocaleString()} xu</span>
          </div>

          <div style={{ height: '1px', background: 'rgba(201,168,76,0.12)', margin: '0 0 1rem' }} />

          {/* Correct / Wrong / Streak */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0.5rem', textAlign: 'center', marginBottom: '1rem' }}>
            {[
              { val: correctCount, label: 'Đúng', color: '#7dc99a' },
              { val: wrongCount, label: 'Sai', color: '#c87070' },
              { val: maxStreak, label: 'Max Streak', color: '#e8a060' },
            ].map(item => (
              <div key={item.label}>
                <div style={{ fontFamily: D, fontSize: '2rem', fontWeight: 700, color: item.color }}>{item.val}</div>
                <div style={{ fontFamily: B, fontSize: '0.75rem', color: MUTED, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{item.label}</div>
              </div>
            ))}
          </div>

          <div style={{ height: '1px', background: 'rgba(201,168,76,0.12)', margin: '0 0 1rem' }} />

          {/* Progress bar */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontFamily: B, fontSize: '0.8rem', color: MUTED }}>Tỉ lệ đúng</span>
              <span style={{ fontFamily: D, fontSize: '0.95rem', fontWeight: 700, color: rank.color }}>{pct}%</span>
            </div>
            <div style={{ height: '6px', background: 'rgba(201,168,76,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                style={{ height: '100%', borderRadius: '3px', background: `linear-gradient(90deg, ${GOLD}, #e8c870)` }}
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={restartGame}
            style={{
              width: '100%', padding: '1rem', borderRadius: '6px',
              fontFamily: D, fontSize: '1.1rem', fontWeight: 600, letterSpacing: '0.08em',
              color: '#0D0D0D', cursor: 'pointer', border: 'none',
              background: `linear-gradient(135deg, ${GOLD}, #a07830)`,
            }}
          >
            Chơi lại
          </motion.button>

          <Link
            href="/landing.html"
            style={{
              display: 'block', width: '100%', padding: '0.85rem', borderRadius: '6px',
              fontFamily: D, fontSize: '0.95rem', fontWeight: 600, letterSpacing: '0.08em',
              color: MUTED, border: '1px solid rgba(245,237,214,0.15)', background: 'transparent',
              textAlign: 'center', textDecoration: 'none',
            }}
          >
            Về trang chủ
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

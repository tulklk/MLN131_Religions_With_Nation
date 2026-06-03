'use client'

import { motion } from 'framer-motion'
import { useQuizStore } from '@/lib/store/quiz-store'

const D = "'Cormorant Garamond', Georgia, serif"
const B = "'Lora', Georgia, serif"
const GOLD = '#6B4A00'
const PARCHMENT = '#0D0703'
const MUTED = '#2A1C0C'
const CARD: React.CSSProperties = {
  background: 'rgba(184,134,11,0.07)',
  border: '1px solid rgba(184,134,11,0.28)',
  borderRadius: '8px',
}
const BG: React.CSSProperties = {
  minHeight: '100vh',
  backgroundImage: 'radial-gradient(ellipse at 50% 35%, #E8D9B8 0%, #FAF6EC 65%)',
  backgroundAttachment: 'fixed',
  backgroundSize: 'cover',
  backgroundColor: '#FAF6EC',
  color: PARCHMENT,
  fontFamily: B,
}

export default function QuizLobby() {
  const startGame = useQuizStore((s) => s.startGame)

  return (
    <div style={{ ...BG, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: '100%', maxWidth: '440px' }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span style={{
            display: 'inline-block', fontFamily: B, fontSize: '0.72rem', letterSpacing: '0.25em',
            textTransform: 'uppercase', color: GOLD, border: `1px solid rgba(201,168,76,0.3)`,
            background: 'rgba(201,168,76,0.06)', padding: '0.25rem 1rem', borderRadius: '20px',
            marginBottom: '1.25rem',
          }}>
            Chương 6 · Tôn giáo &amp; Dân tộc
          </span>
          <h1 style={{ fontFamily: D, fontSize: '3rem', fontWeight: 700, color: PARCHMENT, lineHeight: 1.1, marginBottom: '0.25rem' }}>
            Quiz MLN131
          </h1>
          <p style={{ fontFamily: B, fontSize: '0.9rem', color: MUTED, fontStyle: 'italic' }}>
            Phật giáo &amp; Công giáo đồng hành cùng Dân tộc
          </p>
        </div>

        {/* Divider */}
        <div style={{ width: '44px', height: '2px', background: GOLD, margin: '0 auto 2rem', opacity: 0.55 }} />

        {/* Info cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0.75rem', marginBottom: '1.75rem' }}>
          {[
            { value: '60', label: 'câu hỏi' },
            { value: '15s', label: 'mỗi câu' },
            { value: 'Streak', label: 'bonus xu' },
          ].map((item) => (
            <div key={item.label} style={{ ...CARD, padding: '1rem 0.75rem', textAlign: 'center' }}>
              <div style={{ fontFamily: D, fontSize: '1.6rem', fontWeight: 700, color: GOLD, lineHeight: 1 }}>{item.value}</div>
              <div style={{ fontFamily: B, fontSize: '0.78rem', color: MUTED, marginTop: '0.3rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{item.label}</div>
            </div>
          ))}
        </div>

        {/* Scoring info */}
        <div style={{ ...CARD, padding: '1.25rem 1.5rem', marginBottom: '2rem' }}>
          <p style={{ fontFamily: B, fontSize: '0.88rem', color: MUTED, lineHeight: 1.8 }}>
            <span style={{ color: PARCHMENT, fontWeight: 600 }}>100–200 xu</span> cho mỗi câu đúng (theo tốc độ)<br />
            <span style={{ color: PARCHMENT, fontWeight: 600 }}>Streak +50 xu</span> khi trả lời đúng liên tiếp ≥3 câu<br />
            <span style={{ color: PARCHMENT, fontWeight: 600 }}>Hết giờ</span> = 0 xu, mất streak
          </p>
        </div>

        {/* Primary CTA */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={startGame}
          style={{
            width: '100%', padding: '1rem', borderRadius: '6px',
            fontFamily: D, fontSize: '1.1rem', fontWeight: 600, letterSpacing: '0.08em',
            color: '#FAF6EC', cursor: 'pointer', border: 'none',
            background: `linear-gradient(135deg, ${GOLD}, #8B6914)`,
            marginBottom: '0.75rem',
          }}
        >
          Chơi đơn
        </motion.button>

        {/* Room button */}
        <a
          href="/room"
          style={{
            display: 'block', width: '100%', padding: '0.85rem', borderRadius: '6px',
            fontFamily: D, fontSize: '1rem', fontWeight: 600, letterSpacing: '0.08em',
            color: GOLD, border: `1.5px solid rgba(201,168,76,0.4)`, background: 'transparent',
            textAlign: 'center', textDecoration: 'none', marginBottom: '1.5rem',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(201,168,76,0.08)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
        >
          Tạo / Tham gia phòng thi
        </a>

        <p style={{ textAlign: 'center', fontFamily: B, fontSize: '0.78rem', color: MUTED }}>
          Ôn bài Chương 6 MLN131 · Phật giáo &amp; Công giáo
        </p>
      </motion.div>
    </div>
  )
}

'use client'

import { motion } from 'framer-motion'
import { useQuizStore } from '@/lib/store/quiz-store'
import TimerBar from './TimerBar'
import CoinCounter from './CoinCounter'

const D = "'Cormorant Garamond', Georgia, serif"
const B = "'Lora', Georgia, serif"
const GOLD = '#6B4A00'
const PARCHMENT = '#0D0703'
const MUTED = '#2A1C0C'
const BG: React.CSSProperties = {
  minHeight: '100vh',
  backgroundImage: 'radial-gradient(ellipse at 50% 35%, #E8D9B8 0%, #FAF6EC 65%)',
  backgroundAttachment: 'fixed',
  backgroundSize: 'cover',
  backgroundColor: '#FAF6EC',
  color: PARCHMENT,
  fontFamily: B,
  display: 'flex',
  flexDirection: 'column',
  padding: '1rem',
}

const ANSWER_STYLES = [
  { bg: 'rgba(139,26,26,0.07)', border: 'rgba(139,26,26,0.3)', dot: '#9B1A1A', hoverBg: 'rgba(139,26,26,0.13)' },
  { bg: 'rgba(40,80,160,0.07)', border: 'rgba(40,80,160,0.3)', dot: '#2E5A9E', hoverBg: 'rgba(40,80,160,0.13)' },
  { bg: 'rgba(184,134,11,0.07)', border: 'rgba(184,134,11,0.3)', dot: '#B8860B', hoverBg: 'rgba(184,134,11,0.13)' },
  { bg: 'rgba(85,107,47,0.07)', border: 'rgba(85,107,47,0.3)',  dot: '#556B2F', hoverBg: 'rgba(85,107,47,0.13)' },
]
const LABELS = ['A', 'B', 'C', 'D']

function categoryLabel(cat: string) {
  if (cat === 'phat-giao') return 'Phật giáo'
  if (cat === 'cong-giao') return 'Công giáo'
  if (cat === 'mac-lenin') return 'Mác-Lênin'
  return 'Pháp luật'
}
function diffLabel(d: string) {
  if (d === 'easy') return 'Cơ bản'
  if (d === 'medium') return 'Trung bình'
  return 'Nâng cao'
}

export default function QuizQuestion() {
  const { questions, currentIndex, streak, answer } = useQuizStore()
  const q = questions[currentIndex]

  return (
    <div style={BG}>
      {/* Top bar */}
      <div style={{ maxWidth: '680px', width: '100%', margin: '0 auto', paddingTop: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <CoinCounter />
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {streak >= 2 && (
              <motion.div
                initial={{ scale: 0, y: -10 }}
                animate={{ scale: 1, y: 0 }}
                style={{
                  fontFamily: B, fontSize: '0.78rem', fontWeight: 600,
                  color: '#e8a060', border: '1px solid rgba(232,160,96,0.4)',
                  background: 'rgba(232,160,96,0.1)', padding: '0.2rem 0.7rem', borderRadius: '20px',
                }}
              >
                Streak ×{streak}
              </motion.div>
            )}
            <span style={{ fontFamily: B, fontSize: '0.85rem', color: MUTED }}>
              {currentIndex + 1}<span style={{ opacity: 0.5 }}>/{questions.length}</span>
            </span>
          </div>
        </div>
        <TimerBar />
      </div>

      {/* Question */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: '680px', width: '100%', margin: '0 auto', paddingTop: '1.5rem', paddingBottom: '1.5rem' }}>
        <motion.div
          key={q.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Category + difficulty */}
          <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span style={{
              fontFamily: B, fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase',
              color: GOLD, border: '1px solid rgba(201,168,76,0.28)', background: 'rgba(201,168,76,0.06)',
              padding: '0.2rem 0.75rem', borderRadius: '20px',
            }}>
              {categoryLabel(q.category)}
            </span>
            <span style={{
              fontFamily: B, fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase',
              color: MUTED, border: '1px solid rgba(245,237,214,0.12)', background: 'rgba(245,237,214,0.04)',
              padding: '0.2rem 0.75rem', borderRadius: '20px',
            }}>
              {diffLabel(q.difficulty)}
            </span>
          </div>

          {/* Question text */}
          <div style={{
            background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.22)',
            borderRadius: '8px', padding: '1.5rem', marginBottom: '1.25rem',
          }}>
            <p style={{ fontFamily: D, fontSize: '1.35rem', fontWeight: 600, color: PARCHMENT, lineHeight: 1.5 }}>
              {q.question}
            </p>
          </div>

          {/* Answers */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.65rem' }}>
            {q.answers.map((ans, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => answer(i)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.85rem',
                  padding: '0.9rem 1.1rem', borderRadius: '8px', textAlign: 'left', cursor: 'pointer',
                  background: ANSWER_STYLES[i].bg,
                  border: `1px solid ${ANSWER_STYLES[i].border}`,
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = ANSWER_STYLES[i].hoverBg)}
                onMouseLeave={e => (e.currentTarget.style.background = ANSWER_STYLES[i].bg)}
              >
                <div style={{
                  width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
                  background: ANSWER_STYLES[i].dot, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: D, fontSize: '0.85rem', fontWeight: 700, color: '#fff',
                }}>
                  {LABELS[i]}
                </div>
                <span style={{ fontFamily: B, fontSize: '0.95rem', color: PARCHMENT, lineHeight: 1.5 }}>{ans}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

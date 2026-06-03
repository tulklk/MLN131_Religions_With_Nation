'use client'

import { motion } from 'framer-motion'
import { useQuizStore } from '@/lib/store/quiz-store'

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

export default function QuizFeedback() {
  const { questions, currentIndex, lastAnswerCorrect, lastCoinsEarned, streak, nextQuestion } = useQuizStore()
  const q = questions[currentIndex]
  const isCorrect = lastAnswerCorrect

  return (
    <div style={BG}>
      <motion.div
        initial={{ opacity: 0, scale: 0.93 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
        style={{ width: '100%', maxWidth: '460px' }}
      >
        {/* Result indicator */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            style={{
              height: '3px', borderRadius: '2px', marginBottom: '1.5rem',
              background: isCorrect
                ? `linear-gradient(90deg, transparent, ${GOLD}, transparent)`
                : 'linear-gradient(90deg, transparent, #8B1A1A, transparent)',
            }}
          />
          <motion.h2
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            style={{
              fontFamily: D, fontSize: '2.5rem', fontWeight: 700,
              color: isCorrect ? GOLD : '#c87070', marginBottom: '0.75rem',
            }}
          >
            {isCorrect ? 'Chính xác!' : 'Chưa đúng rồi!'}
          </motion.h2>

          {isCorrect && lastCoinsEarned > 0 && (
            <motion.div
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              style={{ display: 'inline-flex', gap: '0.4rem', alignItems: 'center' }}
            >
              <span style={{
                fontFamily: B, fontSize: '0.85rem', fontWeight: 600, color: GOLD,
                border: '1px solid rgba(201,168,76,0.35)', background: 'rgba(201,168,76,0.08)',
                padding: '0.25rem 0.85rem', borderRadius: '20px', marginRight: '0.5rem',
              }}>
                +{lastCoinsEarned.toLocaleString()} xu
              </span>
              {streak >= 3 && (
                <span style={{
                  fontFamily: B, fontSize: '0.85rem', fontWeight: 600, color: '#e8a060',
                  border: '1px solid rgba(232,160,96,0.35)', background: 'rgba(232,160,96,0.08)',
                  padding: '0.25rem 0.85rem', borderRadius: '20px',
                }}>
                  Streak ×{streak}
                </span>
              )}
            </motion.div>
          )}
        </div>

        {/* Correct answer (when wrong) */}
        {!isCorrect && (
          <div style={{
            background: 'rgba(40,120,80,0.12)', border: '1px solid rgba(40,120,80,0.4)',
            borderRadius: '8px', padding: '0.85rem 1.1rem', marginBottom: '1rem',
          }}>
            <span style={{ fontFamily: B, fontSize: '0.85rem', fontWeight: 600, color: '#7dc99a' }}>Đáp án đúng: </span>
            <span style={{ fontFamily: B, fontSize: '0.85rem', color: PARCHMENT }}>{q.answers[q.correct]}</span>
          </div>
        )}

        {/* Explanation */}
        <div style={{
          background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.22)',
          borderRadius: '8px', padding: '1.25rem 1.5rem', marginBottom: '1.75rem',
        }}>
          <p style={{ fontFamily: B, fontSize: '0.72rem', color: MUTED, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.6rem' }}>
            Giải thích
          </p>
          <p style={{ fontFamily: B, fontSize: '0.92rem', color: MUTED, lineHeight: 1.75 }}>
            {q.explanation}
          </p>
        </div>

        {/* Next button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={nextQuestion}
          style={{
            width: '100%', padding: '1rem', borderRadius: '6px',
            fontFamily: D, fontSize: '1.1rem', fontWeight: 600, letterSpacing: '0.08em',
            color: '#0D0D0D', cursor: 'pointer', border: 'none',
            background: `linear-gradient(135deg, ${GOLD}, #a07830)`,
          }}
        >
          Câu tiếp theo
        </motion.button>
      </motion.div>
    </div>
  )
}

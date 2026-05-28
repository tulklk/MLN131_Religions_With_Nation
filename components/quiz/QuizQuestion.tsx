'use client'

import { motion } from 'framer-motion'
import { useQuizStore } from '@/lib/store/quiz-store'
import TimerBar from './TimerBar'
import CoinCounter from './CoinCounter'

const ANSWER_COLORS = [
  { bg: 'bg-red-900/40 hover:bg-red-800/60 border-red-700/50', label: 'A', dot: 'bg-red-500' },
  { bg: 'bg-blue-900/40 hover:bg-blue-800/60 border-blue-700/50', label: 'B', dot: 'bg-blue-500' },
  { bg: 'bg-amber-900/40 hover:bg-amber-800/60 border-amber-700/50', label: 'C', dot: 'bg-amber-500' },
  { bg: 'bg-green-900/40 hover:bg-green-800/60 border-green-700/50', label: 'D', dot: 'bg-green-500' },
]

export default function QuizQuestion() {
  const { questions, currentIndex, streak, answer } = useQuizStore()
  const q = questions[currentIndex]

  return (
    <div className="min-h-screen flex flex-col p-4" style={{ background: '#0f0e17' }}>
      {/* Top bar */}
      <div className="max-w-2xl w-full mx-auto pt-4">
        <div className="flex items-center justify-between mb-4">
          <CoinCounter />
          <div className="flex items-center gap-3">
            {streak >= 2 && (
              <motion.div
                initial={{ scale: 0, y: -10 }}
                animate={{ scale: 1, y: 0 }}
                className="flex items-center gap-1 bg-orange-500/20 border border-orange-500/40 text-orange-400 text-xs font-mono font-bold px-2.5 py-1 rounded-full"
              >
                🔥 ×{streak}
              </motion.div>
            )}
            <span className="text-ghost text-sm font-mono">
              {currentIndex + 1}
              <span className="text-muted">/{questions.length}</span>
            </span>
          </div>
        </div>

        <TimerBar />
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col justify-center max-w-2xl w-full mx-auto py-6">
        <motion.div
          key={q.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          {/* Category badge */}
          <div className="mb-4">
            <span className="text-xs font-mono text-muted uppercase tracking-widest">
              {q.category === 'phat-giao' ? '🪷 Phật giáo' :
               q.category === 'cong-giao' ? '✝️ Công giáo' :
               q.category === 'mac-lenin' ? '📖 Mác-Lênin' : '⚖️ Pháp luật'}
              {' · '}
              {q.difficulty === 'easy' ? '⭐' : q.difficulty === 'medium' ? '⭐⭐' : '⭐⭐⭐'}
            </span>
          </div>

          {/* Question text */}
          <div className="bg-surface/50 border border-white/10 rounded-2xl p-6 mb-6">
            <p className="text-white font-viet text-xl font-semibold leading-relaxed">{q.question}</p>
          </div>

          {/* Answers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {q.answers.map((ans, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => answer(i)}
                className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer ${ANSWER_COLORS[i].bg}`}
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-black text-white flex-shrink-0 ${ANSWER_COLORS[i].dot}`}>
                  {ANSWER_COLORS[i].label}
                </div>
                <span className="text-white font-viet text-sm leading-snug">{ans}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

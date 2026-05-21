'use client'

import { motion } from 'framer-motion'
import { useQuizStore } from '@/lib/store/quiz-store'

export default function QuizFeedback() {
  const { questions, currentIndex, lastAnswerCorrect, lastCoinsEarned, streak, nextQuestion } = useQuizStore()
  const q = questions[currentIndex]
  const isCorrect = lastAnswerCorrect

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: '#0f0e17' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] }}
        className="w-full max-w-md"
      >
        {/* Result icon */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] }}
            className="text-7xl mb-3"
          >
            {isCorrect ? '✅' : '❌'}
          </motion.div>

          <h2 className="font-display text-2xl font-bold text-white mb-1">
            {isCorrect ? 'Chính xác!' : 'Chưa đúng rồi!'}
          </h2>

          {isCorrect && lastCoinsEarned > 0 && (
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-1.5 bg-gold-500/20 border border-gold-500/40 text-gold-400 font-mono font-bold px-3 py-1.5 rounded-full text-sm"
            >
              🪙 +{lastCoinsEarned.toLocaleString()} xu
            </motion.div>
          )}

          {isCorrect && streak >= 3 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 300 }}
              className="inline-flex items-center gap-1 bg-orange-500/20 border border-orange-500/40 text-orange-400 font-mono font-bold px-3 py-1.5 rounded-full text-sm ml-2"
            >
              🔥 STREAK ×{streak}
            </motion.div>
          )}
        </div>

        {/* Correct answer highlight (when wrong) */}
        {!isCorrect && (
          <div className="bg-green-900/30 border border-green-500/40 rounded-xl p-3 mb-4 text-sm">
            <span className="text-green-400 font-viet font-semibold">Đáp án đúng: </span>
            <span className="text-white font-viet">{q.answers[q.correct]}</span>
          </div>
        )}

        {/* Explanation */}
        <div className="bg-surface/50 border border-white/10 rounded-xl p-4 mb-6">
          <p className="text-xs text-ghost/60 font-viet uppercase tracking-wider mb-2">Giải thích</p>
          <p className="text-ghost font-viet text-sm leading-relaxed">{q.explanation}</p>
        </div>

        {/* Next button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={nextQuestion}
          className="w-full py-4 rounded-2xl font-viet font-bold text-lg text-ink transition-all duration-200"
          style={{ background: 'linear-gradient(135deg, #f4e04d, #d4a017)' }}
        >
          Câu tiếp theo →
        </motion.button>
      </motion.div>
    </div>
  )
}

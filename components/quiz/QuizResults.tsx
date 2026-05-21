'use client'

import { motion } from 'framer-motion'
import { useQuizStore } from '@/lib/store/quiz-store'
import Link from 'next/link'

function getRank(pct: number) {
  if (pct >= 90) return { emoji: '🏆', label: 'Xuất sắc!', color: 'text-gold-400' }
  if (pct >= 70) return { emoji: '🥇', label: 'Tốt lắm!', color: 'text-yellow-400' }
  if (pct >= 50) return { emoji: '🥈', label: 'Khá tốt!', color: 'text-ghost' }
  return { emoji: '📚', label: 'Cần ôn thêm!', color: 'text-blue-400' }
}

export default function QuizResults() {
  const { coins, correctCount, wrongCount, maxStreak, questions, restartGame } = useQuizStore()
  const total = questions.length
  const pct = Math.round((correctCount / total) * 100)
  const rank = getRank(pct)

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: '#0f0e17' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="w-full max-w-md"
      >
        {/* Rank */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] }}
            className="text-7xl mb-3"
          >
            {rank.emoji}
          </motion.div>
          <h2 className={`font-display text-3xl font-black mb-1 ${rank.color}`}>{rank.label}</h2>
          <p className="text-ghost font-viet text-sm">Kết quả Quiz MLN131 Chương 6</p>
        </div>

        {/* Stats */}
        <div className="bg-surface/40 border border-white/10 rounded-2xl p-6 mb-6 space-y-4">
          {/* Coins */}
          <div className="flex items-center justify-between">
            <span className="text-ghost font-viet text-sm">Tổng xu</span>
            <span className="font-mono font-black text-gold-400 text-xl">🪙 {coins.toLocaleString()}</span>
          </div>

          <div className="h-px bg-white/8" />

          {/* Correct / Wrong */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <div className="text-2xl font-display font-bold text-green-400">{correctCount}</div>
              <div className="text-ghost text-xs font-viet">Đúng</div>
            </div>
            <div>
              <div className="text-2xl font-display font-bold text-red-400">{wrongCount}</div>
              <div className="text-ghost text-xs font-viet">Sai</div>
            </div>
            <div>
              <div className="text-2xl font-display font-bold text-orange-400">{maxStreak}</div>
              <div className="text-ghost text-xs font-viet">Max Streak</div>
            </div>
          </div>

          <div className="h-px bg-white/8" />

          {/* Percentage bar */}
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-ghost font-viet">Tỉ lệ đúng</span>
              <span className={`font-mono font-bold ${rank.color}`}>{pct}%</span>
            </div>
            <div className="h-2.5 bg-surface-2 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                className="h-full rounded-full bg-gradient-to-r from-gold-500 to-gold-300"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={restartGame}
            className="w-full py-4 rounded-2xl font-viet font-bold text-lg text-ink"
            style={{ background: 'linear-gradient(135deg, #f4e04d, #d4a017)' }}
          >
            🔄 Chơi lại
          </motion.button>

          <Link
            href="/"
            className="w-full py-3 rounded-2xl font-viet font-semibold text-sm text-ghost border border-white/10 hover:bg-surface/40 transition-colors text-center"
          >
            ← Về trang chủ
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

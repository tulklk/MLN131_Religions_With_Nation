'use client'

import { motion } from 'framer-motion'
import { useQuizStore } from '@/lib/store/quiz-store'

export default function QuizLobby() {
  const startGame = useQuizStore((s) => s.startGame)

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: '#0f0e17' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-6xl mb-4">🏛️</div>
          <h1 className="font-display text-4xl font-black text-white mb-2">
            Quiz MLN131
          </h1>
          <div className="inline-block bg-gold-500/15 border border-gold-500/30 text-gold-400 text-xs font-mono font-bold px-3 py-1.5 rounded-full">
            Chương 6 · Tôn giáo & Dân tộc
          </div>
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { icon: '📝', value: '60', label: 'câu hỏi' },
            { icon: '⏱️', value: '15s', label: 'mỗi câu' },
            { icon: '🔥', value: 'Streak', label: 'bonus xu' },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-surface/50 border border-white/10 rounded-xl p-3 text-center"
            >
              <div className="text-2xl mb-1">{item.icon}</div>
              <div className="font-display font-bold text-white text-lg leading-none">{item.value}</div>
              <div className="text-ghost text-xs font-viet mt-0.5">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Scoring info */}
        <div className="bg-surface/30 border border-white/8 rounded-xl p-4 mb-8 text-sm font-viet text-ghost space-y-1.5">
          <p>🪙 <span className="text-white font-semibold">100–200 xu</span> cho mỗi câu đúng (theo tốc độ)</p>
          <p>🔥 <span className="text-white font-semibold">Streak ×50 xu</span> khi trả lời đúng liên tiếp ≥3 câu</p>
          <p>⏰ <span className="text-white font-semibold">Hết giờ</span> = 0 xu, mất streak</p>
        </div>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={startGame}
          className="w-full py-4 rounded-2xl font-viet font-bold text-lg text-ink transition-all duration-200 shadow-[0_0_40px_rgba(244,224,77,0.3)] hover:shadow-[0_0_60px_rgba(244,224,77,0.5)]"
          style={{ background: 'linear-gradient(135deg, #f4e04d, #d4a017)' }}
        >
          Chơi đơn
        </motion.button>

        <a
          href="/room"
          className="block w-full py-3 rounded-2xl font-viet font-semibold text-base text-white border border-white/20 bg-surface/30 hover:bg-surface/50 transition-colors text-center mt-3"
        >
          🏠 Tạo / Tham gia phòng thi
        </a>

        <p className="text-center text-muted text-xs font-viet mt-4">
          Ôn bài Chương 6 MLN131 · Phật giáo & Công giáo
        </p>
      </motion.div>
    </div>
  )
}

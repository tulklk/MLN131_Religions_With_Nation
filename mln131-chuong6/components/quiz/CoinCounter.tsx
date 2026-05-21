'use client'

import { useQuizStore } from '@/lib/store/quiz-store'

export default function CoinCounter() {
  const coins = useQuizStore((s) => s.coins)

  return (
    <div className="flex items-center gap-1.5 bg-surface/80 border border-gold-500/30 px-3 py-1.5 rounded-full">
      <span className="text-base">🪙</span>
      <span className="font-mono font-bold text-gold-400 tabular-nums text-sm">
        {coins.toLocaleString()}
      </span>
    </div>
  )
}

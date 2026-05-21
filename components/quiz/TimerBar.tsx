'use client'

import { useEffect, useRef } from 'react'
import { useQuizStore } from '@/lib/store/quiz-store'

const TOTAL = 15

export default function TimerBar() {
  const { timeLeft, setTimeLeft, timeOut, screen } = useQuizStore()
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (screen !== 'game') return
    setTimeLeft(TOTAL)
    intervalRef.current = setInterval(() => {
      useQuizStore.setState((s) => {
        if (s.timeLeft <= 1) {
          clearInterval(intervalRef.current!)
          s.timeOut()
          return { timeLeft: 0 }
        }
        return { timeLeft: s.timeLeft - 1 }
      })
    }, 1000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [screen])

  const pct = (timeLeft / TOTAL) * 100
  const color =
    pct > 50 ? '#4cc9f0' : pct > 25 ? '#f4a261' : '#e63946'

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs text-ghost/60 font-mono">Thời gian</span>
        <span
          className={`text-sm font-mono font-bold tabular-nums transition-colors ${
            timeLeft <= 5 ? 'text-red-400 animate-pulse' : 'text-white'
          }`}
        >
          {timeLeft}s
        </span>
      </div>

      <div className="h-2 bg-surface-2 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 linear"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  )
}

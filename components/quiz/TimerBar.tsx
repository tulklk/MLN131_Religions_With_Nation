'use client'

import { useEffect, useRef } from 'react'
import { useQuizStore } from '@/lib/store/quiz-store'

const TOTAL = 20
const D = "'Cormorant Garamond', Georgia, serif"
const B = "'Lora', Georgia, serif"
const GOLD = '#C9A84C'
const MUTED = 'rgba(245,237,214,0.55)'

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
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [screen])

  const pct = (timeLeft / TOTAL) * 100
  const color = pct > 50 ? GOLD : pct > 25 ? '#e8a060' : '#c87070'
  const urgent = timeLeft <= 5

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
        <span style={{ fontFamily: B, fontSize: '0.75rem', color: MUTED, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Thời gian
        </span>
        <span style={{
          fontFamily: D, fontSize: '0.95rem', fontWeight: 700, color: urgent ? '#c87070' : GOLD,
          animation: urgent ? 'pulse 1s infinite' : 'none',
        }}>
          {timeLeft}s
        </span>
      </div>
      <div style={{ height: '4px', background: 'rgba(201,168,76,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
        <div
          style={{
            height: '100%', borderRadius: '2px', backgroundColor: color,
            width: `${pct}%`, transition: 'width 1s linear, background-color 0.5s',
          }}
        />
      </div>
    </div>
  )
}

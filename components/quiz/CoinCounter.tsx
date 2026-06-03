'use client'

import { useQuizStore } from '@/lib/store/quiz-store'

const D = "'Cormorant Garamond', Georgia, serif"
const B = "'Lora', Georgia, serif"
const GOLD = '#C9A84C'

export default function CoinCounter() {
  const coins = useQuizStore((s) => s.coins)

  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
      background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.3)',
      padding: '0.3rem 0.85rem', borderRadius: '20px',
    }}>
      <span style={{ fontFamily: D, fontSize: '0.75rem', color: GOLD, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        Xu
      </span>
      <span style={{ fontFamily: D, fontSize: '1rem', fontWeight: 700, color: GOLD }}>
        {coins.toLocaleString()}
      </span>
    </div>
  )
}

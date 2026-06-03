'use client'

import { motion } from 'framer-motion'
import { PowerUpType, POWER_UP_INFO } from '@/lib/room-types'

const D = "'Cormorant Garamond', Georgia, serif"
const B = "'Lora', Georgia, serif"
const GOLD = '#C9A84C'
const MUTED = 'rgba(245,237,214,0.55)'

interface Props {
  powerUps: PowerUpType[]
  selected: PowerUpType | null
  onSelect: (p: PowerUpType | null) => void
  disabled?: boolean
}

export default function PowerUpBar({ powerUps, selected, onSelect, disabled }: Props) {
  if (powerUps.length === 0) return null

  return (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
      {powerUps.map((p, i) => {
        const info = POWER_UP_INFO[p]
        const isSelected = selected === p
        return (
          <motion.button
            key={`${p}-${i}`}
            whileHover={disabled ? {} : { scale: 1.05 }}
            whileTap={disabled ? {} : { scale: 0.95 }}
            onClick={() => !disabled && onSelect(isSelected ? null : p)}
            title={info.desc}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.35rem 0.85rem', borderRadius: '20px', cursor: disabled ? 'not-allowed' : 'pointer',
              fontFamily: B, fontSize: '0.82rem', fontWeight: 600,
              color: isSelected ? '#0D0D0D' : GOLD,
              background: isSelected ? GOLD : 'rgba(201,168,76,0.08)',
              border: `1px solid ${isSelected ? GOLD : 'rgba(201,168,76,0.35)'}`,
              opacity: disabled ? 0.4 : isSelected ? 1 : 0.85,
              transition: 'all 0.2s',
            }}
          >
            <span style={{ fontFamily: D, fontSize: '0.9rem', fontWeight: 700 }}>{info.name}</span>
          </motion.button>
        )
      })}
    </div>
  )
}

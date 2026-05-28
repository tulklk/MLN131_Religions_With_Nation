'use client'

import { motion } from 'framer-motion'
import { PowerUpType, POWER_UP_INFO } from '@/lib/room-types'

interface Props {
  powerUps: PowerUpType[]
  selected: PowerUpType | null
  onSelect: (p: PowerUpType | null) => void
  disabled?: boolean
}

export default function PowerUpBar({ powerUps, selected, onSelect, disabled }: Props) {
  if (powerUps.length === 0) return null

  return (
    <div className="flex gap-2 flex-wrap justify-center">
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
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-viet font-bold transition-all duration-200 ${info.color} ${
              isSelected ? 'ring-2 ring-white/40 scale-105' : 'opacity-80 hover:opacity-100'
            } ${disabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'}`}
          >
            <span>{info.icon}</span>
            <span>{info.name}</span>
          </motion.button>
        )
      })}
    </div>
  )
}

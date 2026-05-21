'use client'

import { motion } from 'framer-motion'
import { clsx } from 'clsx'

interface KeyFactCardProps {
  icon: React.ReactNode
  label: string
  value: string
  description: string
  accent: 'gold' | 'blue'
}

export default function KeyFactCard({ icon, label, value, description, accent }: KeyFactCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className={clsx(
        'relative p-6 rounded-xl border bg-surface transition-all duration-300 group',
        accent === 'gold'
          ? 'border-gold-500/30 hover:border-gold-500/60 hover:shadow-[0_0_60px_rgba(212,160,23,0.3)]'
          : 'border-blue-500/30 hover:border-blue-500/60 hover:shadow-[0_0_60px_rgba(29,79,196,0.3)]'
      )}
    >
      {/* Background gradient */}
      <div
        className={clsx(
          'absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300',
          accent === 'gold'
            ? 'bg-gradient-to-br from-gold-500/5 to-transparent'
            : 'bg-gradient-to-br from-blue-500/5 to-transparent'
        )}
      />

      <div className="relative flex flex-col items-center text-center gap-3">
        {/* Icon */}
        <div
          className={clsx(
            'text-3xl',
            accent === 'gold' ? 'text-gold-500' : 'text-blue-400'
          )}
        >
          {icon}
        </div>

        {/* Value */}
        <div
          className={clsx(
            'font-display font-bold text-4xl',
            accent === 'gold' ? 'text-gold-400' : 'text-blue-400'
          )}
        >
          {value}
        </div>

        {/* Label */}
        <div className="text-ghost text-xs font-viet uppercase tracking-widest font-semibold">
          {label}
        </div>

        {/* Description */}
        <p className="text-muted text-sm font-viet leading-relaxed">{description}</p>
      </div>
    </motion.div>
  )
}

'use client'

import { useRef, MouseEvent } from 'react'
import { clsx } from 'clsx'

interface GlowCardProps {
  children: React.ReactNode
  accent: 'gold' | 'blue'
  className?: string
}

export default function GlowCard({ children, accent, className }: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    const color = accent === 'gold' ? 'rgba(212,160,23,0.08)' : 'rgba(29,79,196,0.08)'
    card.style.background = `radial-gradient(circle at ${x}% ${y}%, ${color} 0%, #1f1f2e 60%)`
  }

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.background = '#1f1f2e'
    }
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={clsx(
        'rounded-xl border transition-all duration-300 cursor-default',
        accent === 'gold'
          ? 'border-gold-500/20 hover:border-gold-500/50 hover:shadow-[0_0_60px_rgba(212,160,23,0.3)]'
          : 'border-blue-500/20 hover:border-blue-500/50 hover:shadow-[0_0_60px_rgba(29,79,196,0.3)]',
        'bg-surface',
        className
      )}
    >
      {children}
    </div>
  )
}

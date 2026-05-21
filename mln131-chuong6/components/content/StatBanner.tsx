'use client'

import { useEffect, useRef, useState } from 'react'
import { clsx } from 'clsx'

interface StatItem {
  value: string
  unit: string
  label: string
  accent: 'gold' | 'blue' | 'white'
}

interface StatBannerProps {
  stats: StatItem[]
  layout?: 'horizontal' | 'grid'
}

function useCountUp(target: string, duration = 1500) {
  const [display, setDisplay] = useState('0')
  const startedRef = useRef(false)

  const numericTarget = parseFloat(target.replace(/[^0-9.]/g, ''))
  const suffix = target.replace(/[0-9.]/g, '')

  useEffect(() => {
    if (startedRef.current || isNaN(numericTarget)) return
    startedRef.current = true

    const startTime = performance.now()
    const step = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(eased * numericTarget)
      setDisplay(`${current}${suffix}`)
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [numericTarget, suffix, duration])

  return display
}

function StatItem({ value, unit, label, accent }: StatItem) {
  const animated = useCountUp(value)

  return (
    <div className="flex flex-col items-center text-center px-6">
      <div
        className={clsx(
          'font-display font-bold text-5xl leading-none',
          accent === 'gold' ? 'text-gold-400' : accent === 'blue' ? 'text-blue-400' : 'text-white'
        )}
      >
        {animated}
        <span className="text-2xl ml-1 font-normal">{unit}</span>
      </div>
      <p className="text-ghost text-xs font-viet uppercase tracking-wider mt-2 font-semibold">{label}</p>
    </div>
  )
}

export default function StatBanner({ stats, layout = 'horizontal' }: StatBannerProps) {
  return (
    <div
      className={clsx(
        layout === 'grid'
          ? 'grid grid-cols-2 md:grid-cols-4 gap-6'
          : 'flex flex-wrap justify-center items-center divide-x divide-white/10 gap-y-6'
      )}
    >
      {stats.map((stat, i) => (
        <StatItem key={i} {...stat} />
      ))}
    </div>
  )
}

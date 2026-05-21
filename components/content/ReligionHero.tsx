'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { clsx } from 'clsx'
import type { HeroStat } from '@/lib/phat-giao-content'

interface ReligionHeroProps {
  religion: 'buddhist' | 'catholic'
  badge: string
  title: string
  subtitle: string
  description: string
  stats: HeroStat[]
  DecorComponent: React.ComponentType<{ className?: string }>
  backgroundImage?: string
}

export default function ReligionHero({
  religion,
  badge,
  title,
  subtitle,
  description,
  stats,
  DecorComponent,
  backgroundImage,
}: ReligionHeroProps) {
  const isBuddhist = religion === 'buddhist'

  return (
    <section
      className={clsx(
        'relative min-h-[70vh] flex items-center overflow-hidden pt-24 pb-12',
        isBuddhist
          ? 'bg-gradient-to-br from-[#1a0f00] via-[#0d0d12] to-[#0d0d12]'
          : 'bg-gradient-to-br from-[#05112e] via-[#0d0d12] to-[#0d0d12]'
      )}
    >
      {backgroundImage && (
        <Image
          src={backgroundImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="img-in-frame"
          aria-hidden
        />
      )}

      <DecorComponent
        className={clsx(
          'absolute -right-16 top-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-10 animate-float',
          isBuddhist ? 'text-gold-500' : 'text-blue-500'
        )}
      />

      <div
        className={clsx(
          'absolute inset-0',
          backgroundImage
            ? isBuddhist
              ? 'bg-gradient-to-r from-[#1a0f00]/92 via-[#1a0f00]/75 to-transparent'
              : 'bg-gradient-to-r from-[#05112e]/92 via-[#05112e]/75 to-transparent'
            : 'bg-gradient-to-r from-ink/60 via-transparent to-transparent'
        )}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <span
            className={clsx(
              'inline-block text-xs font-mono font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border mb-6',
              isBuddhist
                ? 'text-gold-400 border-gold-500/40 bg-gold-500/10'
                : 'text-blue-400 border-blue-500/40 bg-blue-500/10'
            )}
          >
            {badge}
          </span>

          <h1
            className={clsx(
              'font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-2',
              isBuddhist ? 'text-[#d4a017]' : 'text-blue-400'
            )}
          >
            {title}
          </h1>

          <h2
            className={clsx(
              'font-display text-xl sm:text-2xl font-semibold mb-4',
              isBuddhist ? 'text-gradient-gold' : 'text-gradient-blue'
            )}
          >
            {subtitle}
          </h2>

          <p className="text-ghost text-lg font-viet leading-relaxed max-w-2xl mb-10">{description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                className={clsx(
                  'bg-surface rounded-xl p-4 border',
                  isBuddhist ? 'border-gold-500/20' : 'border-blue-500/30'
                )}
              >
                <span className="text-2xl mb-2 block">{stat.icon}</span>
                <p
                  className={clsx(
                    'font-mono font-bold text-sm',
                    isBuddhist ? 'text-gold-400' : 'text-blue-400'
                  )}
                >
                  {stat.value}
                </p>
                <p className="text-ghost text-xs font-viet mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

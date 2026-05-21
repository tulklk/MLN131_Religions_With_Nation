'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { clsx } from 'clsx'

interface SectionHeroProps {
  religion: 'buddhist' | 'catholic'
  title: string
  subtitle: string
  description: string
  DecorComponent: React.ComponentType<{ className?: string }>
  backgroundImage?: string
}

export default function SectionHero({
  religion,
  title,
  subtitle,
  description,
  DecorComponent,
  backgroundImage,
}: SectionHeroProps) {
  const isBuddhist = religion === 'buddhist'

  return (
    <section
      className={clsx(
        'relative min-h-[60vh] flex items-center overflow-hidden pt-24 pb-16',
        isBuddhist ? 'gradient-buddhist' : 'gradient-catholic'
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

      {/* Decor */}
      <DecorComponent
        className={clsx(
          'absolute -right-16 top-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-8',
          isBuddhist ? 'text-gold-500 animate-slow-spin' : 'text-blue-500 animate-slow-spin'
        )}
      />
      <div
        className={clsx(
          'absolute inset-0',
          backgroundImage
            ? isBuddhist
              ? 'bg-gradient-to-r from-[#1a0f00]/92 via-[#1a0f00]/70 to-[#1a0f00]/40'
              : 'bg-gradient-to-r from-[#05112e]/92 via-[#05112e]/70 to-[#05112e]/40'
            : isBuddhist
              ? 'bg-gradient-to-r from-[#1a0f00]/80 via-transparent to-transparent'
              : 'bg-gradient-to-r from-[#05112e]/80 via-transparent to-transparent'
        )}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="max-w-2xl"
        >
          <span
            className={clsx(
              'inline-block text-xs font-mono font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border mb-6',
              isBuddhist
                ? 'text-gold-400 border-gold-500/40 bg-gold-500/10'
                : 'text-blue-400 border-blue-500/40 bg-blue-500/10'
            )}
          >
            Chương 6 · MLN131
          </span>

          <h1 className="font-display text-5xl sm:text-6xl font-bold text-white leading-tight mb-2">
            {title}
          </h1>

          <h2
            className={clsx(
              'font-display text-2xl sm:text-3xl font-semibold mb-4',
              isBuddhist ? 'text-gradient-gold' : 'text-gradient-blue'
            )}
          >
            {subtitle}
          </h2>

          <p className="text-ghost text-lg font-viet leading-relaxed">{description}</p>
        </motion.div>
      </div>
    </section>
  )
}

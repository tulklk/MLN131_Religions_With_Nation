'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { clsx } from 'clsx'
import QuoteBlock from '@/components/content/QuoteBlock'
import TimelineThumbnail from '@/components/content/TimelineThumbnail'
import type { TimelineMilestoneItem } from '@/lib/timeline-data'

interface TimelineMilestoneProps {
  milestones: TimelineMilestoneItem[]
  sectionTitle: string
  accent: 'gold' | 'blue'
}

function MilestoneCard({
  item,
  accent,
  isInView,
  index,
  align,
}: {
  item: TimelineMilestoneItem
  accent: 'gold' | 'blue'
  isInView: boolean
  index: number
  align: 'left' | 'right'
}) {
  const isGold = accent === 'gold'
  const slideX = align === 'left' ? -40 : 40

  return (
    <motion.div
      initial={{ opacity: 0, x: slideX }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className={clsx(
        'w-full rounded-xl p-6 border',
        item.featured
          ? isGold
            ? 'bg-gold-500/8 border-gold-500/40'
            : 'bg-blue-500/8 border-blue-500/40'
          : 'bg-surface border-white/10',
        isGold && !item.featured && 'border-gold-500/20',
        !isGold && !item.featured && 'border-blue-500/20'
      )}
    >
      <div
        className={clsx(
          'flex flex-col gap-4',
          align === 'right' ? 'sm:flex-row-reverse' : 'sm:flex-row'
        )}
      >
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-2xl">{item.icon}</span>
            <span
              className={clsx(
                'text-xs font-mono font-bold tracking-widest',
                isGold ? 'text-gold-500' : 'text-blue-400'
              )}
            >
              {item.year}
            </span>
            {item.badge && (
              <span
                className={clsx(
                  'text-xs font-viet font-semibold px-2 py-0.5 rounded-full border',
                  isGold
                    ? 'text-gold-400 border-gold-500/40 bg-gold-500/10'
                    : 'text-blue-400 border-blue-500/40 bg-blue-500/10'
                )}
              >
                {item.badge}
              </span>
            )}
          </div>
          <h3 className="text-white font-viet font-semibold text-lg mb-3">{item.title}</h3>
          <p className="text-ghost text-sm font-viet leading-relaxed">{item.content}</p>
          {item.bullets && (
            <ul className="mt-4 space-y-2">
              {item.bullets.map((b) => (
                <li key={b} className="text-ghost text-sm font-viet flex gap-2">
                  <span className={isGold ? 'text-gold-500' : 'text-blue-400'}>•</span>
                  {b}
                </li>
              ))}
            </ul>
          )}
          {item.chips && (
            <div className="flex flex-wrap gap-2 mt-4">
              {item.chips.map((chip) => (
                <span
                  key={chip}
                  className="text-xs font-viet font-bold px-3 py-1.5 rounded-lg bg-gold-500/15 text-gold-400 border border-gold-500/30"
                >
                  {chip}
                </span>
              ))}
            </div>
          )}
          {item.highlightChip && (
            <p className="mt-4 inline-block text-sm font-viet font-bold tracking-wide px-4 py-2 rounded-lg bg-blue-500/15 text-blue-400 border border-blue-500/30">
              {item.highlightChip}
            </p>
          )}
          {item.stats && (
            <div className="flex flex-wrap gap-4 mt-4">
              {item.stats.map((s) => (
                <div key={s.label}>
                  <p className={clsx('font-mono font-bold', isGold ? 'text-gold-400' : 'text-blue-400')}>
                    {s.value}
                  </p>
                  <p className="text-ghost text-xs font-viet">{s.label}</p>
                </div>
              ))}
            </div>
          )}
          {item.quote && (
            <div className="mt-6">
              <QuoteBlock
                quote={item.quote.text}
                author={item.quote.author}
                role={item.quote.role}
                accent={accent}
              />
            </div>
          )}
        </div>
        <TimelineThumbnail
          src={item.image}
          alt={item.imageAlt}
          accent={accent}
          className="sm:w-44 sm:h-32 shrink-0"
        />
      </div>
    </motion.div>
  )
}

export default function TimelineMilestoneSection({
  milestones,
  sectionTitle,
  accent,
}: TimelineMilestoneProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const isGold = accent === 'gold'

  return (
    <section ref={ref} className="py-20 bg-ink">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="font-display text-3xl font-bold text-white mb-12 text-center"
        >
          {sectionTitle}
        </motion.h2>

        <div className="relative w-full">
          {/* Vertical spine — center on desktop, left on mobile */}
          <div
            className={clsx(
              'absolute top-0 bottom-0 w-0.5',
              'left-4 md:left-1/2 md:-translate-x-px',
              isGold
                ? 'bg-gradient-to-b from-gold-500/50 via-gold-500/20 to-transparent'
                : 'bg-gradient-to-b from-blue-500/50 via-blue-500/20 to-transparent'
            )}
          />

          <div className="space-y-12 md:space-y-16">
            {milestones.map((item, i) => {
              const side = item.side
              const isLeft = side === 'left'

              return (
                <div key={item.year + item.title} className="relative w-full">
                  {/* Dot on spine */}
                  <div
                    className={clsx(
                      'absolute z-10 w-3 h-3 rounded-full ring-4 ring-ink top-8',
                      'left-4 -translate-x-1/2 md:left-1/2 md:-translate-x-1/2',
                      isGold
                        ? 'bg-gold-500 shadow-[0_0_12px_rgba(212,160,23,0.6)]'
                        : 'bg-blue-500 shadow-[0_0_12px_rgba(29,79,196,0.6)]'
                    )}
                  />

                  {/* Card: left or right half on desktop */}
                  <div
                    className={clsx(
                      'w-full pl-10 md:pl-0 md:w-[calc(50%-2rem)]',
                      isLeft ? 'md:mr-auto md:pr-6' : 'md:ml-auto md:pl-6'
                    )}
                  >
                    <MilestoneCard
                      item={item}
                      accent={accent}
                      isInView={isInView}
                      index={i}
                      align={side}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

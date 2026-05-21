'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { clsx } from 'clsx'
import TimelineThumbnail from '@/components/content/TimelineThumbnail'

interface TimelineEventProps {
  year: string
  title: string
  description: string
  accent: 'gold' | 'blue'
  image: string
  imageAlt: string
  side?: 'left' | 'right'
  isLast?: boolean
}

export default function TimelineEvent({
  year,
  title,
  description,
  accent,
  image,
  imageAlt,
  side = 'right',
  isLast = false,
}: TimelineEventProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div ref={ref} className="relative flex items-start gap-0">
      {side === 'left' && (
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="hidden md:block w-[calc(50%-2rem)] pr-8 text-right"
        >
          <TimelineCard
            year={year}
            title={title}
            description={description}
            accent={accent}
            align="right"
            image={image}
            imageAlt={imageAlt}
          />
        </motion.div>
      )}

      <div className="relative flex flex-col items-center" style={{ width: '2rem', flexShrink: 0 }}>
        <div
          className={clsx(
            'w-3 h-3 rounded-full z-10 ring-4 ring-ink mt-1.5',
            accent === 'gold'
              ? 'bg-gold-500 shadow-[0_0_12px_rgba(212,160,23,0.6)]'
              : 'bg-blue-500 shadow-[0_0_12px_rgba(29,79,196,0.6)]'
          )}
        />
        {!isLast && (
          <div
            className={clsx(
              'w-px flex-1 mt-2',
              accent === 'gold'
                ? 'bg-gradient-to-b from-gold-500/50 to-gold-500/10'
                : 'bg-gradient-to-b from-blue-500/50 to-blue-500/10'
            )}
            style={{ minHeight: '3rem' }}
          />
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className={clsx('pl-6 pb-8', side === 'left' ? 'md:hidden' : 'flex-1')}
      >
        <TimelineCard
          year={year}
          title={title}
          description={description}
          accent={accent}
          align="left"
          image={image}
          imageAlt={imageAlt}
        />
      </motion.div>

      {side === 'left' && <div className="hidden md:block flex-1 pl-8" />}
    </div>
  )
}

function TimelineCard({
  year,
  title,
  description,
  accent,
  align,
  image,
  imageAlt,
}: {
  year: string
  title: string
  description: string
  accent: 'gold' | 'blue'
  align: 'left' | 'right'
  image: string
  imageAlt: string
}) {
  return (
    <div className={clsx('group', align === 'right' ? 'text-right' : 'text-left')}>
      <div
        className={clsx(
          'flex flex-col gap-3',
          align === 'right' ? 'sm:items-end' : 'sm:items-start',
          'sm:flex-row sm:gap-4',
          align === 'right' && 'sm:flex-row-reverse'
        )}
      >
        <div className={clsx('flex-1 min-w-0', align === 'right' ? 'sm:text-right' : 'sm:text-left')}>
          <span
            className={clsx(
              'text-xs font-mono font-bold tracking-widest',
              accent === 'gold' ? 'text-gold-500' : 'text-blue-400'
            )}
          >
            {year}
          </span>
          <h4 className="text-white font-viet font-semibold mt-0.5 mb-1">{title}</h4>
          <p className="text-ghost text-sm font-viet leading-relaxed">{description}</p>
        </div>
        <TimelineThumbnail
          src={image}
          alt={imageAlt}
          accent={accent}
          className={clsx(align === 'right' ? 'sm:ml-0' : 'sm:mr-0')}
        />
      </div>
    </div>
  )
}

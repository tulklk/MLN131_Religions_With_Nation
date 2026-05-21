'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { clsx } from 'clsx'
import type { ContributionItem } from '@/lib/phat-giao-content'
import { staggerContainer, fadeUpItem } from '@/lib/motion-presets'

interface ContributionGridProps {
  sectionTitle: string
  items: ContributionItem[]
  accent?: 'gold' | 'blue'
  columns?: 2 | 3
}

export default function ContributionGrid({
  sectionTitle,
  items,
  accent = 'gold',
  columns = 2,
}: ContributionGridProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const isGold = accent === 'gold'

  return (
    <section ref={ref} className="py-20 bg-ink-2">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {sectionTitle ? (
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="font-display text-3xl font-bold text-white mb-12 text-center"
          >
            {sectionTitle}
          </motion.h2>
        ) : null}

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className={clsx(
            'grid gap-4',
            columns === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-3'
          )}
        >
          {items.map((item) => (
            <motion.div
              key={item.title}
              variants={fadeUpItem}
              className={clsx(
                'bg-surface rounded-xl p-6 border transition-all duration-300 hover:-translate-y-1',
                isGold
                  ? 'border-gold-500/20 hover:border-gold-500/40'
                  : 'border-blue-500/20 hover:border-blue-500/40'
              )}
            >
              <span className="text-3xl mb-3 block">{item.icon}</span>
              <h3
                className={clsx(
                  'font-viet font-semibold mb-2',
                  isGold ? 'text-gold-400' : 'text-blue-400'
                )}
              >
                {item.title}
              </h3>
              <p className="text-ghost text-sm font-viet leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

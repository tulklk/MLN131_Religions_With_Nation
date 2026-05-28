'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeIn } from '@/lib/motion-presets'

interface ConclusionItemProps {
  heading: string
  description: string
}

interface ConclusionSectionProps {
  readonly title: string
  readonly items: readonly ConclusionItemProps[]
  readonly accent: 'gold' | 'blue'
}

export default function ConclusionSection({ title, items, accent }: ConclusionSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const accentColor = accent === 'gold' ? 'text-gold-400' : 'text-blue-400'
  const borderColor = accent === 'gold' ? 'border-gold-500/30' : 'border-blue-500/30'

  return (
    <section ref={ref} className="py-20 bg-ink border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          variants={fadeIn}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="font-display text-3xl font-bold text-white mb-12 text-center"
        >
          {title}
        </motion.h2>

        <div className="space-y-6">
          {items.map((item, index) => (
            <motion.div
              key={item.heading}
              variants={fadeIn}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              transition={{ delay: index * 0.1 }}
              className={`p-8 rounded-xl border bg-surface/50 ${borderColor}`}
            >
              <h3 className={`font-display text-xl font-bold ${accentColor} mb-3`}>
                {item.heading}
              </h3>
              <p className="text-ghost font-viet leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

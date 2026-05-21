'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { HorizontalMilestone } from '@/lib/cong-giao-content'
import { staggerContainer, fadeUpItem } from '@/lib/motion-presets'

interface HorizontalTimelineProps {
  sectionTitle: string
  milestones: HorizontalMilestone[]
}

export default function HorizontalTimeline({ sectionTitle, milestones }: HorizontalTimelineProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-20 bg-ink-2">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="font-display text-3xl font-bold text-white mb-12"
        >
          {sectionTitle}
        </motion.h2>

        <div className="hidden lg:block relative mb-8">
          <div className="absolute top-4 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/50 via-blue-500/30 to-transparent" />
          <div className="flex justify-between relative">
            {milestones.map((m) => (
              <div key={m.year} className="flex flex-col items-center w-1/4">
                <div className="w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(29,79,196,0.6)] ring-4 ring-ink-2 z-10" />
                <span className="text-blue-400 font-mono text-xs font-bold mt-3">{m.year}</span>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {milestones.map((m) => (
            <motion.div
              key={m.year}
              variants={fadeUpItem}
              className="bg-surface border border-blue-500/20 rounded-xl p-5 transition-all duration-300 hover:scale-[1.02] hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(29,79,196,0.15)] group"
            >
              <span className="text-blue-400 font-mono text-xs font-bold lg:hidden">{m.year}</span>
              <h3 className="text-white font-viet font-semibold mt-1 mb-2">{m.title}</h3>
              <p className="text-ghost text-sm font-viet leading-relaxed">{m.content}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { OriginParagraph, MiniTimelineItem } from '@/lib/phat-giao-content'
import { fadeIn } from '@/lib/motion-presets'

interface OriginTwoColumnProps {
  sectionTitle: string
  paragraphs: OriginParagraph[]
  miniTimeline: MiniTimelineItem[]
}

export default function OriginTwoColumn({
  sectionTitle,
  paragraphs,
  miniTimeline,
}: OriginTwoColumnProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-20 bg-ink-2">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          variants={fadeIn}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="font-display text-3xl font-bold text-white mb-12"
        >
          {sectionTitle}
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ delay: 0.1 }}
            className="space-y-8"
          >
            {paragraphs.map((p) => (
              <div key={p.title}>
                <h3 className="text-gold-400 font-viet font-semibold mb-3">{p.title}</h3>
                <p className="text-ghost font-viet leading-relaxed">{p.text}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ delay: 0.2 }}
            className="border-l-2 border-gold-500/40 pl-8 space-y-8"
          >
            {miniTimeline.map((item) => (
              <div key={item.year} className="relative">
                <span className="absolute -left-[2.15rem] top-1 w-3 h-3 rounded-full bg-gold-500 ring-4 ring-ink-2" />
                <span className="text-gold-500 font-mono text-xs font-bold tracking-widest">
                  {item.year}
                </span>
                <p className="text-white font-viet font-medium mt-1">{item.text}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

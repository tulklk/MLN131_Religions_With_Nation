'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { TIMELINE_PREVIEW } from '@/lib/timeline-data'
import TimelineThumbnail from '@/components/content/TimelineThumbnail'

export default function TimelinePreview() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="py-24 bg-ink">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-4xl font-bold text-white mb-3">Dòng chảy lịch sử</h2>
          <p className="text-ghost font-viet">Những mốc quan trọng của hai tôn giáo trong lịch sử Việt Nam</p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-gold-500/30 via-blue-500/30 to-transparent" />

          <div className="space-y-8">
            {TIMELINE_PREVIEW.map((ev, i) => (
              <motion.div
                key={ev.year + ev.title}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  delay: i * 0.1,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                }}
                className="group flex gap-6 pl-2"
              >
                <div className="flex-shrink-0 relative">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center ring-2 ring-ink z-10 relative ${
                      ev.accent === 'gold'
                        ? 'bg-gold-500/20 ring-gold-500/50'
                        : 'bg-blue-500/20 ring-blue-500/50'
                    }`}
                  >
                    <div
                      className={`w-2.5 h-2.5 rounded-full ${ev.accent === 'gold' ? 'bg-gold-500' : 'bg-blue-500'}`}
                    />
                  </div>
                </div>

                <div className="flex-1 flex flex-col sm:flex-row gap-4 pb-2 min-w-0">
                  <div className="flex-1 min-w-0">
                    <span
                      className={`text-xs font-mono font-bold tracking-widest ${
                        ev.accent === 'gold' ? 'text-gold-500' : 'text-blue-400'
                      }`}
                    >
                      {ev.year}
                    </span>
                    <h3 className="text-white font-viet font-semibold mt-0.5 mb-1">{ev.title}</h3>
                    <p className="text-ghost text-sm font-viet leading-relaxed">{ev.description}</p>
                  </div>
                  <TimelineThumbnail src={ev.image} alt={ev.imageAlt} accent={ev.accent} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

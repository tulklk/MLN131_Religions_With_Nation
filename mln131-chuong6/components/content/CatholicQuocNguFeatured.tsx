'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CONG_GIAO_QUOC_NGU } from '@/lib/cong-giao-content'
import { CONG_GIAO_CONTRIBUTIONS } from '@/lib/cong-giao-content'

export default function CatholicQuocNguFeatured() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const data = CONG_GIAO_QUOC_NGU

  return (
    <section ref={ref} className="py-20 bg-ink-2">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="font-display text-3xl font-bold text-white mb-10 text-center"
        >
          III. Đóng góp của Công giáo với Văn hóa Việt Nam
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="bg-blue-500/8 border border-blue-500/25 rounded-2xl p-6 md:p-8 mb-10"
        >
          <span className="text-5xl block mb-4">{data.icon}</span>
          <h3 className="font-display text-2xl font-bold text-white mb-4">{data.title}</h3>
          <p className="text-ghost font-viet leading-relaxed mb-8">{data.description}</p>

          <div className="flex flex-wrap gap-2 md:gap-4 mb-6">
            {data.miniTimeline.map((step, i) => (
              <div key={step.year} className="flex items-center gap-2">
                <div className="bg-surface border border-blue-500/30 rounded-lg px-3 py-2 min-w-[100px]">
                  <span className="text-blue-400 font-mono text-xs font-bold block">{step.year}</span>
                  <span className="text-ghost text-xs font-viet">{step.text}</span>
                </div>
                {i < data.miniTimeline.length - 1 && (
                  <span className="text-blue-500/50 hidden md:inline">→</span>
                )}
              </div>
            ))}
          </div>

          <p className="text-ghost/80 text-sm font-viet italic leading-relaxed">{data.meaning}</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {CONG_GIAO_CONTRIBUTIONS.map((item) => (
            <div
              key={item.title}
              className="bg-surface border border-blue-500/20 rounded-xl p-5"
            >
              <span className="text-2xl block mb-2">{item.icon}</span>
              <h4 className="text-blue-400 font-viet font-semibold mb-2">{item.title}</h4>
              <p className="text-ghost text-sm font-viet leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

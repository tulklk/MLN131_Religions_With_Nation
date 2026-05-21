'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { OriginCard } from '@/lib/phat-giao-content'
import { fadeIn } from '@/lib/motion-presets'

interface MarxLeninBlockProps {
  sectionTitle: string
  intro: string
  origins: OriginCard[]
  traits: OriginCard[]
  policies: string[]
}

export default function MarxLeninBlock({
  sectionTitle,
  intro,
  origins,
  traits,
  policies,
}: MarxLeninBlockProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-20 bg-ink border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          variants={fadeIn}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="font-display text-3xl font-bold text-white mb-12 text-center"
        >
          {sectionTitle}
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <motion.div variants={fadeIn} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
            <h3 className="text-gold-400 font-viet font-semibold text-lg mb-4">Bản chất & Nguồn gốc</h3>
            <p className="text-ghost font-viet leading-relaxed mb-6">{intro}</p>
            <div className="space-y-4">
              {origins.map((o) => (
                <div
                  key={o.title}
                  className="bg-surface/50 border border-gold-500/15 rounded-xl p-4"
                >
                  <div className="flex gap-3">
                    <span className="text-xl">{o.icon}</span>
                    <div>
                      <h4 className="text-white font-viet font-semibold text-sm">{o.title}</h4>
                      <p className="text-ghost text-sm font-viet leading-relaxed mt-1">
                        {o.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ delay: 0.15 }}
          >
            <h3 className="text-blue-400 font-viet font-semibold text-lg mb-4">Tính chất & Chính sách</h3>
            <div className="space-y-4 mb-8">
              {traits.map((t) => (
                <div
                  key={t.title}
                  className="bg-surface/50 border-l-[3px] border-l-blue-500 border border-white/5 rounded-r-xl p-4"
                >
                  <h4 className="text-white font-viet font-semibold text-sm">
                    {t.icon} {t.title}
                  </h4>
                  <p className="text-ghost text-sm font-viet leading-relaxed mt-1">{t.description}</p>
                </div>
              ))}
            </div>
            <h4 className="text-white font-viet font-semibold mb-3">Chính sách Việt Nam</h4>
            <ul className="space-y-2">
              {policies.map((p) => (
                <li key={p} className="text-ghost text-sm font-viet flex gap-2">
                  <span className="text-gold-400 shrink-0">-</span>
                  {p}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

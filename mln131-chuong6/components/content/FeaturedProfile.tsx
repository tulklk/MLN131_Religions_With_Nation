'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import QuoteBlock from '@/components/content/QuoteBlock'
import type { LifeEvent, ContributionHighlight } from '@/lib/cong-giao-content'

interface FeaturedProfileProps {
  portrait?: string
  portraitAlt?: string
  initials: string
  name: string
  nameVi: string
  years: string
  nationality: string
  lifeEvents: LifeEvent[]
  intro: string
  contributions: ContributionHighlight[]
  quote: { text: string; author: string; role?: string }
}

export default function FeaturedProfile({
  portrait,
  portraitAlt,
  initials,
  name,
  nameVi,
  years,
  nationality,
  lifeEvents,
  intro,
  contributions,
  quote,
}: FeaturedProfileProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-20 bg-ink">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="bg-blue-500/8 border border-blue-500/25 rounded-2xl p-6 md:p-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8">
            <div className="text-center lg:text-left">
              {portrait ? (
                <div className="relative w-32 h-32 rounded-full mx-auto lg:mx-0 mb-4 overflow-hidden border-2 border-blue-500/40 shadow-lg shadow-blue-500/20 bg-[#1a1a24]">
                  <Image
                    src={portrait}
                    alt={portraitAlt ?? name}
                    fill
                    sizes="128px"
                    className="object-cover object-center"
                  />
                </div>
              ) : (
                <div
                  className="w-20 h-20 rounded-full mx-auto lg:mx-0 flex items-center justify-center text-xl font-display font-bold text-white mb-4"
                  style={{ background: 'linear-gradient(135deg, #60a5fa, #1d4fc4)' }}
                >
                  {initials}
                </div>
              )}
              <h3 className="text-white font-display text-xl font-bold">{name}</h3>
              <p className="text-blue-400 font-viet text-sm">{nameVi}</p>
              <p className="text-ghost font-mono text-xs mt-2">{years}</p>
              <p className="text-muted text-xs font-viet mt-1">{nationality}</p>
              <div className="mt-6 space-y-2 text-left">
                {lifeEvents.map((e) => (
                  <div key={e.year} className="flex gap-2 text-sm">
                    <span className="text-blue-400 font-mono font-bold shrink-0">{e.year}</span>
                    <span className="text-ghost font-viet">→ {e.event}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-display text-2xl font-bold text-white mb-4">Di sản không thể xóa mờ</h3>
              <p className="text-ghost font-viet leading-relaxed mb-6">{intro}</p>
              <div className="space-y-4 mb-6">
                {contributions.map((c) => (
                  <div key={c.title} className="flex gap-3">
                    <span className="text-xl shrink-0">{c.icon}</span>
                    <div>
                      <h4 className="text-white font-viet font-semibold text-sm">{c.title}</h4>
                      <p className="text-ghost text-sm font-viet leading-relaxed">{c.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <QuoteBlock quote={quote.text} author={quote.author} role={quote.role} accent="blue" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

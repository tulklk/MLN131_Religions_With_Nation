'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { clsx } from 'clsx'
import {
  MARX_LENIN_SECTION,
  MARX_TABS,
  TAB_BAN_CHAT,
  TAB_TINH_CHAT,
  TAB_CHINH_SACH,
} from '@/lib/marx-lenin-content'
import { fadeIn } from '@/lib/motion-presets'

export default function MarxLeninTabs() {
  const [activeTab, setActiveTab] = useState(MARX_TABS[0].id)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-24 bg-ink">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mb-10"
        >
          <span className="inline-block text-xs font-mono font-bold uppercase tracking-widest text-ghost/70 border border-white/10 bg-white/5 px-4 py-2 rounded-full mb-4">
            {MARX_LENIN_SECTION.badge}
          </span>
          <h2 className="font-display text-4xl font-bold text-white mb-3">{MARX_LENIN_SECTION.title}</h2>
          <p className="text-ghost font-viet max-w-2xl mx-auto">{MARX_LENIN_SECTION.subtitle}</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {MARX_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={clsx(
                'font-viet font-semibold text-sm px-5 py-2.5 rounded-xl border transition-all duration-200',
                activeTab === tab.id
                  ? 'bg-white/10 border-gold-500/40 text-white'
                  : 'bg-transparent border-white/10 text-ghost hover:border-white/20'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="bg-surface/50 border border-white/10 rounded-2xl p-6 md:p-8"
          >
            {activeTab === 'ban-chat' && (
              <div>
                <p className="text-muted text-sm font-viet italic mb-6 border-l-2 border-gold-500/50 pl-4">
                  {TAB_BAN_CHAT.marxQuote}
                </p>
                <p className="text-ghost font-viet leading-relaxed mb-8">{TAB_BAN_CHAT.intro}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {TAB_BAN_CHAT.origins.map((o) => (
                    <div key={o.title} className="bg-ink/50 border border-gold-500/15 rounded-xl p-4">
                      <span className="text-2xl block mb-2">{o.icon}</span>
                      <h4 className="text-gold-400 font-viet font-semibold text-sm mb-2">{o.title}</h4>
                      <p className="text-ghost text-sm font-viet leading-relaxed">{o.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'tinh-chat' && (
              <div className="space-y-4">
                {TAB_TINH_CHAT.map((t, i) => (
                  <div
                    key={t.title}
                    className={clsx(
                      'rounded-xl p-5 border border-white/5',
                      i === 0 && 'border-l-[3px] border-l-gold-500',
                      i === 1 && 'border-l-[3px] border-l-blue-500',
                      i === 2 && 'border-l-[3px] border-l-gold-500/60'
                    )}
                  >
                    <h4 className="text-white font-viet font-semibold mb-2">
                      {t.icon} {t.title}
                    </h4>
                    <p className="text-ghost text-sm font-viet leading-relaxed">{t.description}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'chinh-sach' && (
              <div>
                <div className="bg-ink border border-blue-500/25 rounded-xl p-5 mb-6">
                  <p className="text-xs font-mono text-blue-400 mb-2">Hiến pháp 2013 — Điều 24</p>
                  <p className="text-ghost font-viet text-sm leading-relaxed italic">
                    &ldquo;{TAB_CHINH_SACH.constitution}&rdquo;
                  </p>
                </div>
                <p className="text-ghost font-viet text-sm mb-4">
                  <span className="text-blue-400 font-semibold">Luật Tín ngưỡng, tôn giáo 2016:</span>{' '}
                  {TAB_CHINH_SACH.law}
                </p>
                <ul className="space-y-2">
                  {TAB_CHINH_SACH.principles.map((p) => (
                    <li key={p} className="text-ghost text-sm font-viet flex gap-2">
                      <span className="text-gold-400 shrink-0">-</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

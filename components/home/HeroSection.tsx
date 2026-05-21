'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import LotusDecor from '@/components/ui/LotusDecor'
import CrossDecor from '@/components/ui/CrossDecor'

const variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-sacred">
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Lotus decor - top left */}
      <LotusDecor className="absolute -top-24 -left-24 w-96 h-96 text-gold-500 opacity-10 animate-slow-spin" />

      {/* Cross decor - bottom right */}
      <CrossDecor className="absolute -bottom-24 -right-24 w-96 h-96 text-blue-500 opacity-10 animate-slow-spin" />

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-gold-900/20 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-blue-900/20 blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div custom={0} variants={variants} initial="hidden" animate="visible">
          <span className="inline-block text-xs font-mono font-bold uppercase tracking-widest text-ghost/70 border border-white/10 bg-white/5 px-4 py-2 rounded-full mb-8">
            Chương 6 · MLN131 · Nhóm 5
          </span>
        </motion.div>

        {/* Main title */}
        <motion.h1
          custom={1}
          variants={variants}
          initial="hidden"
          animate="visible"
          className="font-display text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-2"
        >
          <span className="text-gradient-gold">Phật giáo</span>
          <span className="text-white/40 mx-3 font-light">&</span>
          <span className="text-gradient-blue">Công giáo</span>
        </motion.h1>

        <motion.h2
          custom={2}
          variants={variants}
          initial="hidden"
          animate="visible"
          className="font-display text-3xl sm:text-4xl font-bold text-gradient-unity mb-6"
        >
          Đồng hành cùng Dân tộc
        </motion.h2>

        <motion.p
          custom={3}
          variants={variants}
          initial="hidden"
          animate="visible"
          className="text-ghost text-lg font-viet leading-relaxed max-w-2xl mx-auto mb-10"
        >
          Vai trò lịch sử và hiện đại của hai tôn giáo lớn trong công cuộc xây dựng và bảo vệ
          đất nước Việt Nam qua các thời đại.
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={4}
          variants={variants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/chuong6/phat-giao"
            className="group flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-ink font-viet font-bold px-6 py-3 rounded-xl transition-all duration-200 hover:shadow-[0_0_30px_rgba(212,160,23,0.4)]"
          >
            Xem nội dung
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/quiz"
            className="flex items-center gap-2 border border-blue-500/60 text-blue-300 hover:bg-blue-500/10 hover:border-blue-400 font-viet font-semibold px-6 py-3 rounded-xl transition-all duration-200"
          >
            Chơi Quiz
          </Link>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          custom={5}
          variants={variants}
          initial="hidden"
          animate="visible"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ghost/40"
        >
          <span className="text-xs font-viet tracking-widest uppercase">Cuộn xuống</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent" />
        </motion.div>
      </div>
    </section>
  )
}

'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { BUDDHIST_HERO_IMAGE, CATHOLIC_HERO_IMAGE } from '@/lib/religion-images'

const cards = [
  {
    href: '/chuong6/phat-giao',
    image: BUDDHIST_HERO_IMAGE,
    icon: '🪷',
    title: 'Phật giáo Việt Nam',
    subtitle: 'Từ thế kỷ II đến nay',
    desc: 'Hành trình 2000 năm đồng hành cùng dân tộc — từ thời Bắc thuộc đến thiền phái Trúc Lâm Yên Tử và GHPGVN hiện đại.',
    accent: 'gold' as const,
    stats: ['2000+ năm lịch sử', '~80% dân số', 'GHPGVN 1981'],
    gradient: 'from-gold-900/60 to-transparent',
    border: 'border-gold-500/30 hover:border-gold-500/60',
    glow: 'hover:shadow-[0_0_60px_rgba(212,160,23,0.25)]',
    btnCls: 'bg-gold-500 hover:bg-gold-400 text-ink',
    tagCls: 'text-gold-400 bg-gold-500/10 border-gold-500/30',
  },
  {
    href: '/chuong6/cong-giao',
    image: CATHOLIC_HERO_IMAGE,
    icon: '✝️',
    title: 'Công giáo Việt Nam',
    subtitle: 'Từ năm 1533 đến nay',
    desc: 'Từ các thừa sai Dòng Tên đến Alexandre de Rhodes và chữ Quốc ngữ — Công giáo gắn kết đức tin với lòng yêu nước.',
    accent: 'blue' as const,
    stats: ['Từ năm 1533', '~7% dân số', 'HĐGM VN 1980'],
    gradient: 'from-blue-900/60 to-transparent',
    border: 'border-blue-500/30 hover:border-blue-500/60',
    glow: 'hover:shadow-[0_0_60px_rgba(29,79,196,0.25)]',
    btnCls: 'bg-blue-500 hover:bg-blue-400 text-white',
    tagCls: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
  },
]

export default function ChapterOverview() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-24 bg-ink-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-4xl font-bold text-white mb-3">Hai tôn giáo, một Dân tộc</h2>
          <p className="text-ghost font-viet max-w-2xl mx-auto">
            Khám phá hành trình lịch sử và đóng góp của Phật giáo và Công giáo trong sự nghiệp xây dựng đất nước Việt Nam.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.href}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            >
              <Link href={card.href} className="block group">
                <div
                  className={`relative overflow-hidden rounded-2xl border bg-surface transition-all duration-300 ${card.border} ${card.glow}`}
                >
                  <div className="img-frame aspect-[16/9] w-full">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="img-in-frame"
                    />
                    <span className="absolute top-4 left-4 z-10 text-4xl drop-shadow-lg">{card.icon}</span>
                  </div>

                  {/* Background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

                  <div className="relative p-8 pt-4">
                    {/* Header */}
                    <div className="flex items-start justify-end mb-4">
                      <span className={`text-xs font-mono font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border ${card.tagCls}`}>
                        {card.subtitle}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl font-bold text-white mb-3">{card.title}</h3>
                    <p className="text-ghost font-viet text-sm leading-relaxed mb-6">{card.desc}</p>

                    {/* Stats */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {card.stats.map((s) => (
                        <span key={s} className="text-xs font-viet text-muted bg-white/5 px-3 py-1 rounded-full border border-white/10">
                          {s}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className={`inline-flex items-center gap-2 font-viet font-bold text-sm px-5 py-2.5 rounded-xl transition-all duration-200 ${card.btnCls}`}>
                      Tìm hiểu thêm
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CompareTable from '@/components/content/CompareTable'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Chương 6 — Tôn giáo & Dân tộc | MLN131',
}

export default function Chuong6Page() {
  return (
    <>
      <Navbar />
      <main className="gradient-sacred min-h-screen">
        {/* Hero */}
        <section className="pt-32 pb-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs font-mono font-bold uppercase tracking-widest text-ghost/70 border border-white/10 bg-white/5 px-4 py-2 rounded-full mb-6">
            Chương 6 · MLN131 · Nhóm 5
          </span>
          <h1 className="font-display text-5xl sm:text-6xl font-black text-white mb-4">
            Tôn giáo & Dân tộc
          </h1>
          <h2 className="font-display text-2xl text-gradient-unity mb-6">
            Phật giáo & Công giáo đồng hành cùng Dân tộc Việt Nam
          </h2>
          <p className="text-ghost font-viet text-lg leading-relaxed max-w-2xl mx-auto">
            Tìm hiểu về nguồn gốc, quá trình phát triển và đóng góp của hai tôn giáo lớn trong
            lịch sử và hiện đại Việt Nam dưới góc nhìn Mác-Lênin.
          </p>
        </section>

        {/* Two cards */}
        <section className="pb-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                href: '/chuong6/phat-giao',
                icon: '🪷',
                title: 'Phật giáo Việt Nam',
                color: 'border-gold-500/40 hover:border-gold-500/70',
                btn: 'bg-gold-500 hover:bg-gold-400 text-ink',
              },
              {
                href: '/chuong6/cong-giao',
                icon: '✝️',
                title: 'Công giáo Việt Nam',
                color: 'border-blue-500/40 hover:border-blue-500/70',
                btn: 'bg-blue-500 hover:bg-blue-400 text-white',
              },
            ].map((card) => (
              <div key={card.href} className={`bg-surface/50 border rounded-2xl p-8 transition-all duration-300 ${card.color}`}>
                <div className="text-5xl mb-4">{card.icon}</div>
                <h3 className="font-display text-2xl font-bold text-white mb-6">{card.title}</h3>
                <Link href={card.href} className={`inline-flex items-center gap-2 font-viet font-bold px-5 py-2.5 rounded-xl transition-colors ${card.btn}`}>
                  Xem chi tiết <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Compare table */}
        <section className="pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-white mb-8 text-center">So sánh hai tôn giáo</h2>
          <CompareTable />
        </section>
      </main>
      <Footer />
    </>
  )
}

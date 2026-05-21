import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ReadingProgress from '@/components/layout/ReadingProgress'
import HeroSection from '@/components/home/HeroSection'
import ChapterOverview from '@/components/home/ChapterOverview'
import TimelinePreview from '@/components/home/TimelinePreview'
import MarxLeninTabs from '@/components/home/MarxLeninTabs'
import StatBanner from '@/components/content/StatBanner'
import Link from 'next/link'

const homeStats = [
  { value: '2000+', unit: 'năm', label: 'Phật giáo Việt Nam', accent: 'gold' as const },
  { value: '80', unit: '%', label: 'tín đồ Phật giáo', accent: 'gold' as const },
  { value: '7', unit: '%', label: 'tín đồ Công giáo', accent: 'blue' as const },
  { value: '1533', unit: '', label: 'Công giáo du nhập VN', accent: 'blue' as const },
]

export default function HomePage() {
  return (
    <>
      <ReadingProgress accent="mixed" />
      <Navbar />
      <main>
        <HeroSection />
        <ChapterOverview />

        {/* Stats section */}
        <section className="py-16 bg-ink border-y border-white/5">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <StatBanner stats={homeStats} />
          </div>
        </section>

        <TimelinePreview />

        <MarxLeninTabs />

        {/* Quiz CTA */}
        <section className="py-24 bg-ink-2">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display text-4xl font-bold text-white mb-4">Ôn bài cùng Quiz Game!</h2>
            <p className="text-ghost font-viet mb-8 text-lg leading-relaxed">
              20 câu hỏi về Phật giáo, Công giáo, Mác-Lênin và pháp luật tôn giáo.
              Kiếm xu, tạo streak và thử thách bản thân!
            </p>
            <Link
              href="/quiz"
              className="inline-flex items-center gap-2 font-viet font-bold text-lg text-ink px-8 py-4 rounded-2xl transition-all duration-200 hover:shadow-[0_0_40px_rgba(212,160,23,0.4)]"
              style={{ background: 'linear-gradient(135deg, #f4e04d, #d4a017)' }}
            >
              Bắt đầu chơi
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

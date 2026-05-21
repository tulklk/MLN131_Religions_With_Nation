import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ReadingProgress from '@/components/layout/ReadingProgress'
import ReligionHero from '@/components/content/ReligionHero'
import ImageGallery from '@/components/content/ImageGallery'
import HorizontalTimeline from '@/components/content/HorizontalTimeline'
import FeaturedProfile from '@/components/content/FeaturedProfile'
import TimelineMilestoneSection from '@/components/content/TimelineMilestone'
import CatholicQuocNguFeatured from '@/components/content/CatholicQuocNguFeatured'
import CrossDecor from '@/components/ui/CrossDecor'
import {
  CONG_GIAO_HERO,
  CONG_GIAO_HORIZONTAL,
  DE_RHODES_PROFILE,
} from '@/lib/cong-giao-content'
import { CATHOLIC_MILESTONES } from '@/lib/timeline-data'
import { CATHOLIC_IMAGES, CATHOLIC_HERO_IMAGE } from '@/lib/religion-images'

export const metadata = {
  title: 'Công giáo Việt Nam — Đồng hành cùng Dân tộc | MLN131',
}

export default function CongGiaoPage() {
  return (
    <>
      <ReadingProgress accent="blue" />
      <Navbar />
      <main>
        <ReligionHero
          religion="catholic"
          badge={CONG_GIAO_HERO.badge}
          title={CONG_GIAO_HERO.title}
          subtitle={CONG_GIAO_HERO.subtitle}
          description={CONG_GIAO_HERO.description}
          stats={CONG_GIAO_HERO.stats}
          DecorComponent={CrossDecor}
          backgroundImage={CATHOLIC_HERO_IMAGE}
        />

        <ImageGallery
          title="Nhà thờ & kiến trúc Công giáo Việt Nam"
          subtitle="Các công trình tôn giáo tiêu biểu — nơi gắn kết đức tin với bản sắc văn hóa địa phương."
          images={CATHOLIC_IMAGES}
          accent="blue"
        />

        <HorizontalTimeline
          sectionTitle="I. Con đường du nhập vào Việt Nam"
          milestones={CONG_GIAO_HORIZONTAL}
        />

        <FeaturedProfile {...DE_RHODES_PROFILE} />

        <TimelineMilestoneSection
          sectionTitle="II. Người Công giáo & Lịch sử Dân tộc"
          milestones={CATHOLIC_MILESTONES}
          accent="blue"
        />

        <CatholicQuocNguFeatured />
      </main>
      <Footer />
    </>
  )
}

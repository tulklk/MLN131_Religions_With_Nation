import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ReadingProgress from '@/components/layout/ReadingProgress'
import ReligionHero from '@/components/content/ReligionHero'
import ImageGallery from '@/components/content/ImageGallery'
import OriginTwoColumn from '@/components/content/OriginTwoColumn'
import TimelineMilestoneSection from '@/components/content/TimelineMilestone'
import ContributionGrid from '@/components/content/ContributionGrid'
import ConclusionSection from '@/components/content/ConclusionSection'
import MarxLeninBlock from '@/components/content/MarxLeninBlock'
import LotusDecor from '@/components/ui/LotusDecor'
import {
  PHAT_GIAO_HERO,
  PHAT_GIAO_ORIGIN,
  PHAT_GIAO_CONTRIBUTIONS,
  PHAT_GIAO_CURRENT_CONTRIBUTIONS,
  PHAT_GIAO_DAI_HOI_XIV,
  PHAT_GIAO_PARTY_PERSPECTIVE,
  PHAT_GIAO_CONCLUSION,
  PHAT_GIAO_MARX,
} from '@/lib/phat-giao-content'
import { PHAT_GIAO_MILESTONES } from '@/lib/timeline-data'
import { BUDDHIST_IMAGES, BUDDHIST_HERO_IMAGE } from '@/lib/religion-images'

export const metadata = {
  title: 'Phật giáo Việt Nam — Đồng hành cùng Dân tộc | MLN131',
}

export default function PhatGiaoPage() {
  return (
    <>
      <ReadingProgress accent="gold" />
      <Navbar />
      <main>
        <ReligionHero
          religion="buddhist"
          badge={PHAT_GIAO_HERO.badge}
          title={PHAT_GIAO_HERO.title}
          subtitle={PHAT_GIAO_HERO.subtitle}
          description={PHAT_GIAO_HERO.description}
          stats={PHAT_GIAO_HERO.stats}
          DecorComponent={LotusDecor}
          backgroundImage={BUDDHIST_HERO_IMAGE}
        />

        <ContributionGrid
          sectionTitle="I. Quan điểm của Đảng về tôn giáo trong giai đoạn mới"
          items={PHAT_GIAO_PARTY_PERSPECTIVE}
          accent="gold"
          columns={3}
        />

        <ImageGallery
          title="Di sản kiến trúc & văn hóa Phật giáo"
          subtitle="Những ngôi chùa, tháp và không gian thờ tự gắn với đời sống tinh thần người Việt qua nhiều thế kỷ."
          images={BUDDHIST_IMAGES}
          accent="gold"
        />

        <OriginTwoColumn
          sectionTitle={PHAT_GIAO_ORIGIN.sectionTitle}
          paragraphs={PHAT_GIAO_ORIGIN.paragraphs}
          miniTimeline={PHAT_GIAO_ORIGIN.miniTimeline}
        />

        <TimelineMilestoneSection
          sectionTitle="II. Phật giáo qua các thời kỳ lịch sử"
          milestones={PHAT_GIAO_MILESTONES}
          accent="gold"
        />

        <ContributionGrid
          sectionTitle="III. Đóng góp của Phật giáo với Dân tộc"
          items={PHAT_GIAO_CONTRIBUTIONS}
          accent="gold"
          columns={2}
        />

        <ContributionGrid
          sectionTitle="III.1. Đóng góp của Phật giáo hiện nay"
          items={PHAT_GIAO_CURRENT_CONTRIBUTIONS}
          accent="gold"
          columns={2}
        />

        <ContributionGrid
          sectionTitle="IV. Vai trò của Phật giáo liên hệ Đại hội XIV"
          items={PHAT_GIAO_DAI_HOI_XIV}
          accent="gold"
          columns={3}
        />

        <MarxLeninBlock
          sectionTitle={PHAT_GIAO_MARX.sectionTitle}
          intro={PHAT_GIAO_MARX.intro}
          origins={PHAT_GIAO_MARX.origins}
          traits={PHAT_GIAO_MARX.traits}
          policies={PHAT_GIAO_MARX.policies}
        />

        <ConclusionSection
          title="V. Kết luận"
          items={PHAT_GIAO_CONCLUSION}
          accent="gold"
        />
      </main>
      <Footer />
    </>
  )
}

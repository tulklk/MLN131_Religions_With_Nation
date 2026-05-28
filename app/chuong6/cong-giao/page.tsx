import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ReadingProgress from '@/components/layout/ReadingProgress'
import ReligionHero from '@/components/content/ReligionHero'
import ImageGallery from '@/components/content/ImageGallery'
import HorizontalTimeline from '@/components/content/HorizontalTimeline'
import FeaturedProfile from '@/components/content/FeaturedProfile'
import TimelineMilestoneSection from '@/components/content/TimelineMilestone'
import CatholicQuocNguFeatured from '@/components/content/CatholicQuocNguFeatured'
import ContributionGrid from '@/components/content/ContributionGrid'
import ConclusionSection from '@/components/content/ConclusionSection'
import QuoteBlock from '@/components/content/QuoteBlock'
import MarxLeninBlock from '@/components/content/MarxLeninBlock'
import CitationText from '@/components/content/CitationText'
import CrossDecor from '@/components/ui/CrossDecor'
import {
  CONG_GIAO_HERO,
  CONG_GIAO_HORIZONTAL,
  DE_RHODES_PROFILE,
  CONG_GIAO_CONTRIBUTIONS,
  CONG_GIAO_CURRENT_CONTRIBUTIONS,
  CONG_GIAO_TRADITION,
  CONG_GIAO_PARTY_PERSPECTIVE,
  CONG_GIAO_PARTY_PERSPECTIVE_CITATION,
  CONG_GIAO_DAI_HOI_XIV,
  CONG_GIAO_DAI_HOI_XIV_CITATION,
  CONG_GIAO_CONCLUSION,
  CONG_GIAO_HIGHLIGHT_QUOTE,
  CONG_GIAO_MARX,
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

        <ContributionGrid
          sectionTitle="I. Quan điểm của Đảng về tôn giáo trong giai đoạn mới"
          items={CONG_GIAO_PARTY_PERSPECTIVE}
          accent="blue"
          columns={3}
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CitationText
            source={CONG_GIAO_PARTY_PERSPECTIVE_CITATION.source}
            detail={CONG_GIAO_PARTY_PERSPECTIVE_CITATION.detail}
          />
        </div>

        <ImageGallery
          title="Nhà thờ & kiến trúc Công giáo Việt Nam"
          subtitle="Các công trình tôn giáo tiêu biểu — nơi gắn kết đức tin với bản sắc văn hóa địa phương."
          images={CATHOLIC_IMAGES}
          accent="blue"
        />

        <HorizontalTimeline
          sectionTitle="II. Con đường du nhập vào Việt Nam"
          milestones={CONG_GIAO_HORIZONTAL}
        />

        <FeaturedProfile {...DE_RHODES_PROFILE} />

        <TimelineMilestoneSection
          sectionTitle="III. Người Công giáo & Lịch sử Dân tộc"
          milestones={CATHOLIC_MILESTONES}
          accent="blue"
        />

        <CatholicQuocNguFeatured />

        <ContributionGrid
          sectionTitle="III.1. Quá trình gắn bó với dân tộc"
          items={CONG_GIAO_TRADITION}
          accent="blue"
          columns={3}
        />

        <div className="py-12 bg-ink px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <QuoteBlock
              quote={CONG_GIAO_HIGHLIGHT_QUOTE.text}
              author={CONG_GIAO_HIGHLIGHT_QUOTE.source}
              accent="blue"
            />
          </div>
        </div>

        <ContributionGrid
          sectionTitle="IV. Đóng góp của Công giáo với Dân tộc"
          items={CONG_GIAO_CONTRIBUTIONS}
          accent="blue"
          columns={3}
        />

        <ContributionGrid
          sectionTitle="IV.1. Đóng góp của Công giáo hiện nay"
          items={CONG_GIAO_CURRENT_CONTRIBUTIONS}
          accent="blue"
          columns={2}
        />

        <ContributionGrid
          sectionTitle="V. Vai trò của Công giáo liên hệ Đại hội XIV"
          items={CONG_GIAO_DAI_HOI_XIV}
          accent="blue"
          columns={3}
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CitationText
            source={CONG_GIAO_DAI_HOI_XIV_CITATION.source}
            detail={CONG_GIAO_DAI_HOI_XIV_CITATION.detail}
          />
        </div>

        <MarxLeninBlock
          sectionTitle={CONG_GIAO_MARX.sectionTitle}
          intro={CONG_GIAO_MARX.intro}
          origins={CONG_GIAO_MARX.origins}
          traits={CONG_GIAO_MARX.traits}
          policies={CONG_GIAO_MARX.policies}
        />

        <ConclusionSection
          title="VII. Kết luận"
          items={CONG_GIAO_CONCLUSION}
          accent="blue"
        />
      </main>
      <Footer />
    </>
  )
}

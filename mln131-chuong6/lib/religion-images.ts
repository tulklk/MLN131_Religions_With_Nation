import { TIMELINE_IMAGES } from '@/lib/timeline-images'

export interface ReligionImage {
  src: string
  alt: string
  caption: string
  credit?: string
}

export const BUDDHIST_IMAGES: ReligionImage[] = [
  {
    src: TIMELINE_IMAGES.onePillarPagoda,
    alt: 'Chùa Một Cột tại Hà Nội',
    caption:
      'Chùa Một Cột (Diên Hựu) — biểu tượng kiến trúc Phật giáo Việt Nam, thời Lý.',
    credit: 'Wikimedia Commons',
  },
  {
    src: TIMELINE_IMAGES.tranQuocPagoda,
    alt: 'Chùa Trấn Quốc, Hà Nội',
    caption:
      'Chùa Trấn Quốc — một trong những ngôi chùa cổ nhất Hà Nội, gắn với lịch sử Phật giáo Việt.',
    credit: 'Unsplash',
  },
  {
    src: TIMELINE_IMAGES.tuongPhatVietNam,
    alt: 'Tượng Phật trong chùa Việt Nam',
    caption:
      'Tượng Phật Thích Ca — không gian thờ tự truyền thống trong các ngôi chùa Việt.',
    credit: 'Wikimedia Commons',
  },
]

export const CATHOLIC_IMAGES: ReligionImage[] = [
  {
    src: TIMELINE_IMAGES.phatDiemCathedral,
    alt: 'Nhà thờ Phát Diệm, Nam Định',
    caption:
      'Nhà thờ Phát Diệm — kiến trúc Công giáo độc đáo, kết hợp nét truyền thống Việt Nam.',
    credit: 'Wikimedia Commons',
  },
  {
    src: TIMELINE_IMAGES.nhaThoDucBa,
    alt: 'Nhà thờ Đức Bà Sài Gòn',
    caption:
      'Nhà thờ Đức Bà Sài Gòn — biểu tượng Công giáo phương Nam, xây dựng 1877–1880.',
    credit: 'Unsplash',
  },
  {
    src: TIMELINE_IMAGES.nhaThoHaNoi,
    alt: 'Nhà thờ Lớn Hà Nội',
    caption:
      'Nhà thờ Lớn Hà Nội (Nhà thờ Chính tòa Thánh Giuse) — trung tâm Công giáo miền Bắc.',
    credit: 'Unsplash',
  },
]

export const BUDDHIST_HERO_IMAGE = TIMELINE_IMAGES.onePillarPagoda
/** Nhà thờ Đức Bà — kiến trúc Công giáo rõ nét, dễ nhận diện hơn ảnh Phát Diệm (gothic) */
export const CATHOLIC_HERO_IMAGE = TIMELINE_IMAGES.nhaThoDucBa

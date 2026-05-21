import type { HeroStat, ContributionItem } from '@/lib/phat-giao-content'
import { TIMELINE_IMAGES } from '@/lib/timeline-images'

export interface HorizontalMilestone {
  year: string
  title: string
  content: string
}

export interface LifeEvent {
  year: string
  event: string
}

export interface ContributionHighlight {
  icon: string
  title: string
  description: string
}

export interface CatholicMilestone {
  year: string
  icon: string
  title: string
  content: string
  bullets?: string[]
  badge?: string
  featured?: boolean
  side: 'left' | 'right'
  quote?: { text: string; author: string; role?: string }
  highlightChip?: string
  stats?: { label: string; value: string }[]
  image: string
  imageAlt: string
}

export const CONG_GIAO_HERO = {
  badge: 'CHƯƠNG 6 · MLN131',
  title: 'Công giáo Việt Nam',
  subtitle: 'Đức tin & Yêu nước — Từ năm 1533 đến nay',
  description:
    'Từ những bước chân đầu tiên của các thừa sai Dòng Tên đến đường hướng "Sống Phúc âm giữa lòng dân tộc", người Công giáo Việt Nam luôn gắn kết đức tin với tình yêu Tổ quốc và sự gắn bó với cộng đồng dân tộc.',
  stats: [
    { icon: '✝️', value: 'Năm 1533', label: 'Công giáo du nhập Việt Nam' },
    { icon: '⛪', value: '~6.5 triệu', label: 'Tín đồ Công giáo Việt Nam' },
    { icon: '📖', value: '1651', label: 'Từ điển Việt-Bồ-La ra đời' },
  ] as HeroStat[],
}

export const CONG_GIAO_HORIZONTAL: HorizontalMilestone[] = [
  {
    year: '1533',
    title: 'Những bước chân đầu tiên',
    content:
      'Theo biên niên sử Bồ Đào Nha và sách "Ô châu cận lục", năm 1533 giáo sĩ I-nê-khu (Inêkhu) đã bí mật vào Ninh Cường, Quần Anh (Nam Định) và Trà Lũ truyền đạo. Đây là mốc lịch sử chính thức ghi nhận Công giáo du nhập Việt Nam.',
  },
  {
    year: '1615',
    title: 'Dòng Tên thiết lập cơ sở',
    content:
      'Năm 1615, các thừa sai Dòng Tên (Jesuit) người Bồ Đào Nha và Ý chính thức thiết lập cơ sở truyền giáo tại Hội An (Đàng Trong). Họ mang theo tri thức khoa học phương Tây và phương pháp "hội nhập văn hóa" — học tiếng Việt, mặc áo dài, sống gần gũi với người dân.',
  },
  {
    year: '1627',
    title: 'Alexandre de Rhodes đến Đàng Ngoài',
    content:
      'Linh mục Alexandre de Rhodes (Đắc Lộ, 1593–1660) đến Đàng Ngoài năm 1627. Chỉ trong 6 tháng, ông đã học thành thạo tiếng Việt và bắt đầu hệ thống hóa chữ viết La-tinh hóa tiếng Việt.',
  },
  {
    year: '1651',
    title: 'Từ điển Việt-Bồ-La xuất bản tại Rome',
    content:
      'Alexandre de Rhodes xuất bản "Dictionarium Annamiticum Lusitanum et Latinum" và "Phép giảng tám ngày" — lần đầu tiên tiếng Việt được ghi chép có hệ thống bằng chữ Latin với đầy đủ dấu thanh điệu, tiền thân trực tiếp của chữ Quốc ngữ ngày nay.',
  },
]

export const DE_RHODES_PROFILE = {
  portrait: TIMELINE_IMAGES.alexandreDeRhodes,
  portraitAlt: 'Chân dung Alexandre de Rhodes (Đắc Lộ)',
  initials: 'AdR',
  name: 'Alexandre de Rhodes',
  nameVi: '(Đắc Lộ)',
  years: '1593 – 1660',
  nationality: 'Người Avignon (nay là Pháp) · Dòng Tên',
  lifeEvents: [
    { year: '1624', event: 'Đến Đàng Trong lần đầu' },
    { year: '1627', event: 'Đến Đàng Ngoài' },
    { year: '1630', event: 'Bị trục xuất, sang Ma Cao' },
    { year: '1640', event: 'Trở lại Đàng Trong' },
    { year: '1645', event: 'Bị trục xuất lần cuối' },
    { year: '1651', event: 'Xuất bản Từ điển tại Rome' },
  ] as LifeEvent[],
  intro:
    'Alexandre de Rhodes không chỉ là nhà truyền giáo — ông còn là nhà ngôn ngữ học, địa lý học và dân tộc học đầu tiên nghiên cứu Việt Nam một cách có hệ thống. Trong 21 năm gián đoạn ở Việt Nam (bị trục xuất nhiều lần), ông kiên trì học tiếng Việt, nghiên cứu văn hóa và đặt nền móng cho chữ Quốc ngữ.',
  contributions: [
    {
      icon: '📖',
      title: 'Hệ thống hóa chữ Quốc ngữ',
      description:
        'Ký âm tiếng Việt bằng 29 chữ cái La-tinh kết hợp dấu thanh điệu, tạo ra công cụ ghi chép tiếng Việt hiệu quả nhất.',
    },
    {
      icon: '🧑‍🏫',
      title: 'Đào tạo thầy giảng người Việt',
      description:
        'Đặt nền móng cho Giáo hội Công giáo VN tự trị, không phụ thuộc vào linh mục nước ngoài.',
    },
    {
      icon: '🗺️',
      title: 'Biên soạn tài liệu địa lý-văn hóa',
      description:
        'Giới thiệu Việt Nam ra thế giới phương Tây bằng tiếng Pháp và Latin.',
    },
  ] as ContributionHighlight[],
  quote: {
    text: 'Trong suốt 45 năm làm thừa sai, chưa bao giờ tôi thấy một dân tộc nào tiếp nhận đức tin Kitô giáo dễ dàng và nhiệt tình như người Việt Nam.',
    author: 'Alexandre de Rhodes',
    role: '"Lịch sử Vương quốc Đàng Ngoài" (1651)',
  },
}

export const CONG_GIAO_QUOC_NGU = {
  icon: '📝',
  title: 'Di sản lớn nhất: Chữ Quốc ngữ',
  description:
    'Chữ Quốc ngữ — hệ thống ký âm tiếng Việt bằng chữ cái La-tinh kết hợp với các dấu phụ ghi thanh điệu — ban đầu được các giáo sĩ Dòng Tên sáng tạo để ghi âm tiếng Việt trong sách giáo lý và từ điển. Alexandre de Rhodes là người hệ thống hóa và xuất bản lần đầu năm 1651 tại Rome.',
  miniTimeline: [
    { year: '1651', text: 'In lần đầu tại Rome (Rhodes)' },
    { year: '1865', text: '"Gia Định Báo" — tờ báo Quốc ngữ đầu tiên' },
    { year: '1910', text: 'Pháp áp dụng trong giáo dục toàn Đông Dương' },
    { year: '1945', text: 'Chữ Quốc ngữ là chữ viết chính thức của nước VN độc lập' },
    { year: 'Nay', text: 'Toàn bộ người Việt đọc-viết bằng chữ Quốc ngữ' },
  ],
  meaning:
    'Chữ Quốc ngữ giúp xóa mù chữ, phổ cập giáo dục, bảo tồn và phát triển ngôn ngữ dân tộc. Đây là đóng góp vô giá không chỉ của Công giáo mà còn là tài sản chung của toàn dân Việt Nam.',
}

export const CONG_GIAO_CONTRIBUTIONS: ContributionItem[] = [
  {
    icon: '🏥',
    title: 'Y tế & Từ thiện',
    description:
      'Hệ thống bệnh viện, cô nhi viện, nhà dưỡng lão do Công giáo lập nên là những cơ sở từ thiện xã hội tiên phong, phục vụ mọi tầng lớp nhân dân không phân biệt tôn giáo.',
  },
  {
    icon: '🏫',
    title: 'Giáo dục',
    description:
      'Các trường học Công giáo (từ cấp tiểu học đến đại học) đã đào tạo nhiều thế hệ trí thức Việt Nam. Đại học Đà Lạt (1957) từng là một trong những cơ sở giáo dục uy tín.',
  },
  {
    icon: '🎨',
    title: 'Kiến trúc & Âm nhạc',
    description:
      'Kiến trúc nhà thờ Gothic-Việt kết hợp độc đáo giữa phong cách phương Tây và yếu tố bản địa. Âm nhạc thánh ca tiếng Việt là dòng âm nhạc phong phú trong kho tàng âm nhạc dân tộc.',
  },
]

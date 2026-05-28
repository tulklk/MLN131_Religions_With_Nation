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

export const CONG_GIAO_CURRENT_CONTRIBUTIONS: ContributionItem[] = [
  {
    icon: '💝',
    title: 'Giáo dục đạo đức',
    description:
      'Bồi dưỡng nhân cách, xây dựng lối sống trách nhiệm dựa trên giáo lý Kitô giáo về yêu thương, công bằng và tôn trọng nhân phẩm.',
  },
  {
    icon: '🏥',
    title: 'Chăm sóc sức khỏe cộng đồng',
    description:
      'Hệ thống bệnh viện, hỗ trợ y tế, chăm sóc người yếu thế, chị em phụ nữ và trẻ em.',
  },
  {
    icon: '🤝',
    title: 'Hoạt động an sinh xã hội',
    description:
      'Hỗ trợ người nghèo, cứu trợ thiên tai, dịch bệnh. Tinh thần bác ái Kitô giáo thể hiện qua phục vụ cộng đồng.',
  },
  {
    icon: '🌱',
    title: 'Phát triển cộng đồng bền vững',
    description:
      'Thực hành stewardship (trách nhiệm người xin), bảo vệ môi trường, phát triển nông thôn, tăng cường kỹ năng làm ăn.',
  },
]

export const CONG_GIAO_TRADITION: ContributionItem[] = [
  {
    icon: '📖',
    title: 'Sống Phúc âm giữa lòng dân tộc',
    description:
      'Công giáo Việt Nam luôn gắn bó với lợi ích dân tộc, đồng hành cùng công cuộc xây dựng đất nước. Tinh thần xuyên suốt là yêu nước, trách nhiệm công dân và phục vụ hạnh phúc của đồng bào.',
  },
  {
    icon: '❤️',
    title: 'Bác ái – Yêu thương – Phục vụ',
    description:
      'Ba trụ cột của hoạt động xã hội Công giáo, phản ánh điều răn "Yêu Chúa và yêu người như chính mình" từ Phúc âm.',
  },
  {
    icon: '🎯',
    title: 'Kỷ nguyên vươn mình của dân tộc',
    description:
      'Báo cáo tổng kết 40 năm đổi mới nhấn mạnh "kỷ nguyên vươn mình của dân tộc". Cộng đồng Công giáo góp phần:  Củng cố khối đại đoàn kết toàn dân tộc, lan tỏa giá trị đạo đức xã hội, chung tay phát triển đất nước.',
  },
]

export interface QuoteItem {
  text: string
  source: string
}

export const CONG_GIAO_HIGHLIGHT_QUOTE: QuoteItem = {
  text: '"Người Công giáo tốt cũng là người công dân tốt; sống đạo gắn liền với yêu nước, trách nhiệm xã hội và khát vọng xây dựng đất nước phát triển."',
  source: 'Tinh thần Công giáo Việt Nam',
}

export const CONG_GIAO_PARTY_PERSPECTIVE: ContributionItem[] = [
  {
    icon: '💭',
    title: 'Tôn giáo là nhu cầu tinh thần chính đáng',
    description:
      'Con người có nhu cầu tìm kiếm nghĩa lý sâu xa, tinh thần nương tựa. Tôn giáo không phải sản phẩm lừa dối, mà là biểu hiện chính đáng của nhu cầu tinh thần. Công giáo với thông điệp yêu thương, cứu rỗi tinh thần có ý nghĩa sâu sắc với tín đồ.',
  },
  {
    icon: '⚡',
    title: 'Tôn giáo là nguồn lực xã hội',
    description:
      'Công giáo có 6.5 triệu tín đồ tại Việt Nam, sở hữu lực lượng xã hội đáng kể, khả năng tổ chức mạnh. Những giá trị như yêu thương vô điều kiện, sự hy sinh, vị tha trong Phúc âm có thể huyên động tín đồ vì mục tiêu chung của dân tộc.',
  },
  {
    icon: '📈',
    title: 'Tôn giáo góp phần ổn định và phát triển',
    description:
      'Khi quyền tự do tín ngưỡng được bảo đảm, tín đồ sẽ yên tâm, tin tưởng vào nhà nước, góp phần tích cực vào phát triển xã hội. Công giáo Việt Nam đã chứng minh khả năng đồng hành với đất nước trong các thời kỳ khác nhau.',
  },
]

export const CONG_GIAO_PARTY_PERSPECTIVE_CITATION: Citation = {
  source: 'Văn kiện Đại hội XIV, Tập 1',
  detail: 'Phát huy sức mạnh đại đoàn kết toàn dân tộc',
}

export const CONG_GIAO_DAI_HOI_XIV: ContributionItem[] = [
  {
    icon: '👤',
    title: 'Xây dựng con người Việt Nam',
    description:
      'Đại hội XIV khẳng định xây dựng con người có lý tưởng chính trị vững vàng, phẩm chất đạo đức cao. Công giáo qua giáo lý và hoạt động xã hội đóng góp vào hình thành nhân cách tốt đẹp, con người có lương tâm cao, hiến thân cho cộng đồng.',
  },
  {
    icon: '🎭',
    title: 'Phát triển văn hóa',
    description:
      'Văn hóa Công giáo là một phần của đa sắc văn hóa Việt Nam. Kiến trúc nhà thờ, âm nhạc thánh ca, lễ hội tôn giáo kết hợp với yếu tố bản địa tạo nên sự độc đáo, góp phần phong phú hóa đời sống văn hóa tinh thần.',
  },
  {
    icon: '🌍',
    title: 'Củng cố nền tảng tinh thần xã hội',
    description:
      'Trong thời kỳ hiện đại, nền tảng tinh thần là yếu tố quan trọng. Công giáo với thông điệp yêu thương, công bằng, tôn trọng nhân phẩm có thể góp phần xây dựng đại đoàn kết toàn dân tộc trên nền tảng tinh thần chung.',
  },
]

export const CONG_GIAO_DAI_HOI_XIV_CITATION: Citation = {
  source: 'Văn kiện Đại hội XIV, Tập 2',
  detail: 'Phát triển văn hóa, quản lý phát triển xã hội và xây dựng con người',
}

export interface ConclusionItem {
  heading: string
  description: string
}

export interface Citation {
  source: string
  detail: string
}

export const CONG_GIAO_CONCLUSION: ConclusionItem[] = [
  {
    heading: 'Sống Phúc âm giữa lòng dân tộc',
    description:
      'Từ năm 1533 đến nay, Công giáo Việt Nam luôn thực hành mục lệnh của mình: "Sống Phúc âm giữa lòng dân tộc để phục vụ hạnh phúc của đồng bào". Từ những đóng góp về Quốc ngữ, giáo dục, y tế, từ thiện đến những công tác xã hội hiện nay, Công giáo luôn chứng tỏ lòng yêu nước sâu sắc.',
  },
  {
    heading: 'Đồng hành vì Việt Nam phồn vinh',
    description:
      'Đại hội XIV của Đảng nêu rõ tôn trọng và bảo đảm quyền tự do tín ngưỡng, tôn giáo. Công giáo sẵn sàng tiếp tục là bộ phận của khối đại đoàn kết toàn dân tộc, góp phần xây dựng một Việt Nam hòa bình, độc lập, dân chủ, giàu mạnh, phồn vinh, văn minh và hạnh phúc.',
  },
]

export const CONG_GIAO_MARX = {
  sectionTitle: 'VI. Nhìn từ Quan điểm Mác-Lênin',
  origins: [
    {
      icon: '🌍',
      title: 'Nguồn gốc xã hội',
      description:
        'Công giáo ra đời từ nhu cầu giải phóng tinh thần, từ xã hội Phong Kiến Hy Lạp - La Mã. Các tầng lớp áp bức, nô lệ tìm đến Phúc âm tìm hy vọng và giải phóng.',
    },
    {
      icon: '🧠',
      title: 'Nguồn gốc nhận thức',
      description:
        'Sự tuyệt đối hóa một mặt của quá trình nhận thức: thần thánh hóa những điều con người chưa giải thích được. Thần thánh hóa nhân tính Chúa Giê-su là một biểu hiện của quá trình tâm lý xã hội.',
    },
    {
      icon: '💭',
      title: 'Nguồn gốc tâm lý',
      description:
        'Nhu cầu cầu an, sợ hãi trước cái chết, khủng hoảng tâm lý xã hội khiến con người tìm đến Công giáo như nơi nương tựa hy vọng và cứu rỗi.',
    },
  ] as ContributionItem[],
  traits: [
    {
      icon: '🔵',
      title: 'Tính quần chúng',
      description:
        'Công giáo có 6.5 triệu tín đồ tại Việt Nam, lực lượng xã hội đáng kể, khả năng tổ chức cao.',
    },
    {
      icon: '🔵',
      title: 'Tính chính trị',
      description:
        'Trong xã hội có giai cấp, Công giáo phản ánh đấu tranh giai cấp và có thể bị lợi dụng cho mục đích chính trị.',
    },
    {
      icon: '🔵',
      title: 'Tính đạo đức',
      description:
        'Công giáo chứa đựng giá trị đạo đức yêu thương, tha thứ, công bằng xã hội, cần kế thừa có chọn lọc.',
    },
  ] as ContributionItem[],
  policies: [
    'Tôn trọng và đảm bảo quyền tự do tín ngưỡng (Điều 24 HP 2013)',
    'Bình đẳng giữa các tôn giáo trước pháp luật',
    'Phân biệt sinh hoạt tôn giáo chính đáng với lợi dụng tôn giáo',
    'Luật Tín ngưỡng, tôn giáo 2016 — khung pháp lý toàn diện',
  ] as string[],
  intro:
    'Theo Mác-Lênin, Công giáo là một hình thái ý thức xã hội, phản ánh hoàn cảnh xã hội sinh ra nó. Công giáo ra đời từ 3 nguồn gốc:',
}

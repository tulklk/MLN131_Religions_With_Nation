import { TIMELINE_IMAGES } from '@/lib/timeline-images'

export interface TimelineItem {
  year: string
  title: string
  description: string
  accent: 'gold' | 'blue'
  image: string
  imageAlt: string
}

export interface TimelineMilestoneItem extends TimelineItem {
  icon: string
  content: string
  bullets?: string[]
  badge?: string
  featured?: boolean
  side: 'left' | 'right'
  quote?: { text: string; author: string; role?: string }
  chips?: string[]
  highlightChip?: string
  stats?: { label: string; value: string }[]
}

export const TIMELINE_PREVIEW: TimelineItem[] = [
  {
    year: 'TK II SCN',
    title: 'Phật giáo du nhập Việt Nam',
    description: 'Phật giáo vào Việt Nam qua Giao Chỉ — trung tâm Luy Lâu (Bắc Ninh)',
    accent: 'gold',
    image: TIMELINE_IMAGES.tranQuocPagoda,
    imageAlt: 'Chùa Trấn Quốc, Hà Nội',
  },
  {
    year: '1533',
    title: 'Công giáo đến Việt Nam',
    description: 'Giáo sĩ I-nê-khu truyền đạo tại Ninh Cường và Trà Lũ (Nam Định)',
    accent: 'blue',
    image: TIMELINE_IMAGES.phatDiemCathedral,
    imageAlt: 'Nhà thờ Phát Diệm, Nam Định',
  },
  {
    year: '1651',
    title: 'Chữ Quốc ngữ ra đời',
    description: 'Alexandre de Rhodes xuất bản từ điển Việt-Bồ-La tại Rome',
    accent: 'blue',
    image: TIMELINE_IMAGES.tuDienQuocNgu1651,
    imageAlt: 'Từ điển Việt-Bồ-La 1651',
  },
  {
    year: '1010–1225',
    title: 'Phật giáo quốc giáo thời Lý',
    description: 'Phật giáo hưng thịnh nhất dưới triều Lý',
    accent: 'gold',
    image: TIMELINE_IMAGES.onePillarPagoda,
    imageAlt: 'Chùa Một Cột',
  },
  {
    year: '1258–1308',
    title: 'Thiền phái Trúc Lâm Yên Tử',
    description: 'Trần Nhân Tông sáng lập thiền phái thuần Việt',
    accent: 'gold',
    image: TIMELINE_IMAGES.trucLamYenTu,
    imageAlt: 'Thiền viện Trúc Lâm Yên Tử',
  },
  {
    year: '1981',
    title: 'Giáo hội Phật giáo Việt Nam',
    description: 'Thống nhất 9 tổ chức Phật giáo toàn quốc',
    accent: 'gold',
    image: TIMELINE_IMAGES.chuaVietNam,
    imageAlt: 'Chùa chiền Việt Nam',
  },
]

export const PHAT_GIAO_MILESTONES: TimelineMilestoneItem[] = [
  {
    year: 'TK I–X',
    icon: '🛡️',
    title: 'Chỗ dựa tinh thần thời Bắc thuộc',
    content:
      'Trong nghìn năm Bắc thuộc, Phật giáo trở thành chỗ dựa tinh thần quan trọng của người Việt. Khác với Nho giáo và Đạo giáo — công cụ đồng hóa của phương Bắc — Phật giáo mang tính bình đẳng, từ bi, phù hợp với tâm lý người dân bị áp bức. Nhiều nhà sư đã tham gia phong trào đấu tranh giành độc lập dân tộc. Pháp Hiền, Khương Tăng Hội là những tên tuổi Phật giáo nổi bật thời kỳ này.',
    description: '',
    accent: 'gold',
    side: 'left',
    image: TIMELINE_IMAGES.dauPagodaArt,
    imageAlt: 'Di sản chùa Dâu, Bắc Ninh',
  },
  {
    year: 'TK X–XIV',
    icon: '👑',
    title: 'Phật giáo — Quốc giáo thời Lý-Trần',
    content:
      'Đây là thời kỳ Phật giáo hưng thịnh nhất trong lịch sử Việt Nam. Các vua triều Lý, Trần đều sùng đạo Phật và lấy tư tưởng Phật giáo làm nền tảng trị quốc. Nhà Lý xây Văn Miếu, Quốc Tử Giám; chùa tháp mọc khắp nơi. Vua Lý Thái Tổ dời đô về Thăng Long năm 1010 và ngay lập tức cho xây dựng nhiều chùa tháp. Phật giáo thời Lý-Trần đã sinh ra những tác phẩm thiền học xuất sắc như "Khóa hư lục" của Trần Thái Tông.',
    description: '',
    badge: 'Thời kỳ hoàng kim',
    accent: 'gold',
    side: 'right',
    image: TIMELINE_IMAGES.onePillarPagoda,
    imageAlt: 'Chùa Một Cột — thời Lý',
  },
  {
    year: '1258–1308',
    icon: '🏔️',
    title: 'Phật hoàng Trần Nhân Tông & Trúc Lâm Yên Tử',
    content:
      'Vua Trần Nhân Tông (1258–1308) — người hai lần đánh thắng quân Mông-Nguyên hùng mạnh — sau khi nhường ngôi đã xuất gia tu hành tại núi Yên Tử, Quảng Ninh. Ông sáng lập thiền phái Trúc Lâm Yên Tử, dung hợp ba dòng Thiền-Tịnh-Mật thành một thiền phái thuần Việt độc đáo, không lệ thuộc vào Trung Quốc.',
    description: '',
    bullets: [
      'Lần đầu tiên Đông Nam Á có hoàng đế xuất gia và đắc đạo',
      'Thiền phái mang bản sắc Việt: kết hợp tu hành với lo việc nước',
      'Tư tưởng: "Phật ở trong lòng mỗi người, không phải ở Tây Phương xa xôi"',
    ],
    badge: '⭐ Di sản thiền học thuần Việt',
    featured: true,
    accent: 'gold',
    side: 'left',
    quote: {
      text: 'Cư trần lạc đạo thả tùy duyên,\nCơ tắc xan hề khốn tắc miên',
      author: 'Trần Nhân Tông',
      role: '"Cư trần lạc đạo phú"',
    },
    image: TIMELINE_IMAGES.trucLamYenTu,
    imageAlt: 'Thiền viện Trúc Lâm Yên Tử',
  },
  {
    year: 'TK XV–XIX',
    icon: '🍂',
    title: 'Giai đoạn trầm lắng — Phật giáo dân gian',
    content:
      'Khi Nho giáo trở thành hệ tư tưởng chính thống dưới triều Lê, Phật giáo không còn vị trí quốc giáo nhưng vẫn tồn tại sâu trong đời sống dân gian. Câu tục ngữ "Đất vua, chùa làng, phong cảnh Bụt" cho thấy ngôi chùa vẫn là trung tâm sinh hoạt văn hóa-tinh thần của mỗi làng quê Việt Nam. Cuối TK XIX – đầu TK XX, phong trào chấn hưng Phật giáo do các cao tăng như Khánh Hòa, Thiện Chiếu khởi xướng đã làm sống lại tinh thần Phật giáo Việt Nam.',
    description: '',
    accent: 'gold',
    side: 'right',
    image: TIMELINE_IMAGES.tranQuocPagoda,
    imageAlt: 'Chùa chiền Việt Nam',
  },
  {
    year: 'TK XX',
    icon: '✊',
    title: 'Phật giáo trong hai cuộc kháng chiến',
    content: 'Trong hai cuộc kháng chiến chống Pháp và chống Mỹ, đông đảo tăng ni và tín đồ Phật giáo đã tích cực tham gia bảo vệ Tổ quốc:',
    description: '',
    bullets: [
      'Nhiều ngôi chùa là cơ sở hoạt động cách mạng, che giấu cán bộ, cất giấu vũ khí và lương thực',
      'Phong trào "Phật giáo yêu nước" huy động hàng triệu tín đồ tham gia',
      'Hòa thượng Thích Đôn Hậu, Thích Minh Châu, ni sư Huỳnh Liên là những tấm gương tiêu biểu',
      'Lời kêu gọi của Hòa thượng Thích Trí Thủ: "Phụng sự chúng sinh là thiết thực cúng dường chư Phật"',
    ],
    accent: 'gold',
    side: 'left',
    image: TIMELINE_IMAGES.tuongPhatVietNam,
    imageAlt: 'Tượng Phật Việt Nam',
  },
  {
    year: '1981–nay',
    icon: '🌸',
    title: 'Đại hội thống nhất 1981 — GHPGVN',
    content:
      'Ngày 7/11/1981, Đại hội đại biểu Phật giáo toàn quốc lần I khai mạc tại Hà Nội, thống nhất 9 tổ chức và hệ phái Phật giáo trong cả nước thành Giáo hội Phật giáo Việt Nam (GHPGVN). Ba yếu tố này không mâu thuẫn mà bổ sung cho nhau. Đạo pháp là kim chỉ nam tu hành; dân tộc là gốc rễ, bản sắc; chủ nghĩa xã hội là con đường phát triển mà Phật giáo đồng hành cùng đất nước.',
    description: '',
    chips: ['Đạo pháp', 'Dân tộc', 'Chủ nghĩa xã hội'],
    accent: 'gold',
    side: 'right',
    image: TIMELINE_IMAGES.chuaVietNam,
    imageAlt: 'GHPGVN hiện đại',
  },
]

export const CATHOLIC_MILESTONES: TimelineMilestoneItem[] = [
  {
    year: 'TK XVII–XIX',
    icon: '🔒',
    title: 'Bách hại & Đức tin kiên trung',
    content:
      'Qua nhiều triều đại, Công giáo nhiều lần bị coi là "tả đạo" và bị cấm. Các tín hữu phải thờ phượng bí mật. Nhưng đức tin của người Công giáo Việt Nam không bị tiêu diệt — trái lại, sự kiên trung của họ đã tạo nên 117 vị Thánh Tử đạo Việt Nam, được Đức Giáo hoàng Gioan Phaolô II tuyên thánh ngày 19/6/1988 tại Rome.',
    description: '',
    badge: '117 vị Thánh Tử đạo VN',
    accent: 'blue',
    side: 'left',
    image: TIMELINE_IMAGES.phatDiemCathedral,
    imageAlt: 'Nhà thờ Phát Diệm',
  },
  {
    year: '1885–1886',
    icon: '⚠️',
    title: 'Bi kịch Văn thân — Giải oan lịch sử',
    content:
      'Phong trào Văn thân với tâm lý "bình Tây, sát tả" đã gây ra những vụ thảm sát đau lòng đối với người Công giáo ở Nghệ An, Hà Tĩnh, Quảng Trị. Đây là bi kịch lịch sử cần nhìn nhận khách quan. Sự thật là: người Công giáo là nạn nhân của tư tưởng cực đoan, không phải kẻ thù của dân tộc. Nhiều người Công giáo cũng tham gia phong trào Cần Vương và các phong trào yêu nước đương thời.',
    description: '',
    accent: 'blue',
    side: 'right',
    image: TIMELINE_IMAGES.nhaThoNamDinh,
    imageAlt: 'Nhà thờ Công giáo Việt Nam',
  },
  {
    year: 'TK XX',
    icon: '✊',
    title: 'Người Công giáo trong kháng chiến',
    content: 'Trong hai cuộc kháng chiến chống Pháp và Mỹ, đông đảo người Công giáo đã tích cực tham gia bảo vệ Tổ quốc:',
    description: '',
    bullets: [
      'Linh mục Phạm Bá Trực (1884–1954) — Phó Chủ tịch Quốc hội đầu tiên của nước VN Dân chủ Cộng hòa (1946)',
      'Ủy ban Liên Việt Công giáo và nhiều tổ chức Công giáo yêu nước hoạt động dưới sự lãnh đạo của Chủ tịch Hồ Chí Minh',
      'Khẩu hiệu nổi tiếng: "Kính Chúa — Yêu nước" — đức tin và lòng yêu nước song hành',
    ],
    accent: 'blue',
    side: 'left',
    image: TIMELINE_IMAGES.nhaThoHaNoi,
    imageAlt: 'Nhà thờ Lớn Hà Nội',
  },
  {
    year: '1980',
    icon: '📜',
    title: "'Sống Phúc âm giữa lòng Dân tộc'",
    content:
      'Tháng 4/1980, Hội đồng Giám mục Việt Nam họp lần đầu tiên sau thống nhất đất nước và ban hành Thư chung 1980 — văn kiện định hướng con đường của Công giáo Việt Nam trong kỷ nguyên mới. Lần đầu tiên HĐGM Việt Nam chính thức tuyên bố gắn kết đức tin Công giáo với tình yêu Tổ quốc.',
    description: '',
    badge: '⭐ Bước ngoặt lịch sử',
    featured: true,
    highlightChip: 'SỐNG PHÚC ÂM GIỮA LÒNG DÂN TỘC',
    accent: 'blue',
    side: 'right',
    quote: {
      text: 'Là Hội Thánh trong lòng dân tộc Việt Nam, chúng ta quyết tâm gắn bó với vận mệnh quê hương, noi gương tổ tiên anh hùng, đem hết khả năng phục vụ hạnh phúc của đồng bào, góp phần xây dựng một nước Việt Nam độc lập, thống nhất và đi lên chủ nghĩa xã hội.',
      author: 'Thư chung Hội đồng Giám mục Việt Nam',
      role: '(1980)',
    },
    image: TIMELINE_IMAGES.nhaThoDucBa,
    imageAlt: 'Nhà thờ Đức Bà Sài Gòn',
  },
  {
    year: '1980–nay',
    icon: '🌟',
    title: 'Công giáo Việt Nam ngày nay',
    content:
      'Hội đồng Giám mục Việt Nam gồm 27 giáo phận, lãnh đạo ~6.5 triệu tín đồ trên cả nước. Quan hệ Việt Nam — Vatican ngày càng tiến triển tích cực. Người Công giáo đang cống hiến xuất sắc trong giáo dục, y tế, từ thiện. Tinh thần "Kính Chúa — Yêu nước" được thực hành hàng ngày.',
    description: '',
    accent: 'blue',
    side: 'left',
    stats: [
      { label: 'Giáo phận', value: '27' },
      { label: 'Tín đồ', value: '6.5 triệu' },
      { label: 'Linh mục', value: '2.500+' },
    ],
    image: TIMELINE_IMAGES.nhaThoDucBa,
    imageAlt: 'Công giáo Việt Nam hiện đại',
  },
]

/** @deprecated Use PHAT_GIAO_MILESTONES */
export const BUDDHIST_TIMELINE = PHAT_GIAO_MILESTONES
/** @deprecated Use CATHOLIC_MILESTONES */
export const CATHOLIC_TIMELINE = CATHOLIC_MILESTONES

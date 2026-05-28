export interface HeroStat {
  icon: string
  value: string
  label: string
}

export interface OriginParagraph {
  title: string
  text: string
}

export interface MiniTimelineItem {
  year: string
  text: string
}

export interface TimelineMilestoneData {
  year: string
  icon: string
  title: string
  content: string
  bullets?: string[]
  badge?: string
  featured?: boolean
  side: 'left' | 'right'
  quote?: { text: string; author: string; role?: string }
  chips?: string[]
  image: string
  imageAlt: string
}

export interface ContributionItem {
  icon: string
  title: string
  description: string
}

export interface OriginCard {
  icon: string
  title: string
  description: string
}

export interface PolicyItem {
  text: string
}

export interface Citation {
  source: string
  detail: string
}

export const PHAT_GIAO_HERO = {
  badge: 'CHƯƠNG 6 · MLN131',
  title: 'Phật giáo Việt Nam',
  subtitle: 'Hành trình 2000 năm đồng hành cùng Dân tộc',
  description:
    'Từ những bước chân đầu tiên trên đất Giao Chỉ đến Giáo hội Phật giáo Việt Nam hiện đại, Phật giáo luôn gắn liền với vận mệnh, văn hóa và tinh thần dân tộc Việt Nam.',
  stats: [
    { icon: '🕰', value: 'Thế kỷ II SCN', label: 'Du nhập vào Việt Nam' },
    { icon: '⛩', value: '18.544', label: 'Cơ sở thờ tự trên cả nước' },
    { icon: '☯', value: '~80%', label: 'Dân số ảnh hưởng Phật giáo' },
  ] as HeroStat[],
}

export const PHAT_GIAO_ORIGIN = {
  sectionTitle: 'II. Du nhập vào Việt Nam',
  paragraphs: [
    {
      title: 'Con đường thứ nhất — Từ Ấn Độ',
      text: 'Phật giáo du nhập vào Việt Nam từ khoảng thế kỷ II Sau Công nguyên theo đường biển thương mại. Các tăng sĩ Ấn Độ theo các thương thuyền đến cảng thị Giao Chỉ (vùng đồng bằng sông Hồng ngày nay). Luy Lâu (thuộc Bắc Ninh hiện nay) sớm trở thành trung tâm Phật giáo đầu tiên và lớn nhất của Việt Nam, thậm chí còn ra đời trước cả hai trung tâm Phật giáo lớn ở Trung Quốc là Lạc Dương và Bành Thành.',
    },
    {
      title: 'Con đường thứ hai — Qua Trung Quốc',
      text: 'Song song với đó, Phật giáo cũng du nhập vào Việt Nam gián tiếp qua Trung Quốc, mang theo phong cách Thiền tông với tư tưởng "Phật tại tâm", "Trực chỉ nhân tâm, kiến tánh thành Phật". Dòng chảy này ảnh hưởng sâu sắc đến Phật giáo miền Bắc Việt Nam và trực tiếp dẫn đến sự ra đời của thiền phái Trúc Lâm Yên Tử về sau.',
    },
  ] as OriginParagraph[],
  miniTimeline: [
    { year: 'TK I–II SCN', text: 'Phật giáo xuất hiện tại Giao Chỉ' },
    { year: 'TK III SCN', text: 'Luy Lâu thành trung tâm lớn nhất' },
    { year: 'TK IV–V SCN', text: 'Lan rộng toàn miền Bắc Việt Nam' },
  ] as MiniTimelineItem[],
}

export const PHAT_GIAO_CONTRIBUTIONS: ContributionItem[] = [
  {
    icon: '🎨',
    title: 'Văn hóa & Nghệ thuật',
    description:
      'Kiến trúc chùa tháp (Chùa Một Cột, Tháp Báo Thiên, Chùa Hương, Yên Tử), điêu khắc tượng Phật, hội họa tranh thờ, âm nhạc kệ kinh là di sản văn hóa vật thể và phi vật thể vô giá của dân tộc Việt Nam.',
  },
  {
    icon: '🧘',
    title: 'Đạo đức & Nhân sinh quan',
    description:
      'Tư tưởng từ bi, hỷ xả, vô ngã, nhân quả của Phật giáo thấm sâu vào đạo đức người Việt. Tinh thần "lá lành đùm lá rách", "thương người như thể thương thân" có gốc rễ từ đạo lý từ bi của nhà Phật.',
  },
  {
    icon: '⚖️',
    title: 'Chính trị & Đoàn kết',
    description:
      'Phật giáo đóng góp tích cực vào đoàn kết dân tộc, là cầu nối giữa các giai tầng xã hội. Trong lịch sử, các thiền sư thường là cố vấn của vua chúa, là trung gian hòa giải xã hội và tiếng nói bảo vệ tầng lớp dân nghèo.',
  },
  {
    icon: '📚',
    title: 'Giáo dục & Truyền bá chữ viết',
    description:
      'Hệ thống chùa chiền là trung tâm giáo dục sớm nhất Việt Nam. Trong hàng nghìn năm, nhà sư là thầy dạy chữ, dạy đạo lý. Nhiều bộ kinh Phật bằng chữ Nôm là những tác phẩm văn học — ngôn ngữ học quý giá.',
  },
]

export const PHAT_GIAO_CURRENT_CONTRIBUTIONS: ContributionItem[] = [
  {
    icon: '💝',
    title: 'Giáo dục đạo đức xã hội',
    description:
      'Từ bi, trí tuệ, vị tha — những giá trị cốt lõi của Phật giáo tiếp tục nuôi dưỡng tâm hồn, lương tâm và giác ngộ của người học. Các trường Phật giáo, lớp dạy kỹ năng sống giúp xây dựng nhân cách toàn diện cho thế hệ trẻ.',
  },
  {
    icon: '🤝',
    title: 'Hoạt động an sinh xã hội',
    description:
      'Cứu trợ thiên tai, hỗ trợ người nghèo, bếp ăn từ thiện, chăm sóc cộng đồng. Giáo hội Phật giáo Việt Nam thường xuyên triển khai các chương trình từ thiện, bữa cơm công cộng, hỗ trợ người yếu thế, góp phần xây dựng an sinh xã hội bền vững.',
  },
  {
    icon: '🏛️',
    title: 'Bảo tồn văn hóa dân tộc',
    description:
      'Lễ hội truyền thống (Tết Nguyên Đán, Rằm tháng Bảy, Tết Trung Thu), di sản Phật giáo, giá trị văn hóa Việt được bảo tồn và phát huy. Các chùa chiền là nơi giữ gìn di sản, không gian để cộng đồng gắn bó với bản sắc văn hóa.',
  },
  {
    icon: '🌱',
    title: 'Phát triển cộng đồng bền vững',
    description:
      'Bảo vệ môi trường, phát triển nông thôn, tăng cường kỹ năng làm ăn cho người dân. Phật giáo nhấn mạnh tính liên kết giữa con người và thiên nhiên, góp phần vào phát triển xã hội bền vững.',
  },
]

export const PHAT_GIAO_DAI_HOI_XIV: ContributionItem[] = [
  {
    icon: '👤',
    title: 'Xây dựng con người Việt Nam',
    description:
      'Đại hội XIV khẳng định mục tiêu xây dựng con người Việt Nam có lý tưởng chính trị vững vàng, phẩm chất đạo đức cao, trí tuệ phong phú, thể chất khoẻ mạnh. Phật giáo đóng góp vào hình thành nhân cách tốt đẹp này thông qua giáo dục đạo đức, rèn luyện tâm tính.',
  },
  {
    icon: '🎭',
    title: 'Phát triển văn hóa',
    description:
      'Văn hóa Phật giáo là một phần không thể tách rời của văn hóa truyền thống Việt Nam. Bảo tồn và phát huy di sản Phật giáo góp phần phong phú hóa đời sống văn hóa tinh thần của Nhân dân.',
  },
  {
    icon: '🌍',
    title: 'Củng cố nền tảng tinh thần xã hội',
    description:
      'Trong bối cảnh toàn cầu hóa, làn sóng pháp luật hóa tinh thần có nguy cơ làm mất gốc. Phật giáo với những giá trị từ bi, nhân ái, từ lâu đã trở thành nền tảng tinh thần, góp phần xây dựng đại đoàn kết toàn dân tộc.',
  },
]

export const PHAT_GIAO_DAI_HOI_XIV_CITATION: Citation = {
  source: 'Văn kiện Đại hội XIV, Tập 2',
  detail: 'Phát triển văn hóa, quản lý phát triển xã hội và xây dựng con người',
}

export const PHAT_GIAO_PARTY_PERSPECTIVE: ContributionItem[] = [
  {
    icon: '💭',
    title: 'Tôn giáo là nhu cầu tinh thần chính đáng',
    description:
      'Từ ngàn xưa, con người luôn có nhu cầu tìm kiếm nghĩa lý sâu xa của cuộc sống, tinh thần nương tựa. Tôn giáo không phải sản phẩm của sự lừa dối hay cải chính ngu dân, mà là biểu hiện chính đáng của nhu cầu tinh thần.',
  },
  {
    icon: '⚡',
    title: 'Tôn giáo là nguồn lực xã hội',
    description:
      'Các tôn giáo sở hữu hàng triệu tín đồ, lực lượng xã hội to lớn, khả năng tổ chức mạnh. Những giá trị như từ bi, công bằng, vị tha trong tôn giáo có thể huyên động những nguồn lực xã hội to lớn vì mục tiêu chung của toàn dân tộc.',
  },
  {
    icon: '📈',
    title: 'Tôn giáo góp phần ổn định và phát triển',
    description:
      'Khi tôn giáo được tôn trọng, quyền tự do tín ngưỡng được bảo đảm, tín đồ sẽ yên tâm hơn, tin tưởng vào nhà nước hơn. Điều này tạo môi trường ổn định, là điều kiện quan trọng cho phát triển kinh tế-xã hội của đất nước.',
  },
]

export const PHAT_GIAO_PARTY_PERSPECTIVE_CITATION: Citation = {
  source: 'Văn kiện Đại hội XIV, Tập 1',
  detail: 'Phát huy sức mạnh đại đoàn kết toàn dân tộc',
}

export interface ConclusionItem {
  heading: string
  description: string
}

export const PHAT_GIAO_CONCLUSION: ConclusionItem[] = [
  {
    heading: 'Độc lập, tự do, hạnh phúc',
    description:
      'Trong hành trình 2000 năm, Phật giáo Việt Nam luôn gắn liền với lịch sử dựng nước, giữ nước. Từ Lý đến Trần, từ Trần đến Nguyễn, từ thời thuộc địa đến kháng chiến chống Pháp, đấu tranh chống Mỹ, và đặc biệt là công cuộc đổi mới hiện nay, Phật giáo Việt Nam vẫn luôn hướng về tổ quốc.',
  },
  {
    heading: 'Đoàn kết vì phát triển',
    description:
      'Đại hội XIV của Đảng nêu rõ: "Tôn trọng và bảo đảm quyền tự do tín ngưỡng, tôn giáo của Nhân dân". Phật giáo sẵn sàng góp phần vào đại đoàn kết toàn dân tộc, để cùng nhau xây dựng đất nước giàu mạnh, dân chủ, công bằng, văn minh.',
  },
]

export const PHAT_GIAO_MARX = {
  sectionTitle: 'VI. Nhìn từ Quan điểm Mác-Lênin',
  origins: [
    {
      icon: '🌍',
      title: 'Nguồn gốc xã hội',
      description:
        'Sự bất lực của con người trước thiên nhiên và các lực lượng xã hội xa lạ, áp bức. Ấn Độ cổ đại với chế độ đẳng cấp hà khắc chính là mảnh đất nảy sinh tư tưởng giải phóng của Phật giáo.',
    },
    {
      icon: '🧠',
      title: 'Nguồn gốc nhận thức',
      description:
        'Sự tuyệt đối hóa một mặt của quá trình nhận thức, thần thánh hóa những điều con người chưa giải thích được. Khi khoa học còn hạn chế, tôn giáo lấp đầy khoảng trống nhận thức đó.',
    },
    {
      icon: '💭',
      title: 'Nguồn gốc tâm lý',
      description:
        'Nhu cầu cầu an, sợ hãi trước cái chết, khủng hoảng tinh thần khiến con người tìm đến tôn giáo như nơi nương tựa và hy vọng.',
    },
  ] as OriginCard[],
  traits: [
    {
      icon: '🔶',
      title: 'Tính quần chúng',
      description:
        'Tôn giáo có lượng tín đồ đông đảo, đáp ứng nhu cầu tinh thần của quần chúng nhân dân.',
    },
    {
      icon: '🔶',
      title: 'Tính chính trị',
      description:
        'Trong xã hội có giai cấp, tôn giáo phản ánh đấu tranh giai cấp và có thể bị lợi dụng cho mục đích chính trị.',
    },
    {
      icon: '🔶',
      title: 'Tính đạo đức',
      description:
        'Tôn giáo chứa đựng giá trị đạo đức nhất định, cần kế thừa có chọn lọc trong xây dựng đạo đức xã hội.',
    },
  ] as OriginCard[],
  policies: [
    'Tôn trọng và đảm bảo quyền tự do tín ngưỡng (Điều 24 HP 2013)',
    'Bình đẳng giữa các tôn giáo trước pháp luật',
    'Phân biệt sinh hoạt tôn giáo chính đáng với lợi dụng tôn giáo',
    'Luật Tín ngưỡng, tôn giáo 2016 — khung pháp lý toàn diện',
  ] as string[],
  intro:
    'Theo Mác-Lênin, Phật giáo là một hình thái ý thức xã hội, phản ánh hoàn cảnh xã hội sinh ra nó. Phật giáo ra đời từ 3 nguồn gốc:',
}

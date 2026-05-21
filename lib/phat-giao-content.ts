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
  sectionTitle: 'I. Du nhập vào Việt Nam',
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

export const PHAT_GIAO_MARX = {
  sectionTitle: 'IV. Nhìn từ Quan điểm Mác-Lênin',
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

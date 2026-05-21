export interface TabContent {
  id: string
  label: string
}

export interface OriginCard {
  icon: string
  title: string
  description: string
}

export interface TraitCard {
  icon: string
  title: string
  description: string
}

export const MARX_LENIN_SECTION = {
  badge: 'NỀN TẢNG LÝ LUẬN',
  title: 'Quan điểm Mác-Lênin về Tôn giáo',
  subtitle:
    'Nền tảng tư tưởng cho việc nhìn nhận vai trò của Phật giáo và Công giáo trong lịch sử Việt Nam.',
}

export const MARX_TABS: TabContent[] = [
  { id: 'ban-chat', label: 'Bản chất tôn giáo' },
  { id: 'tinh-chat', label: 'Tính chất tôn giáo' },
  { id: 'chinh-sach', label: 'Chính sách tôn giáo VN' },
]

export const TAB_BAN_CHAT = {
  marxQuote:
    '"Tôn giáo là thuốc phiện của nhân dân" — Karl Marx (không phải hiểu theo nghĩa tiêu cực mà là: tôn giáo có tác dụng giảm đau tinh thần trong hoàn cảnh khó khăn, nhưng không giải quyết được nguyên nhân gốc rễ)',
  intro:
    'Theo quan điểm Mác-Lênin, tôn giáo là một hình thái ý thức xã hội, phản ánh một cách hoang đường, hư ảo hiện thực khách quan vào đầu óc con người. Tôn giáo không phải là hiện tượng siêu nhiên mà là sản phẩm của lịch sử xã hội, xuất hiện khi xã hội còn ở trình độ phát triển thấp.',
  origins: [
    {
      icon: '🌍',
      title: 'Nguồn gốc xã hội',
      description:
        'Sự bất lực và sợ hãi của con người trước tự nhiên và các lực lượng xã hội xa lạ, áp bức trong xã hội có giai cấp.',
    },
    {
      icon: '🧠',
      title: 'Nguồn gốc nhận thức',
      description:
        'Sự tuyệt đối hóa, thần thánh hóa một mặt nào đó của quá trình nhận thức; khi giới hạn nhận thức chưa vượt qua được.',
    },
    {
      icon: '💭',
      title: 'Nguồn gốc tâm lý',
      description:
        'Nhu cầu cầu an, sợ hãi trước cái chết, đau khổ và bế tắc khiến con người tìm đến tôn giáo như nơi nương tựa tinh thần.',
    },
  ] as OriginCard[],
}

export const TAB_TINH_CHAT: TraitCard[] = [
  {
    icon: '🔶',
    title: 'Tính quần chúng',
    description:
      'Tôn giáo là hiện tượng xã hội phổ biến, có lượng tín đồ đông đảo. Hiện nay ~85% dân số thế giới có tín ngưỡng tôn giáo (~6.8 tỷ người). Tôn giáo đáp ứng nhu cầu tinh thần chính đáng của quần chúng nhân dân, do đó không thể xóa bỏ tôn giáo bằng mệnh lệnh hành chính.',
  },
  {
    icon: '🔶',
    title: 'Tính chính trị',
    description:
      'Trong xã hội có giai cấp, tôn giáo luôn mang màu sắc chính trị nhất định. Giai cấp thống trị thường lợi dụng tôn giáo để củng cố quyền lực. Mặt khác, quần chúng bị áp bức cũng dùng ngôn ngữ tôn giáo để biểu đạt khát vọng giải phóng.',
  },
  {
    icon: '🔶',
    title: 'Tính đạo đức',
    description:
      'Mọi tôn giáo đều có hệ thống giá trị đạo đức và nhân bản nhất định: yêu thương đồng loại, công bằng, trung thực, khiêm nhường, vị tha... Những giá trị này cần được kế thừa có chọn lọc trong xây dựng đạo đức xã hội chủ nghĩa.',
  },
]

export const TAB_CHINH_SACH = {
  constitution:
    'Mọi người có quyền tự do tín ngưỡng, tôn giáo, theo hoặc không theo một tôn giáo nào. Các tôn giáo bình đẳng trước pháp luật. Nhà nước tôn trọng và bảo hộ quyền tự do tín ngưỡng, tôn giáo. Không ai được xâm phạm tự do tín ngưỡng, tôn giáo hoặc lợi dụng tín ngưỡng, tôn giáo để vi phạm pháp luật.',
  law: 'Thông qua ngày 18/11/2016 (hiệu lực 01/01/2018) — khung pháp lý toàn diện đầu tiên của Việt Nam về tín ngưỡng, tôn giáo.',
  principles: [
    'Tôn trọng và bảo đảm quyền tự do tín ngưỡng, tôn giáo của công dân',
    'Các tôn giáo bình đẳng trước pháp luật; không phân biệt đối xử',
    'Phân biệt nhu cầu tín ngưỡng chính đáng với lợi dụng tôn giáo',
    'Đấu tranh chống mê tín dị đoan, bảo vệ quyền lợi hợp pháp của tín đồ',
  ],
}

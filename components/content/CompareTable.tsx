'use client'

interface CompareRow {
  aspect: string
  buddhist: string
  catholic: string
}

const rows: CompareRow[] = [
  {
    aspect: 'Du nhập',
    buddhist: 'Thế kỷ II SCN qua Giao Chỉ',
    catholic: 'Năm 1533 qua Ninh Cường, Trà Lũ',
  },
  {
    aspect: 'Nguồn gốc',
    buddhist: 'Ấn Độ & Trung Quốc',
    catholic: 'Bồ Đào Nha (Dòng Tên)',
  },
  {
    aspect: 'Tổ chức hiện nay',
    buddhist: 'Giáo hội Phật giáo VN (1981)',
    catholic: 'HĐGM Việt Nam (1980)',
  },
  {
    aspect: 'Tỉ lệ dân số',
    buddhist: '~80% tín đồ',
    catholic: '~7% dân số',
  },
  {
    aspect: 'Phương châm/Hướng đi',
    buddhist: 'Đạo pháp, Dân tộc & CNXH',
    catholic: 'Sống Phúc âm giữa lòng dân tộc',
  },
  {
    aspect: 'Đóng góp nổi bật',
    buddhist: 'Thiền phái Trúc Lâm, văn hóa-đạo đức',
    catholic: 'Chữ Quốc ngữ (Alexandre de Rhodes)',
  },
]

export default function CompareTable() {
  return (
    <div className="overflow-x-auto rounded-xl border border-white/10">
      <table className="w-full text-sm font-viet">
        <thead>
          <tr className="border-b border-white/10">
            <th className="px-4 py-3 text-left text-ghost font-semibold uppercase tracking-wider text-xs w-1/4">
              Khía cạnh
            </th>
            <th className="px-4 py-3 text-left uppercase tracking-wider text-xs font-bold text-gold-400 w-[37.5%]">
              🪷 Phật giáo
            </th>
            <th className="px-4 py-3 text-left uppercase tracking-wider text-xs font-bold text-blue-400 w-[37.5%]">
              ✝️ Công giáo
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className={`border-b border-white/5 hover:bg-white/3 transition-colors ${i % 2 === 0 ? 'bg-surface/30' : ''}`}
            >
              <td className="px-4 py-3 text-ghost font-medium">{row.aspect}</td>
              <td className="px-4 py-3 text-white/80">{row.buddhist}</td>
              <td className="px-4 py-3 text-white/80">{row.catholic}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

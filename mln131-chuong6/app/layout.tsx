import type { Metadata } from 'next'
import { Playfair_Display, Nunito, Be_Vietnam_Pro } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-display',
  weight: ['400', '600', '700', '900'],
})

const nunito = Nunito({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-body',
  weight: ['400', '500', '600', '700'],
})

const beVietnam = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-viet',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Phật giáo & Công giáo đồng hành cùng Dân tộc',
  description: 'Chương 6 · MLN131 · Nhóm 5 — Tìm hiểu vai trò của Phật giáo và Công giáo trong lịch sử và hiện đại Việt Nam',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="vi"
      className={`${playfair.variable} ${nunito.variable} ${beVietnam.variable}`}
    >
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  )
}

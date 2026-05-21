import Link from 'next/link'
import LotusDecor from '@/components/ui/LotusDecor'
import CrossDecor from '@/components/ui/CrossDecor'

export default function Footer() {
  return (
    <footer className="relative bg-ink-2 border-t border-white/5 overflow-hidden">
      {/* Decor */}
      <LotusDecor className="absolute -left-16 -bottom-16 w-48 h-48 text-gold-500 opacity-5" />
      <CrossDecor className="absolute -right-16 -bottom-16 w-48 h-48 text-blue-500 opacity-5" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-gold-500/20 border border-gold-500/40 text-gold-400 text-xs font-bold px-2 py-1 rounded-md font-mono tracking-wider">
                MLN131
              </span>
              <span className="text-ghost text-sm font-viet">Nhóm 5</span>
            </div>
            <p className="text-muted text-sm font-viet leading-relaxed">
              Phật giáo & Công giáo đồng hành cùng Dân tộc Việt Nam
            </p>
            <p className="text-muted/60 text-xs font-viet mt-2">Chương 6 · Lý luận chính trị</p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-ghost text-xs font-bold uppercase tracking-widest mb-3 font-viet">Nội dung</h3>
            <ul className="space-y-2">
              {[
                { href: '/chuong6/phat-giao', label: 'Phật giáo Việt Nam' },
                { href: '/chuong6/cong-giao', label: 'Công giáo Việt Nam' },
                { href: '/quiz', label: 'Quiz Game' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted hover:text-ghost text-sm font-viet transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-ghost text-xs font-bold uppercase tracking-widest mb-3 font-viet">Thông tin</h3>
            <ul className="space-y-1 text-sm text-muted font-viet">
              <li>Môn học: MLN131</li>
              <li>Chương: 6 — Tôn giáo & Dân tộc</li>
              <li>Nhóm: 5</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-muted/60 text-xs font-viet">
            © 2025 Nhóm 5 · MLN131 · FPT University
          </p>
          <div className="flex items-center gap-1 text-xs text-muted/60 font-viet">
            <span className="text-gold-500/60">🪷</span>
            <span>Phật giáo</span>
            <span className="mx-1">·</span>
            <span className="text-blue-500/60">✝️</span>
            <span>Công giáo</span>
            <span className="mx-1">·</span>
            <span>Đồng hành cùng Dân tộc</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

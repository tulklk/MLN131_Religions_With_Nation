'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { clsx } from 'clsx'

const navLinks = [
  { href: '/', label: 'Trang chủ' },
  { href: '/chuong6/phat-giao', label: 'Phật giáo' },
  { href: '/chuong6/cong-giao', label: 'Công giáo' },
  { href: '/quiz', label: 'Quiz' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={clsx(
        'fixed top-0 w-full z-50 transition-all duration-300',
        scrolled
          ? 'backdrop-blur-md bg-ink/80 border-b border-white/5 shadow-[0_4px_24px_rgba(0,0,0,0.4)]'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="bg-gold-500/20 border border-gold-500/40 text-gold-400 text-xs font-bold px-2 py-1 rounded-md font-mono tracking-wider group-hover:bg-gold-500/30 transition-colors">
              MLN131
            </span>
            <span className="text-ghost text-sm font-viet hidden sm:block group-hover:text-white transition-colors">
              Nhóm 5
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  'px-4 py-2 rounded-lg text-sm font-viet font-medium transition-all duration-200',
                  pathname === link.href
                    ? 'text-white bg-surface/80 border border-white/10'
                    : 'text-ghost hover:text-white hover:bg-surface/60'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-ghost hover:text-white hover:bg-surface/60 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-ink-2/95 backdrop-blur-md border-t border-white/5">
          <div className="px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={clsx(
                  'px-4 py-3 rounded-lg text-sm font-viet font-medium transition-colors',
                  pathname === link.href
                    ? 'text-white bg-surface/80'
                    : 'text-ghost hover:text-white hover:bg-surface/40'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

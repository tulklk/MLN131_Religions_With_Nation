'use client'

import { clsx } from 'clsx'

interface QuoteBlockProps {
  quote: string
  author: string
  role?: string
  accent: 'gold' | 'blue'
}

export default function QuoteBlock({ quote, author, role, accent }: QuoteBlockProps) {
  return (
    <div
      className={clsx(
        'relative p-8 rounded-xl overflow-hidden',
        accent === 'gold'
          ? 'border-l-4 border-gold-500 bg-gradient-to-r from-gold-500/8 to-transparent'
          : 'border-l-4 border-blue-500 bg-gradient-to-r from-blue-500/8 to-transparent'
      )}
    >
      {/* Giant quote mark */}
      <span
        className={clsx(
          'absolute top-0 left-4 font-display leading-none select-none pointer-events-none',
          accent === 'gold' ? 'text-gold-500/20' : 'text-blue-500/20'
        )}
        style={{ fontSize: '120px', lineHeight: 1 }}
        aria-hidden="true"
      >
        
      </span>

      <div className="relative">
        <p
          className={clsx(
            'font-display italic leading-relaxed mb-4',
            'text-white text-xl',
            accent === 'gold' ? '[text-shadow:0_0_20px_rgba(212,160,23,0.2)]' : ''
          )}
        >
          {quote}
        </p>

        <div className="flex flex-col gap-0.5">
          <span className="text-ghost text-sm font-viet font-semibold">{author}</span>
          {role && <span className="text-muted text-xs font-viet">{role}</span>}
        </div>
      </div>
    </div>
  )
}

'use client'

import Image from 'next/image'
import { clsx } from 'clsx'

interface TimelineThumbnailProps {
  src: string
  alt: string
  accent: 'gold' | 'blue'
  className?: string
}

export default function TimelineThumbnail({ src, alt, accent, className }: TimelineThumbnailProps) {
  const isGold = accent === 'gold'

  return (
    <div
      className={clsx(
        'img-frame shrink-0 rounded-xl border',
        'w-full sm:w-40 aspect-[4/3] sm:aspect-[5/4]',
        isGold ? 'border-gold-500/30' : 'border-blue-500/30',
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, 160px"
        className="img-in-frame"
      />
    </div>
  )
}

'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { clsx } from 'clsx'

interface ContentImageProps {
  src: string
  alt: string
  caption: string
  credit?: string
  accent?: 'gold' | 'blue'
  priority?: boolean
  className?: string
}

export default function ContentImage({
  src,
  alt,
  caption,
  credit,
  accent = 'gold',
  priority = false,
  className,
}: ContentImageProps) {
  const isGold = accent === 'gold'

  return (
    <motion.figure
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className={clsx('group overflow-hidden rounded-2xl border bg-surface/50', className, {
        'border-gold-500/25': isGold,
        'border-blue-500/25': !isGold,
      })}
    >
      <div className="img-frame aspect-[4/3] w-full">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="img-in-frame"
          priority={priority}
        />
      </div>
      <figcaption className="p-4">
        <p className="text-ghost text-sm font-viet leading-relaxed">{caption}</p>
        {credit && (
          <p className={clsx('text-xs font-mono mt-2', isGold ? 'text-gold-500/60' : 'text-blue-500/60')}>
            Ảnh: {credit}
          </p>
        )}
      </figcaption>
    </motion.figure>
  )
}

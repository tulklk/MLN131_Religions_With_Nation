'use client'

import ContentImage from '@/components/content/ContentImage'
import type { ReligionImage } from '@/lib/religion-images'

interface ImageGalleryProps {
  title: string
  subtitle?: string
  images: ReligionImage[]
  accent?: 'gold' | 'blue'
}

export default function ImageGallery({ title, subtitle, images, accent = 'gold' }: ImageGalleryProps) {
  const isGold = accent === 'gold'

  return (
    <section className="py-20 bg-ink">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold text-white mb-3 text-center">{title}</h2>
        {subtitle && (
          <p className="text-ghost text-center font-viet mb-10 max-w-2xl mx-auto">{subtitle}</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {images.map((img, i) => (
            <ContentImage
              key={img.src}
              src={img.src}
              alt={img.alt}
              caption={img.caption}
              credit={img.credit}
              accent={accent}
              priority={i === 0}
            />
          ))}
        </div>
        <p
          className={`text-center text-xs font-viet mt-8 ${isGold ? 'text-gold-500/50' : 'text-blue-500/50'}`}
        >
          Hình ảnh minh họa — sử dụng cho mục đích giáo dục (Unsplash / Wikimedia Commons).
        </p>
      </div>
    </section>
  )
}

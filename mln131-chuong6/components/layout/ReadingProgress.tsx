'use client'

import { useEffect, useState } from 'react'
import { clsx } from 'clsx'

interface ReadingProgressProps {
  accent?: 'gold' | 'blue' | 'mixed'
}

export default function ReadingProgress({ accent = 'mixed' }: ReadingProgressProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-0.5 bg-transparent pointer-events-none">
      <div
        className={clsx('h-full transition-[width] duration-150', {
          'bg-gradient-to-r from-gold-500 to-gold-300': accent === 'gold',
          'bg-gradient-to-r from-blue-500 to-blue-300': accent === 'blue',
          'bg-gradient-to-r from-gold-500 via-blue-500 to-gold-300': accent === 'mixed',
        })}
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

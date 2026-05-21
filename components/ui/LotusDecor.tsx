'use client'

interface LotusDecorProps {
  className?: string
}

export default function LotusDecor({ className = '' }: LotusDecorProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      style={{ pointerEvents: 'none' }}
    >
      {/* 8 petals arranged in a circle */}
      {Array.from({ length: 8 }).map((_, i) => (
        <ellipse
          key={i}
          cx="100"
          cy="60"
          rx="18"
          ry="42"
          fill="currentColor"
          opacity="0.7"
          transform={`rotate(${i * 45} 100 100)`}
        />
      ))}
      {/* Inner petals */}
      {Array.from({ length: 8 }).map((_, i) => (
        <ellipse
          key={`inner-${i}`}
          cx="100"
          cy="72"
          rx="10"
          ry="28"
          fill="currentColor"
          opacity="0.5"
          transform={`rotate(${i * 45 + 22.5} 100 100)`}
        />
      ))}
      {/* Center */}
      <circle cx="100" cy="100" r="14" fill="currentColor" opacity="0.9" />
      <circle cx="100" cy="100" r="8" fill="currentColor" opacity="0.5" />
    </svg>
  )
}

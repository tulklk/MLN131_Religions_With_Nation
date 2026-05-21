'use client'

interface CrossDecorProps {
  className?: string
}

/** Tọa độ cố định — tránh lệch float SSR/client khi dùng Math.cos/sin */
const RING_DOTS: { cx: number; cy: number }[] = [
  { cx: 100, cy: 10 },
  { cx: 145, cy: 22.06 },
  { cx: 177.94, cy: 55 },
  { cx: 190, cy: 100 },
  { cx: 177.94, cy: 145 },
  { cx: 145, cy: 177.94 },
  { cx: 100, cy: 190 },
  { cx: 55, cy: 177.94 },
  { cx: 22.06, cy: 145 },
  { cx: 10, cy: 100 },
  { cx: 22.06, cy: 55 },
  { cx: 55, cy: 22.06 },
]

export default function CrossDecor({ className = '' }: CrossDecorProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      style={{ pointerEvents: 'none' }}
    >
      {/* Outer decorative ring */}
      <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <circle cx="100" cy="100" r="78" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      {/* Cross vertical beam */}
      <rect x="88" y="20" width="24" height="160" rx="4" fill="currentColor" opacity="0.85" />
      {/* Cross horizontal beam */}
      <rect x="30" y="65" width="140" height="24" rx="4" fill="currentColor" opacity="0.85" />
      {/* Corner decorations */}
      {[
        [100, 28],
        [100, 172],
        [38, 77],
        [162, 77],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="5" fill="currentColor" opacity="0.6" />
      ))}
      {/* Center ornament */}
      <circle cx="100" cy="77" r="10" fill="currentColor" opacity="0.4" />
      <circle cx="100" cy="77" r="5" fill="currentColor" opacity="0.8" />
      {/* Small decorative dots on ring */}
      {RING_DOTS.map((dot, i) => (
        <circle key={`dot-${i}`} cx={dot.cx} cy={dot.cy} r="2.5" fill="currentColor" opacity="0.4" />
      ))}
    </svg>
  )
}

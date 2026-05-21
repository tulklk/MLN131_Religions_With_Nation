'use client'

import { useEffect, useState } from 'react'

export function useCounter(target: number, active: boolean, duration = 1500) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) {
      setCount(0)
      return
    }

    const step = target / (duration / 16)
    const timer = setInterval(() => {
      setCount((c) => {
        if (c >= target) {
          clearInterval(timer)
          return target
        }
        return c + step
      })
    }, 16)

    return () => clearInterval(timer)
  }, [target, active, duration])

  return Math.round(count)
}

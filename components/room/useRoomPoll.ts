'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { RoomState, RoomSession } from '@/lib/room-types'
import { supabaseClient } from '@/lib/supabase-client'

export function useRoomPoll(code: string) {
  const [room, setRoom] = useState<RoomState | null>(null)
  const [session] = useState<RoomSession | null>(() => {
    if (typeof window === 'undefined') return null
    const raw = localStorage.getItem('roomSession')
    if (!raw) return null
    try {
      return JSON.parse(raw) as RoomSession
    } catch {
      return null
    }
  })
  const [error, setError] = useState(() => (session ? '' : 'Phiên không hợp lệ'))
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const fetchRoom = useCallback(async (pid: string) => {
    try {
      const res = await fetch(`/api/room/${code}?pid=${pid}`)
      if (!res.ok) { setError('Phòng không tồn tại'); return }
      const data: RoomState = await res.json()
      setRoom(data)
    } catch {
      // network error — keep showing last state
    }
  }, [code])

  useEffect(() => {
    if (!session) return
    const bootstrapTimer = setTimeout(() => {
      void fetchRoom(session.playerId)
    }, 0)
    intervalRef.current = setInterval(() => fetchRoom(session.playerId), 3000)

    const channel = supabaseClient
      ?.channel(`quiz-room-${code}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'quiz_rooms',
          filter: `code=eq.${code.toUpperCase()}`,
        },
        () => fetchRoom(session.playerId),
      )
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'quiz_rooms',
          filter: `code=eq.${code.toUpperCase()}`,
        },
        () => fetchRoom(session.playerId),
      )

    channel?.subscribe()
    return () => {
      clearTimeout(bootstrapTimer)
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (channel && supabaseClient) supabaseClient.removeChannel(channel)
    }
  }, [session, fetchRoom, code])

  return { room, session, error, refetch: () => session && fetchRoom(session.playerId) }
}

'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { RoomState, RoomSession } from '@/lib/room-types'

export function useRoomPoll(code: string) {
  const [room, setRoom] = useState<RoomState | null>(null)
  const [session, setSession] = useState<RoomSession | null>(null)
  const [error, setError] = useState('')
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    const raw = localStorage.getItem('roomSession')
    if (!raw) { setError('Phiên không hợp lệ'); return }
    try { setSession(JSON.parse(raw)) } catch { setError('Phiên không hợp lệ') }
  }, [])

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
    fetchRoom(session.playerId)
    intervalRef.current = setInterval(() => fetchRoom(session.playerId), 1500)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [session, fetchRoom])

  return { room, session, error, refetch: () => session && fetchRoom(session.playerId) }
}

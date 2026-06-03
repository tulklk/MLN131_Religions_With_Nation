'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { RoomState, RoomSession } from '@/lib/room-types'
import { supabaseClient } from '@/lib/supabase-client'

// Adaptive polling intervals based on game state
function getInterval(status: string | undefined): number {
  if (status === 'playing') return 800        // fast during active question
  if (status === 'post_question') return 1200 // medium during results
  if (status === 'waiting') return 2000       // slower in lobby
  return 4000                                  // finished / unknown
}

export function useRoomPoll(code: string) {
  const [room, setRoom] = useState<RoomState | null>(null)
  const [session] = useState<RoomSession | null>(() => {
    if (typeof window === 'undefined') return null
    const raw = localStorage.getItem('roomSession')
    if (!raw) return null
    try { return JSON.parse(raw) as RoomSession } catch { return null }
  })
  const [error, setError] = useState(() => (session ? '' : 'Phiên không hợp lệ'))

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const roomRef = useRef<RoomState | null>(null)  // track current status for adaptive polling
  const fetchingRef = useRef(false)               // prevent concurrent fetches

  const fetchRoom = useCallback(async (pid: string) => {
    if (fetchingRef.current) return  // skip if already fetching
    fetchingRef.current = true
    try {
      const res = await fetch(`/api/room/${code}?pid=${pid}`, {
        // short timeout to fail fast on slow network
        signal: AbortSignal.timeout(4000),
      })
      if (!res.ok) { setError('Phòng không tồn tại'); return }
      const data: RoomState = await res.json()

      // Only update state if something actually changed (avoid unnecessary re-renders)
      const prev = roomRef.current
      const changed =
        !prev ||
        prev.status !== data.status ||
        prev.currentQ !== data.currentQ ||
        Object.keys(data.currentAnswers).length !== Object.keys(prev.currentAnswers).length ||
        data.lastActivity !== prev.lastActivity

      if (changed) {
        roomRef.current = data
        setRoom(data)

        // Reschedule interval with new adaptive rate when status changes
        if (prev?.status !== data.status && intervalRef.current) {
          clearInterval(intervalRef.current)
          intervalRef.current = setInterval(
            () => fetchRoom(pid),
            getInterval(data.status),
          )
        }
      }
    } catch {
      // network error — keep showing last state, don't crash
    } finally {
      fetchingRef.current = false
    }
  }, [code])

  useEffect(() => {
    if (!session) return
    const pid = session.playerId

    // Immediate first fetch
    void fetchRoom(pid)

    // Start with 'waiting' interval, will self-adjust after first fetch
    intervalRef.current = setInterval(() => fetchRoom(pid), getInterval('waiting'))

    // Supabase realtime — fires immediately when DB row changes
    const channel = supabaseClient
      ?.channel(`quiz-room-${code}`)
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'quiz_rooms', filter: `code=eq.${code.toUpperCase()}` },
        () => {
          // Realtime event — fetch right away, bypass debounce
          fetchingRef.current = false
          void fetchRoom(pid)
        },
      )
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'quiz_rooms', filter: `code=eq.${code.toUpperCase()}` },
        () => {
          fetchingRef.current = false
          void fetchRoom(pid)
        },
      )

    channel?.subscribe((status) => {
      // If realtime subscription fails, fall back to faster polling
      if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
        if (intervalRef.current) clearInterval(intervalRef.current)
        intervalRef.current = setInterval(() => fetchRoom(pid), 1000)
      }
    })

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (channel && supabaseClient) supabaseClient.removeChannel(channel)
    }
  }, [session, fetchRoom, code])

  const refetch = useCallback(() => {
    if (!session) return
    fetchingRef.current = false  // force re-fetch even if currently fetching
    void fetchRoom(session.playerId)
  }, [session, fetchRoom])

  return { room, session, error, refetch }
}

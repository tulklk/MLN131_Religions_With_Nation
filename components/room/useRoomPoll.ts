'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { RoomState, RoomSession } from '@/lib/room-types'
import { supabaseClient } from '@/lib/supabase-client'

function getInterval(status: string | undefined): number {
  if (status === 'playing') return 800
  if (status === 'post_question') return 1200
  if (status === 'waiting') return 1000
  return 4000
}

export function useRoomPoll(code: string) {
  const [room, setRoom] = useState<RoomState | null>(null)
  const [session, setSession] = useState<RoomSession | null>(null)
  const [error, setError] = useState('')

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const roomRef = useRef<RoomState | null>(null)
  const fetchingRef = useRef(false)
  // Keep a ref to session so polling effect closure doesn't go stale
  const sessionRef = useRef<RoomSession | null>(null)

  // Load session from localStorage (client-only, avoids SSR hydration mismatch)
  // Separate useEffect so it never re-runs and never changes deps size
  useEffect(() => {
    try {
      const raw = localStorage.getItem('roomSession')
      if (!raw) { setError('Phiên không hợp lệ'); return }
      const parsed = JSON.parse(raw) as RoomSession
      sessionRef.current = parsed
      setSession(parsed)
    } catch {
      setError('Phiên không hợp lệ')
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const fetchRoom = useCallback(async (pid: string) => {
    if (fetchingRef.current) return
    fetchingRef.current = true
    try {
      const res = await fetch(`/api/room/${code}?pid=${pid}`, {
        signal: AbortSignal.timeout(4000),
      })
      if (!res.ok) { setError('Phòng không tồn tại'); return }
      const data: RoomState = await res.json()

      const prev = roomRef.current
      const changed =
        !prev ||
        prev.status !== data.status ||
        prev.currentQ !== data.currentQ ||
        Object.keys(data.players).length !== Object.keys(prev.players).length ||
        Object.keys(data.currentAnswers).length !== Object.keys(prev.currentAnswers).length ||
        data.lastActivity !== prev.lastActivity

      if (changed) {
        roomRef.current = data
        setRoom(data)

        if (prev?.status !== data.status && intervalRef.current) {
          clearInterval(intervalRef.current)
          intervalRef.current = setInterval(
            () => { if (sessionRef.current) fetchRoom(sessionRef.current.playerId) },
            getInterval(data.status),
          )
        }
      }
    } catch {
      // keep last state on network error
    } finally {
      fetchingRef.current = false
    }
  }, [code]) // only code is a real dep here

  // Polling & realtime — deps array size is ALWAYS [session, fetchRoom, code] = 3 items
  useEffect(() => {
    // Session not yet loaded or invalid — don't start polling
    if (!session) return

    const pid = session.playerId
    void fetchRoom(pid)

    intervalRef.current = setInterval(() => fetchRoom(pid), getInterval('waiting'))

    const channel = supabaseClient
      ?.channel(`quiz-room-${code}`)
      .on('postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'quiz_rooms', filter: `code=eq.${code.toUpperCase()}` },
        () => { fetchingRef.current = false; void fetchRoom(pid) },
      )
      .on('postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'quiz_rooms', filter: `code=eq.${code.toUpperCase()}` },
        () => { fetchingRef.current = false; void fetchRoom(pid) },
      )

    channel?.subscribe((status) => {
      if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
        if (intervalRef.current) clearInterval(intervalRef.current)
        intervalRef.current = setInterval(() => fetchRoom(pid), 1000)
      }
    })

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (channel && supabaseClient) supabaseClient.removeChannel(channel)
    }
  }, [session, fetchRoom, code]) // always 3 items — size never changes

  const refetch = useCallback(() => {
    if (!session) return
    fetchingRef.current = false
    void fetchRoom(session.playerId)
  }, [session, fetchRoom])

  return { room, session, error, refetch }
}

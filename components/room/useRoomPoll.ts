'use client'

import { useEffect, useLayoutEffect, useState, useCallback, useRef } from 'react'
import { RoomState, RoomSession } from '@/lib/room-types'
import { supabaseClient } from '@/lib/supabase-client'

function getInterval(status: string | undefined): number {
  if (status === 'playing') return 500
  if (status === 'post_question') return 800
  if (status === 'waiting') return 1000
  return 3000
}

export function useRoomPoll(code: string) {
  const [room, setRoom] = useState<RoomState | null>(null)
  const [session, setSession] = useState<RoomSession | null>(null)
  const [error, setError] = useState('')

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const roomRef = useRef<RoomState | null>(null)
  const fetchingRef = useRef(false)
  const sessionRef = useRef<RoomSession | null>(null)
  const fetchRoomRef = useRef<((pid: string, force?: boolean) => void) | null>(null)

  // Load session from localStorage — client only, no SSR
  useEffect(() => {
    let parsed: RoomSession | null = null
    try {
      const raw = localStorage.getItem('roomSession')
      if (raw) parsed = JSON.parse(raw) as RoomSession
    } catch { /* ignore */ }
    // Schedule state updates in a microtask to avoid sync setState-in-effect warning
    Promise.resolve().then(() => {
      if (!parsed) { setError('Phiên không hợp lệ'); return }
      sessionRef.current = parsed
      setSession(parsed)
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const fetchRoom = useCallback(async (pid: string, force = false) => {
    if (fetchingRef.current && !force) return
    fetchingRef.current = true
    try {
      // No AbortSignal timeout — avoids false failures on Vercel cold starts
      const res = await fetch(`/api/room/${code}?pid=${pid}`)
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
        // Reschedule interval at correct rate when status changes
        if (prev?.status !== data.status && intervalRef.current) {
          clearInterval(intervalRef.current)
          intervalRef.current = setInterval(() => {
            const session = sessionRef.current
            const fn = fetchRoomRef.current
            if (fn && session) fn(session.playerId)
          }, getInterval(data.status))
        }
      }
    } catch {
      // keep last state on error
    } finally {
      fetchingRef.current = false
    }
  }, [code])

  // Keep fetchRoomRef in sync with latest fetchRoom — use useLayoutEffect (runs after render, before paint)
  useLayoutEffect(() => {
    fetchRoomRef.current = fetchRoom
  })

  useEffect(() => {
    if (!session) return

    const pid = session.playerId

    function startInterval(ms: number) {
      if (intervalRef.current) clearInterval(intervalRef.current)
      intervalRef.current = setInterval(() => {
        const fn = fetchRoomRef.current
        if (fn) fn(pid)
      }, ms)
    }

    // Defer first fetch to next tick so it's not "sync setState in effect"
    const firstFetch = setTimeout(() => { void fetchRoom(pid) }, 0)
    startInterval(getInterval('waiting'))

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
      if (status === 'SUBSCRIBED') {
        startInterval(2000) // realtime handles fast updates — polling can relax
      } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT' || status === 'CLOSED') {
        startInterval(getInterval(roomRef.current?.status)) // aggressive polling fallback
      }
    })

    return () => {
      clearTimeout(firstFetch)
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (channel && supabaseClient) supabaseClient.removeChannel(channel)
    }
  }, [session, fetchRoom, code])

  const refetch = useCallback(() => {
    if (!session) return
    fetchingRef.current = false
    void fetchRoom(session.playerId, true)
  }, [session, fetchRoom])

  return { room, session, error, refetch }
}

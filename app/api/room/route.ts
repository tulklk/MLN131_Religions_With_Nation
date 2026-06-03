import { NextRequest, NextResponse } from 'next/server'
import { createRoom } from '@/lib/server/room-store'
import { getSupabaseAdmin } from '@/lib/server/supabase-admin'
import { apiErrorResponse } from '@/lib/server/api-error'
import { RoomState } from '@/lib/room-types'

export async function GET() {
  try {
    const { data, error } = await getSupabaseAdmin()
      .from('quiz_rooms')
      .select('code, state')
      .order('created_at', { ascending: false })
      .limit(20)

    if (error) throw error

    // Return only rooms that are waiting or playing (not finished), active in last 2h
    const cutoff = Date.now() - 2 * 60 * 60 * 1000
    const rooms = (data ?? [])
      .map(row => row.state as RoomState)
      .filter(r => r && r.status !== 'finished' && r.lastActivity > cutoff)
      .map(r => ({
        code: r.code,
        hostName: r.hostName,
        status: r.status,
        playerCount: Object.keys(r.players).filter(id => id !== r.hostId).length,
      }))

    return NextResponse.json({ rooms })
  } catch (error) {
    console.error('[GET /api/room]', error)
    return NextResponse.json({ rooms: [] })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const hostName = String(body.hostName ?? '').trim().slice(0, 20)
    if (!hostName) return NextResponse.json({ error: 'Cần nhập tên' }, { status: 400 })

    const { room, playerId } = await createRoom(hostName)
    return NextResponse.json({ code: room.code, playerId, hostName })
  } catch (error) {
    console.error('[POST /api/room]', error)
    return apiErrorResponse(error, 'Không tạo được phòng')
  }
}

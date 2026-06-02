import { NextRequest, NextResponse } from 'next/server'
import { createRoom } from '@/lib/server/room-store'
import { apiErrorResponse } from '@/lib/server/api-error'

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

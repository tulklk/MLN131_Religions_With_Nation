import { NextRequest, NextResponse } from 'next/server'
import { createRoom } from '@/lib/server/room-store'

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}))
  const hostName = String(body.hostName ?? '').trim().slice(0, 20)
  if (!hostName) return NextResponse.json({ error: 'Cần nhập tên' }, { status: 400 })

  const { room, playerId } = createRoom(hostName)
  return NextResponse.json({ code: room.code, playerId, hostName })
}

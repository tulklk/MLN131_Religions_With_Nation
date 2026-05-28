import { NextRequest, NextResponse } from 'next/server'
import { getRoom, touchPlayer } from '@/lib/server/room-store'

export async function GET(req: NextRequest, { params }: { params: Promise<{ code: string }> }) {
  const { code } = await params
  const playerId = req.nextUrl.searchParams.get('pid') ?? ''
  const room = getRoom(code)
  if (!room) return NextResponse.json({ error: 'Phòng không tồn tại' }, { status: 404 })
  if (playerId) touchPlayer(code, playerId)
  return NextResponse.json(room)
}

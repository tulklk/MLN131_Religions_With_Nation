import { NextRequest, NextResponse } from 'next/server'
import { joinRoom } from '@/lib/server/room-store'

export async function POST(req: NextRequest, { params }: { params: Promise<{ code: string }> }) {
  const { code } = await params
  const body = await req.json().catch(() => ({}))
  const name = String(body.name ?? '').trim().slice(0, 20)
  if (!name) return NextResponse.json({ error: 'Cần nhập tên' }, { status: 400 })

  const result = joinRoom(code, name)
  if ('error' in result) return NextResponse.json({ error: result.error }, { status: 400 })
  return NextResponse.json({ code: result.room.code, playerId: result.playerId, name })
}

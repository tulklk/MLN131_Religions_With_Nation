import { NextRequest, NextResponse } from 'next/server'
import { startGame } from '@/lib/server/room-store'

export async function POST(req: NextRequest, { params }: { params: Promise<{ code: string }> }) {
  const { code } = await params
  const { hostId } = await req.json().catch(() => ({}))
  const room = startGame(code, hostId)
  if (!room) return NextResponse.json({ error: 'Không thể bắt đầu' }, { status: 400 })
  return NextResponse.json({ ok: true })
}

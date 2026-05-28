import { NextRequest, NextResponse } from 'next/server'
import { showResults } from '@/lib/server/room-store'

export async function POST(req: NextRequest, { params }: { params: Promise<{ code: string }> }) {
  const { code } = await params
  const { hostId } = await req.json().catch(() => ({}))
  const room = showResults(code, hostId)
  if (!room) return NextResponse.json({ error: 'Không hợp lệ' }, { status: 400 })
  return NextResponse.json({ ok: true })
}

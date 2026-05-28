import { NextRequest, NextResponse } from 'next/server'
import { submitAnswer } from '@/lib/server/room-store'
import { PowerUpType } from '@/lib/room-types'

export async function POST(req: NextRequest, { params }: { params: Promise<{ code: string }> }) {
  const { code } = await params
  const body = await req.json().catch(() => ({}))
  const { playerId, answerIndex, powerUpUsed } = body

  if (!playerId || typeof answerIndex !== 'number') {
    return NextResponse.json({ error: 'Thiếu dữ liệu' }, { status: 400 })
  }

  const result = submitAnswer(code, playerId, answerIndex, powerUpUsed as PowerUpType | null)
  if (!result.success) return NextResponse.json({ error: result.error }, { status: 400 })
  return NextResponse.json({ ok: true, answer: result.room?.currentAnswers[playerId] })
}

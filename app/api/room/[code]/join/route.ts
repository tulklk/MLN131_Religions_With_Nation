import { NextRequest, NextResponse } from 'next/server'
import { joinRoom } from '@/lib/server/room-store'
import { apiErrorResponse } from '@/lib/server/api-error'

export async function POST(req: NextRequest, { params }: { params: Promise<{ code: string }> }) {
  try {
    const { code } = await params
    const body = await req.json().catch(() => ({}))
    const name = String(body.name ?? '').trim().slice(0, 20)
    if (!name) return NextResponse.json({ error: 'Cần nhập tên' }, { status: 400 })

    const result = await joinRoom(code, name)
    if ('error' in result) return NextResponse.json({ error: result.error }, { status: 400 })

    // Verify the save actually persisted by reading back
    const { getRoom } = await import('@/lib/server/room-store')
    const verify = await getRoom(code)
    if (!verify?.players[result.playerId]) {
      console.error(`[join] Player ${result.playerId} not found in room after save!`)
      return NextResponse.json({ error: 'Lỗi lưu dữ liệu, thử lại' }, { status: 500 })
    }

    return NextResponse.json({ code: result.room.code, playerId: result.playerId, name })
  } catch (error) {
    console.error('[POST /api/room/[code]/join]', error)
    return apiErrorResponse(error, 'Không vào được phòng')
  }
}

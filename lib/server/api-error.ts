import { NextResponse } from 'next/server'

export function apiErrorResponse(error: unknown, fallback = 'Lỗi server') {
  const message = error instanceof Error ? error.message : fallback
  return NextResponse.json({ error: message }, { status: 500 })
}

'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const D = "'Cormorant Garamond', Georgia, serif"
const B = "'Lora', Georgia, serif"
const GOLD = '#C9A84C'
const PARCHMENT = '#F5EDD6'
const MUTED = 'rgba(245,237,214,0.55)'
const CARD: React.CSSProperties = { background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.22)', borderRadius: '8px' }
const BG: React.CSSProperties = {
  minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem',
  backgroundImage: 'radial-gradient(ellipse at 50% 35%, #1e1508 0%, #0d0d0d 65%)',
  backgroundAttachment: 'fixed', backgroundSize: 'cover', backgroundColor: '#0D0D0D',
  color: PARCHMENT, fontFamily: B,
}
const INPUT: React.CSSProperties = {
  width: '100%', padding: '0.85rem 1rem', borderRadius: '6px',
  background: 'rgba(201,168,76,0.04)', border: '1px solid rgba(201,168,76,0.2)',
  color: PARCHMENT, fontFamily: B, fontSize: '1rem', outline: 'none',
}
const BTN_PRIMARY: React.CSSProperties = {
  width: '100%', padding: '1rem', borderRadius: '6px', cursor: 'pointer', border: 'none',
  fontFamily: D, fontSize: '1.1rem', fontWeight: 600, letterSpacing: '0.08em',
  color: '#0D0D0D', background: `linear-gradient(135deg, ${GOLD}, #a07830)`,
}
const BTN_GHOST: React.CSSProperties = {
  width: '100%', padding: '0.85rem', borderRadius: '6px', cursor: 'pointer',
  fontFamily: D, fontSize: '0.95rem', fontWeight: 600, letterSpacing: '0.06em',
  color: GOLD, background: 'transparent', border: `1.5px solid rgba(201,168,76,0.4)`,
}

type Mode = 'home' | 'create' | 'join'

export default function RoomEntry() {
  const router = useRouter()
  const [mode, setMode] = useState<Mode>('home')
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function parseJsonResponse(res: Response) {
    try { return await res.json() } catch { return { error: 'Phản hồi server không hợp lệ' } }
  }

  async function handleCreate() {
    if (!name.trim()) { setError('Nhập tên của bạn'); return }
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/room', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ hostName: name.trim() }) })
      const data = await parseJsonResponse(res)
      if (!res.ok) { setError(String(data.error ?? 'Không tạo được phòng')); return }
      localStorage.setItem('roomSession', JSON.stringify({ code: data.code, playerId: data.playerId, isHost: true, name: data.hostName }))
      router.push(`/room/${data.code}/host`)
    } catch { setError('Mất kết nối server. Kiểm tra mạng hoặc cấu hình Supabase.') }
    finally { setLoading(false) }
  }

  async function handleJoin() {
    if (!name.trim()) { setError('Nhập tên của bạn'); return }
    if (!code.trim()) { setError('Nhập mã phòng'); return }
    setLoading(true); setError('')
    try {
      const res = await fetch(`/api/room/${code.toUpperCase()}/join`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: name.trim() }) })
      const data = await parseJsonResponse(res)
      if (!res.ok) { setError(String(data.error ?? 'Không vào được phòng')); return }
      localStorage.setItem('roomSession', JSON.stringify({ code: data.code, playerId: data.playerId, isHost: false, name: data.name }))
      router.push(`/room/${data.code}`)
    } catch { setError('Mất kết nối server. Thử lại sau.') }
    finally { setLoading(false) }
  }

  return (
    <div style={BG}>
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} style={{ width: '100%', maxWidth: '420px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span style={{ display: 'inline-block', fontFamily: B, fontSize: '0.72rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: GOLD, border: '1px solid rgba(201,168,76,0.3)', background: 'rgba(201,168,76,0.06)', padding: '0.25rem 1rem', borderRadius: '20px', marginBottom: '1.25rem' }}>
            MLN131 · Tôn giáo &amp; Dân tộc
          </span>
          <h1 style={{ fontFamily: D, fontSize: '2.8rem', fontWeight: 700, color: PARCHMENT, lineHeight: 1.1, marginBottom: '0.25rem' }}>Phòng thi Quiz</h1>
          <div style={{ width: '44px', height: '2px', background: GOLD, margin: '1rem auto 0', opacity: 0.55 }} />
        </div>

        <AnimatePresence mode="wait">
          {mode === 'home' && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={() => setMode('create')} style={BTN_PRIMARY}>
                Tạo phòng
              </motion.button>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={() => setMode('join')} style={BTN_GHOST}>
                Tham gia phòng
              </motion.button>
              <Link href="/quiz" style={{ display: 'block', textAlign: 'center', fontFamily: B, fontSize: '0.85rem', color: MUTED, marginTop: '1rem', textDecoration: 'none' }}>
                Chơi đơn không cần phòng
              </Link>
            </motion.div>
          )}

          {mode === 'create' && (
            <motion.div key="create" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <h2 style={{ fontFamily: D, fontSize: '1.5rem', fontWeight: 600, color: GOLD, marginBottom: '0.25rem' }}>Tạo phòng mới</h2>
              <input type="text" placeholder="Tên của bạn (host)" maxLength={20} value={name} onChange={e => setName(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleCreate()} style={INPUT} />
              {error && <p style={{ fontFamily: B, fontSize: '0.85rem', color: '#c87070' }}>{error}</p>}
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={handleCreate} disabled={loading} style={{ ...BTN_PRIMARY, opacity: loading ? 0.6 : 1 }}>
                {loading ? 'Đang tạo...' : 'Tạo phòng'}
              </motion.button>
              <button onClick={() => { setMode('home'); setError('') }} style={{ fontFamily: B, fontSize: '0.85rem', color: MUTED, background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem' }}>
                Quay lại
              </button>
            </motion.div>
          )}

          {mode === 'join' && (
            <motion.div key="join" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <h2 style={{ fontFamily: D, fontSize: '1.5rem', fontWeight: 600, color: GOLD, marginBottom: '0.25rem' }}>Tham gia phòng</h2>
              <input type="text" placeholder="Tên của bạn" maxLength={20} value={name} onChange={e => setName(e.target.value)} style={INPUT} />
              <input type="text" placeholder="Mã phòng (6 ký tự)" maxLength={6} value={code} onChange={e => setCode(e.target.value.toUpperCase())} onKeyDown={e => e.key === 'Enter' && handleJoin()}
                style={{ ...INPUT, fontFamily: D, fontSize: '1.4rem', letterSpacing: '0.35em', textAlign: 'center' }} />
              {error && <p style={{ fontFamily: B, fontSize: '0.85rem', color: '#c87070' }}>{error}</p>}
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={handleJoin} disabled={loading} style={{ ...BTN_PRIMARY, opacity: loading ? 0.6 : 1 }}>
                {loading ? 'Đang vào...' : 'Tham gia'}
              </motion.button>
              <button onClick={() => { setMode('home'); setError('') }} style={{ fontFamily: B, fontSize: '0.85rem', color: MUTED, background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem' }}>
                Quay lại
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

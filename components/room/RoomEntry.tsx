'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type Mode = 'home' | 'create' | 'join'

export default function RoomEntry() {
  const router = useRouter()
  const [mode, setMode] = useState<Mode>('home')
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleCreate() {
    if (!name.trim()) { setError('Nhập tên của bạn'); return }
    setLoading(true); setError('')
    const res = await fetch('/api/room', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ hostName: name.trim() }),
    })
    const data = await res.json()
    if (!res.ok) { setError(data.error); setLoading(false); return }
    localStorage.setItem('roomSession', JSON.stringify({ code: data.code, playerId: data.playerId, isHost: true, name: data.hostName }))
    router.push(`/room/${data.code}/host`)
  }

  async function handleJoin() {
    if (!name.trim()) { setError('Nhập tên của bạn'); return }
    if (!code.trim()) { setError('Nhập mã phòng'); return }
    setLoading(true); setError('')
    const res = await fetch(`/api/room/${code.toUpperCase()}/join`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name.trim() }),
    })
    const data = await res.json()
    if (!res.ok) { setError(data.error); setLoading(false); return }
    localStorage.setItem('roomSession', JSON.stringify({ code: data.code, playerId: data.playerId, isHost: false, name: data.name }))
    router.push(`/room/${data.code}`)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: '#0f0e17' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🏛️</div>
          <h1 className="font-display text-3xl font-black text-white mb-1">Phòng thi Quiz</h1>
          <p className="text-ghost font-viet text-sm">MLN131 · Tôn giáo & Dân tộc</p>
        </div>

        <AnimatePresence mode="wait">
          {mode === 'home' && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                onClick={() => setMode('create')}
                className="w-full py-5 rounded-2xl font-viet font-bold text-xl text-ink flex items-center justify-center gap-3"
                style={{ background: 'linear-gradient(135deg, #f4e04d, #d4a017)' }}
              >
                <span>🎮</span> Tạo phòng
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                onClick={() => setMode('join')}
                className="w-full py-5 rounded-2xl font-viet font-bold text-xl text-white border border-white/20 bg-surface/40 flex items-center justify-center gap-3 hover:bg-surface/60 transition-colors"
              >
                <span>🚪</span> Tham gia phòng
              </motion.button>
              <Link href="/quiz" className="block text-center text-ghost/60 font-viet text-sm mt-4 hover:text-ghost transition-colors">
                ← Chơi đơn không cần phòng
              </Link>
            </motion.div>
          )}

          {mode === 'create' && (
            <motion.div key="create" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="space-y-4">
              <h2 className="font-display text-xl font-bold text-white">🎮 Tạo phòng mới</h2>
              <input
                type="text" placeholder="Tên của bạn (host)" maxLength={20}
                value={name} onChange={e => setName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleCreate()}
                className="w-full bg-surface/60 border border-white/15 rounded-xl px-4 py-3 text-white font-viet placeholder-muted focus:outline-none focus:border-gold-500/60 transition-colors"
              />
              {error && <p className="text-red-400 text-sm font-viet">{error}</p>}
              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                onClick={handleCreate} disabled={loading}
                className="w-full py-4 rounded-2xl font-viet font-bold text-lg text-ink disabled:opacity-60"
                style={{ background: 'linear-gradient(135deg, #f4e04d, #d4a017)' }}
              >
                {loading ? 'Đang tạo...' : 'Tạo phòng →'}
              </motion.button>
              <button onClick={() => { setMode('home'); setError('') }} className="w-full text-ghost/60 font-viet text-sm hover:text-ghost transition-colors">
                ← Quay lại
              </button>
            </motion.div>
          )}

          {mode === 'join' && (
            <motion.div key="join" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="space-y-4">
              <h2 className="font-display text-xl font-bold text-white">🚪 Tham gia phòng</h2>
              <input
                type="text" placeholder="Tên của bạn" maxLength={20}
                value={name} onChange={e => setName(e.target.value)}
                className="w-full bg-surface/60 border border-white/15 rounded-xl px-4 py-3 text-white font-viet placeholder-muted focus:outline-none focus:border-gold-500/60 transition-colors"
              />
              <input
                type="text" placeholder="Mã phòng (6 ký tự)" maxLength={6}
                value={code} onChange={e => setCode(e.target.value.toUpperCase())}
                onKeyDown={e => e.key === 'Enter' && handleJoin()}
                className="w-full bg-surface/60 border border-white/15 rounded-xl px-4 py-3 text-white font-mono text-xl tracking-[0.3em] placeholder-muted focus:outline-none focus:border-gold-500/60 transition-colors uppercase"
              />
              {error && <p className="text-red-400 text-sm font-viet">{error}</p>}
              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                onClick={handleJoin} disabled={loading}
                className="w-full py-4 rounded-2xl font-viet font-bold text-lg text-ink disabled:opacity-60"
                style={{ background: 'linear-gradient(135deg, #f4e04d, #d4a017)' }}
              >
                {loading ? 'Đang vào...' : 'Tham gia →'}
              </motion.button>
              <button onClick={() => { setMode('home'); setError('') }} className="w-full text-ghost/60 font-viet text-sm hover:text-ghost transition-colors">
                ← Quay lại
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

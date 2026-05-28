'use client'

import { useParams } from 'next/navigation'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRoomPoll } from './useRoomPoll'
import { QUIZ_QUESTIONS } from '@/lib/quiz-data'
import MiniLeaderboard from './MiniLeaderboard'
import FinalPodium from './FinalPodium'

export default function HostView() {
  const params = useParams()
  const code = (params.code as string).toUpperCase()
  const { room, session, error } = useRoomPoll(code)
  const [busy, setBusy] = useState(false)
  const [showEndConfirm, setShowEndConfirm] = useState(false)

  async function post(endpoint: string) {
    if (!session) return
    setBusy(true)
    await fetch(`/api/room/${code}/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ hostId: session.playerId }),
    })
    setBusy(false)
  }

  if (error) return <div className="min-h-screen flex items-center justify-center" style={{ background: '#0f0e17' }}><p className="text-red-400 font-viet">{error}</p></div>
  if (!room || !session) return <div className="min-h-screen flex items-center justify-center" style={{ background: '#0f0e17' }}><p className="text-ghost font-viet">Đang tải...</p></div>

  if (room.status === 'finished') {
    return <FinalPodium entries={room.leaderboard} myPlayerId={session.playerId} isHost={true} />
  }

  const q = room.status !== 'waiting' ? QUIZ_QUESTIONS[room.currentQ] : null
  // Exclude host from competitor list & answer count
  const playerList = Object.values(room.players).filter(p => p.id !== session.playerId)
  const answeredCount = playerList.filter(p => room.currentAnswers[p.id]).length
  const totalPlayers = playerList.length
  const answerPct = totalPlayers > 0 ? (answeredCount / totalPlayers) * 100 : 0

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0f0e17' }}>
      {/* Top bar */}
      <div className="border-b border-white/8 bg-surface/30 px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <div className="font-mono text-gold-400 font-black text-2xl tracking-[0.2em]">{code}</div>
            <div className="text-ghost/60 font-viet text-xs">Host: {session.name} · {totalPlayers} người chơi</div>
          </div>
          <div className="flex items-center gap-3">
            {room.status !== 'waiting' && (
              <div className="text-ghost font-mono text-sm">
                Câu <span className="text-white font-bold">{room.currentQ + 1}</span>/{room.totalQ}
              </div>
            )}
            <button
              onClick={() => setShowEndConfirm(true)}
              className="px-4 py-2 rounded-xl bg-red-900/40 border border-red-700/50 text-red-400 font-viet font-semibold text-sm hover:bg-red-800/50 transition-colors"
            >
              ⏹ Kết thúc
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-5xl mx-auto w-full px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Game controls */}
        <div className="lg:col-span-2 space-y-4">
          {room.status === 'waiting' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-surface/40 border border-white/10 rounded-2xl p-8 text-center">
              <div className="text-5xl mb-4">🎮</div>
              <h2 className="font-display text-2xl font-bold text-white mb-2">Phòng đang mở</h2>
              <p className="text-ghost font-viet text-sm mb-6">
                Chia sẻ mã <span className="text-gold-400 font-mono font-black text-xl tracking-[0.2em]">{code}</span> cho người chơi
              </p>
              <div className="text-ghost/60 font-viet text-sm mb-8">
                {totalPlayers === 0 ? 'Chưa có người tham gia' : `${totalPlayers} người đã vào phòng`}
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                onClick={() => post('start')}
                disabled={busy || totalPlayers < 1}
                className="px-8 py-4 rounded-2xl font-viet font-bold text-lg text-ink disabled:opacity-50"
                style={{ background: 'linear-gradient(135deg, #f4e04d, #d4a017)' }}
              >
                {totalPlayers < 1 ? 'Chờ người tham gia...' : '▶ Bắt đầu trò chơi'}
              </motion.button>
              {totalPlayers < 1 && (
                <p className="text-ghost/40 font-viet text-xs mt-3">Cần ít nhất 1 người chơi để bắt đầu</p>
              )}
            </motion.div>
          )}

          {(room.status === 'playing' || room.status === 'post_question') && q && (
            <div className="space-y-4">
              {/* Question preview */}
              <div className="bg-surface/40 border border-white/10 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-muted uppercase tracking-widest">
                    {q.category === 'phat-giao' ? '🪷 Phật giáo' : q.category === 'cong-giao' ? '✝️ Công giáo' : q.category === 'mac-lenin' ? '📖 Mác-Lênin' : '⚖️ Pháp luật'}
                  </span>
                  <span className="text-xs font-mono text-muted">
                    {q.difficulty === 'easy' ? '⭐ Dễ' : q.difficulty === 'medium' ? '⭐⭐ Vừa' : '⭐⭐⭐ Khó'}
                  </span>
                </div>
                <p className="text-white font-viet font-semibold leading-relaxed mb-4">{q.question}</p>
                <div className="grid grid-cols-2 gap-2">
                  {q.answers.map((ans, i) => (
                    <div key={i} className={`px-3 py-2 rounded-lg text-sm font-viet border ${i === q.correct ? 'bg-green-900/40 border-green-500/50 text-green-300' : 'bg-surface/40 border-white/8 text-ghost'}`}>
                      <span className="font-mono font-bold mr-1">{['A', 'B', 'C', 'D'][i]}.</span>{ans}
                      {i === q.correct && <span className="ml-1 text-green-400">✓</span>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Answer progress */}
              {room.status === 'playing' && (
                <div className="bg-surface/40 border border-white/10 rounded-2xl p-5">
                  <div className="flex justify-between mb-2">
                    <span className="text-ghost font-viet text-sm">Đã trả lời</span>
                    <span className="text-white font-mono font-bold">{answeredCount}/{totalPlayers}</span>
                  </div>
                  <div className="h-3 bg-surface-2 rounded-full overflow-hidden mb-4">
                    <motion.div
                      animate={{ width: `${answerPct}%` }}
                      transition={{ duration: 0.5 }}
                      className="h-full rounded-full bg-gradient-to-r from-gold-500 to-gold-300"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                    onClick={() => post('results')}
                    disabled={busy}
                    className="w-full py-3 rounded-xl font-viet font-bold text-white border border-white/20 bg-white/5 hover:bg-white/10 transition-colors disabled:opacity-50"
                  >
                    📊 Xem kết quả ngay
                  </motion.button>
                </div>
              )}

              {room.status === 'post_question' && (
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    onClick={() => post('next')}
                    disabled={busy}
                    className="flex-1 py-4 rounded-2xl font-viet font-bold text-lg text-ink disabled:opacity-50"
                    style={{ background: 'linear-gradient(135deg, #f4e04d, #d4a017)' }}
                  >
                    {room.currentQ + 1 >= room.totalQ ? '🏆 Kết thúc & Xem BXH' : '→ Câu tiếp theo'}
                  </motion.button>
                </div>
              )}
            </div>
          )}

          {/* Mini leaderboard in post_question */}
          {room.status === 'post_question' && (
            <MiniLeaderboard
              entries={room.leaderboard}
              myPlayerId={session.playerId}
              questionIndex={room.currentQ}
              totalQ={room.totalQ}
            />
          )}
        </div>

        {/* Right: Player list */}
        <div className="space-y-3">
          <h3 className="font-display text-lg font-bold text-white">Người chơi</h3>
          <div className="space-y-2 max-h-[70vh] overflow-y-auto pr-1">
            {playerList.map(p => {
              const answered = !!room.currentAnswers[p.id]
              const ans = room.currentAnswers[p.id]
              return (
                <div key={p.id} className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border transition-colors ${
                  answered
                    ? ans?.isCorrect ? 'bg-green-900/20 border-green-500/30' : 'bg-red-900/20 border-red-500/30'
                    : 'bg-surface/30 border-white/8'
                }`}>
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${answered ? (ans?.isCorrect ? 'bg-green-400' : 'bg-red-400') : 'bg-gray-600'}`} />
                  <span className="flex-1 font-viet text-sm text-white truncate">{p.name}</span>
                  <span className="font-mono text-xs text-ghost">{p.score.toLocaleString()}</span>
                  {p.streak >= 2 && <span className="text-xs text-orange-400">🔥{p.streak}</span>}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* End confirm modal */}
      <AnimatePresence>
        {showEndConfirm && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
            onClick={() => setShowEndConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              onClick={e => e.stopPropagation()}
              className="bg-surface border border-white/15 rounded-2xl p-8 max-w-sm w-full text-center"
            >
              <div className="text-4xl mb-3">⚠️</div>
              <h3 className="font-display text-xl font-bold text-white mb-2">Kết thúc trò chơi?</h3>
              <p className="text-ghost font-viet text-sm mb-6">Bảng xếp hạng cuối sẽ được hiển thị cho tất cả người chơi.</p>
              <div className="flex gap-3">
                <button onClick={() => setShowEndConfirm(false)} className="flex-1 py-3 rounded-xl border border-white/15 text-ghost font-viet hover:bg-surface-2 transition-colors">
                  Huỷ
                </button>
                <button
                  onClick={() => { setShowEndConfirm(false); post('end') }}
                  className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-viet font-bold transition-colors"
                >
                  Kết thúc
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

'use client'

import { useParams } from 'next/navigation'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRoomPoll } from './useRoomPoll'
import { QUIZ_QUESTIONS } from '@/lib/quiz-data'
import MiniLeaderboard from './MiniLeaderboard'
import FinalPodium from './FinalPodium'

const D = "'Cormorant Garamond', Georgia, serif"
const B = "'Lora', Georgia, serif"
const GOLD = '#C9A84C'
const PARCHMENT = '#F5EDD6'
const MUTED = 'rgba(245,237,214,0.55)'
const BG: React.CSSProperties = {
  minHeight: '100vh', display: 'flex', flexDirection: 'column',
  backgroundImage: 'radial-gradient(ellipse at 50% 35%, #1e1508 0%, #0d0d0d 65%)',
  backgroundAttachment: 'fixed', backgroundSize: 'cover', backgroundColor: '#0D0D0D',
  color: PARCHMENT, fontFamily: B,
}
const CARD: React.CSSProperties = { background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.22)', borderRadius: '8px' }
const BTN_PRIMARY: React.CSSProperties = { padding: '0.9rem 2rem', borderRadius: '6px', cursor: 'pointer', border: 'none', fontFamily: D, fontSize: '1.05rem', fontWeight: 600, letterSpacing: '0.08em', color: '#0D0D0D', background: `linear-gradient(135deg, ${GOLD}, #a07830)` }

export default function HostView() {
  const params = useParams()
  const code = (params.code as string).toUpperCase()
  const { room, session, error } = useRoomPoll(code)
  const [busy, setBusy] = useState(false)
  const [showEndConfirm, setShowEndConfirm] = useState(false)

  async function post(endpoint: string) {
    if (!session) return
    setBusy(true)
    await fetch(`/api/room/${code}/${endpoint}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ hostId: session.playerId }) })
    setBusy(false)
  }

  if (error) return <div style={{ ...BG, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><p style={{ fontFamily: B, color: '#c87070' }}>{error}</p></div>
  if (!room || !session) return <div style={{ ...BG, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><p style={{ fontFamily: B, color: MUTED }}>Đang tải...</p></div>

  if (room.status === 'finished') return <FinalPodium entries={room.leaderboard} myPlayerId={session.playerId} isHost={true} />

  const q = room.status !== 'waiting' ? QUIZ_QUESTIONS[room.currentQ] : null
  const playerList = Object.values(room.players).filter(p => p.id !== session.playerId)
  const answeredCount = playerList.filter(p => room.currentAnswers[p.id]).length
  const totalPlayers = playerList.length
  const answerPct = totalPlayers > 0 ? (answeredCount / totalPlayers) * 100 : 0

  return (
    <div style={BG}>
      {/* Top bar */}
      <div style={{ borderBottom: '1px solid rgba(201,168,76,0.12)', background: 'rgba(13,13,13,0.8)', backdropFilter: 'blur(8px)', padding: '0.75rem 1.5rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: D, fontSize: '1.8rem', fontWeight: 700, color: GOLD, letterSpacing: '0.2em' }}>{code}</div>
            <div style={{ fontFamily: B, fontSize: '0.78rem', color: MUTED }}>Host: {session.name} · {totalPlayers} người chơi</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {room.status !== 'waiting' && (
              <span style={{ fontFamily: B, fontSize: '0.88rem', color: MUTED }}>
                Câu <span style={{ color: PARCHMENT, fontWeight: 600 }}>{room.currentQ + 1}</span>/{room.totalQ}
              </span>
            )}
            <button
              onClick={() => setShowEndConfirm(true)}
              style={{ padding: '0.5rem 1rem', borderRadius: '6px', background: 'rgba(139,26,26,0.15)', border: '1px solid rgba(139,26,26,0.45)', color: '#c87070', fontFamily: B, fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}
            >
              Kết thúc
            </button>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, maxWidth: '1100px', margin: '0 auto', width: '100%', padding: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 300px', gap: '1.5rem' }}>
        {/* Left: Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {room.status === 'waiting' && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ ...CARD, padding: '2.5rem', textAlign: 'center' }}>
              <div style={{ width: '44px', height: '2px', background: GOLD, margin: '0 auto 1.5rem', opacity: 0.55 }} />
              <h2 style={{ fontFamily: D, fontSize: '2rem', fontWeight: 700, color: PARCHMENT, marginBottom: '0.75rem' }}>Phòng đang mở</h2>
              <p style={{ fontFamily: B, fontSize: '0.9rem', color: MUTED, marginBottom: '0.5rem' }}>
                Chia sẻ mã <span style={{ fontFamily: D, fontSize: '1.5rem', fontWeight: 700, color: GOLD, letterSpacing: '0.2em' }}>{code}</span> cho người chơi
              </p>
              <div style={{ fontFamily: B, fontSize: '0.85rem', color: MUTED, marginBottom: '2rem' }}>
                {totalPlayers === 0 ? 'Chưa có người tham gia' : `${totalPlayers} người đã vào phòng`}
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                onClick={() => post('start')} disabled={busy || totalPlayers < 1}
                style={{ ...BTN_PRIMARY, opacity: busy || totalPlayers < 1 ? 0.5 : 1 }}
              >
                {totalPlayers < 1 ? 'Chờ người tham gia...' : 'Bắt đầu trò chơi'}
              </motion.button>
            </motion.div>
          )}

          {(room.status === 'playing' || room.status === 'post_question') && q && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Question preview */}
              <div style={CARD}>
                <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid rgba(201,168,76,0.12)', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: B, fontSize: '0.75rem', color: GOLD, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                    {q.category === 'phat-giao' ? 'Phật giáo' : q.category === 'cong-giao' ? 'Công giáo' : q.category === 'mac-lenin' ? 'Mác-Lênin' : 'Pháp luật'}
                  </span>
                  <span style={{ fontFamily: B, fontSize: '0.75rem', color: MUTED, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {q.difficulty === 'easy' ? 'Cơ bản' : q.difficulty === 'medium' ? 'Trung bình' : 'Nâng cao'}
                  </span>
                </div>
                <div style={{ padding: '1.25rem 1.5rem' }}>
                  <p style={{ fontFamily: D, fontSize: '1.15rem', fontWeight: 600, color: PARCHMENT, lineHeight: 1.55, marginBottom: '1rem' }}>{q.question}</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    {q.answers.map((ans, i) => (
                      <div key={i} style={{
                        padding: '0.6rem 0.85rem', borderRadius: '6px', fontSize: '0.85rem', fontFamily: B,
                        background: i === q.correct ? 'rgba(40,120,80,0.2)' : 'rgba(201,168,76,0.04)',
                        border: `1px solid ${i === q.correct ? 'rgba(40,120,80,0.5)' : 'rgba(201,168,76,0.12)'}`,
                        color: i === q.correct ? '#7dc99a' : MUTED,
                      }}>
                        <span style={{ fontFamily: D, fontWeight: 700, marginRight: '0.35rem' }}>{['A','B','C','D'][i]}.</span>
                        {ans}
                        {i === q.correct && <span style={{ marginLeft: '0.4rem', color: '#7dc99a' }}> ✓</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {room.status === 'playing' && (
                <div style={{ ...CARD, padding: '1.25rem 1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontFamily: B, fontSize: '0.85rem', color: MUTED }}>Đã trả lời</span>
                    <span style={{ fontFamily: D, fontSize: '1rem', fontWeight: 700, color: GOLD }}>{answeredCount}/{totalPlayers}</span>
                  </div>
                  <div style={{ height: '6px', background: 'rgba(201,168,76,0.1)', borderRadius: '3px', overflow: 'hidden', marginBottom: '1rem' }}>
                    <motion.div animate={{ width: `${answerPct}%` }} transition={{ duration: 0.5 }} style={{ height: '100%', borderRadius: '3px', background: `linear-gradient(90deg, ${GOLD}, #e8c870)` }} />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                    onClick={() => post('results')} disabled={busy}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', fontFamily: B, fontSize: '0.9rem', fontWeight: 600, color: GOLD, background: 'transparent', border: '1px solid rgba(201,168,76,0.35)', cursor: 'pointer', opacity: busy ? 0.5 : 1 }}
                  >
                    Xem kết quả ngay
                  </motion.button>
                </div>
              )}

              {room.status === 'post_question' && (
                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  onClick={() => post('next')} disabled={busy}
                  style={{ ...BTN_PRIMARY, width: '100%', padding: '1rem', opacity: busy ? 0.5 : 1 }}
                >
                  {room.currentQ + 1 >= room.totalQ ? 'Kết thúc & Xem bảng xếp hạng' : 'Câu tiếp theo'}
                </motion.button>
              )}
            </div>
          )}

          {room.status === 'post_question' && (
            <MiniLeaderboard entries={room.leaderboard} myPlayerId={session.playerId} questionIndex={room.currentQ} totalQ={room.totalQ} />
          )}
        </div>

        {/* Right: Player list */}
        <div>
          <h3 style={{ fontFamily: D, fontSize: '1.2rem', fontWeight: 600, color: PARCHMENT, marginBottom: '0.75rem' }}>Người chơi</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', maxHeight: '70vh', overflowY: 'auto' }}>
            {playerList.map(p => {
              const answered = !!room.currentAnswers[p.id]
              const ans = room.currentAnswers[p.id]
              return (
                <div key={p.id} style={{
                  display: 'flex', alignItems: 'center', gap: '0.6rem',
                  padding: '0.6rem 0.85rem', borderRadius: '6px',
                  background: answered ? (ans?.isCorrect ? 'rgba(40,120,80,0.12)' : 'rgba(139,26,26,0.12)') : 'rgba(201,168,76,0.04)',
                  border: `1px solid ${answered ? (ans?.isCorrect ? 'rgba(40,120,80,0.4)' : 'rgba(139,26,26,0.4)') : 'rgba(201,168,76,0.12)'}`,
                }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', flexShrink: 0, background: answered ? (ans?.isCorrect ? '#7dc99a' : '#c87070') : 'rgba(245,237,214,0.2)' }} />
                  <span style={{ flex: 1, fontFamily: B, fontSize: '0.85rem', color: PARCHMENT, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</span>
                  <span style={{ fontFamily: D, fontSize: '0.85rem', color: MUTED }}>{p.score.toLocaleString()}</span>
                  {p.streak >= 2 && <span style={{ fontFamily: B, fontSize: '0.75rem', color: '#e8a060' }}>×{p.streak}</span>}
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
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: '1.5rem' }}
            onClick={() => setShowEndConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.92 }} animate={{ scale: 1 }} exit={{ scale: 0.92 }}
              onClick={e => e.stopPropagation()}
              style={{ ...CARD, padding: '2rem', maxWidth: '380px', width: '100%', textAlign: 'center' }}
            >
              <h3 style={{ fontFamily: D, fontSize: '1.8rem', fontWeight: 700, color: PARCHMENT, marginBottom: '0.5rem' }}>Kết thúc trò chơi?</h3>
              <p style={{ fontFamily: B, fontSize: '0.88rem', color: MUTED, marginBottom: '1.5rem' }}>Bảng xếp hạng cuối sẽ được hiển thị cho tất cả người chơi.</p>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button onClick={() => setShowEndConfirm(false)} style={{ flex: 1, padding: '0.75rem', borderRadius: '6px', background: 'transparent', border: '1px solid rgba(245,237,214,0.2)', color: MUTED, fontFamily: B, fontSize: '0.9rem', cursor: 'pointer' }}>
                  Huỷ
                </button>
                <button onClick={() => { setShowEndConfirm(false); post('end') }} style={{ flex: 1, padding: '0.75rem', borderRadius: '6px', background: 'rgba(139,26,26,0.5)', border: '1px solid rgba(139,26,26,0.6)', color: '#f5d0d0', fontFamily: B, fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer' }}>
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

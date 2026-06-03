'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useRoomPoll } from './useRoomPoll'
import { QUIZ_QUESTIONS } from '@/lib/quiz-data'
import { PowerUpType, POWER_UP_INFO } from '@/lib/room-types'
import PowerUpBar from './PowerUpBar'
import MiniLeaderboard from './MiniLeaderboard'
import FinalPodium from './FinalPodium'

const D = "'Cormorant Garamond', Georgia, serif"
const B = "'Lora', Georgia, serif"
const GOLD = '#C9A84C'
const PARCHMENT = '#F5EDD6'
const MUTED = 'rgba(245,237,214,0.55)'
const BG: React.CSSProperties = {
  minHeight: '100vh',
  backgroundImage: 'radial-gradient(ellipse at 50% 35%, #1e1508 0%, #0d0d0d 65%)',
  backgroundAttachment: 'fixed', backgroundSize: 'cover', backgroundColor: '#0D0D0D',
  color: PARCHMENT, fontFamily: B,
}

const TIMER_TOTAL = 15
const ANSWER_STYLES = [
  { bg: 'rgba(139,26,26,0.15)', border: 'rgba(139,26,26,0.45)', hover: 'rgba(139,26,26,0.3)', dot: '#c0504d', label: 'A' },
  { bg: 'rgba(40,80,160,0.15)', border: 'rgba(40,80,160,0.45)', hover: 'rgba(40,80,160,0.3)', dot: '#4a7cc7', label: 'B' },
  { bg: 'rgba(201,168,76,0.1)',  border: 'rgba(201,168,76,0.35)', hover: 'rgba(201,168,76,0.22)', dot: GOLD,   label: 'C' },
  { bg: 'rgba(40,120,80,0.15)', border: 'rgba(40,120,80,0.45)', hover: 'rgba(40,120,80,0.3)', dot: '#5a9e72', label: 'D' },
]

function categoryLabel(cat: string) {
  if (cat === 'phat-giao') return 'Phật giáo'
  if (cat === 'cong-giao') return 'Công giáo'
  if (cat === 'mac-lenin') return 'Mác-Lênin'
  return 'Pháp luật'
}

export default function PlayerView() {
  const params = useParams()
  const code = (params.code as string).toUpperCase()
  const { room, session, error } = useRoomPoll(code)
  const [selectedPowerUp, setSelectedPowerUp] = useState<PowerUpType | null>(null)
  const [myAnswer, setMyAnswer] = useState<number | null>(null)
  const [timeLeft, setTimeLeft] = useState(TIMER_TOTAL)
  const [eliminated, setEliminated] = useState<number[]>([])
  const [feedback, setFeedback] = useState<{ correct: boolean; earned: number; multiplier?: number } | null>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const lastQRef = useRef(-1)
  const submittingRef = useRef(false)

  useEffect(() => {
    if (!room || room.status !== 'playing') return
    if (room.currentQ === lastQRef.current) return
    lastQRef.current = room.currentQ
    setMyAnswer(null); setSelectedPowerUp(null); setEliminated([]); setFeedback(null)
    submittingRef.current = false
    const elapsed = room.questionStartedAt > 0 ? (Date.now() - room.questionStartedAt) / 1000 : 0
    const initial = Math.max(0, Math.ceil(TIMER_TOTAL - elapsed))
    setTimeLeft(initial)
    if (timerRef.current) clearInterval(timerRef.current)
    if (initial <= 0) return
    timerRef.current = setInterval(() => {
      setTimeLeft(t => { if (t <= 1) { clearInterval(timerRef.current!); return 0 } return t - 1 })
    }, 1000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [room?.currentQ, room?.status])

  useEffect(() => {
    if (timeLeft === 0 && myAnswer === null && room?.status === 'playing') submitAnswer(-1)
  }, [timeLeft])

  useEffect(() => {
    if (!room || !session || room.status !== 'post_question') return
    const ans = room.currentAnswers[session.playerId]
    if (ans) setFeedback({ correct: ans.isCorrect, earned: ans.scoreEarned, multiplier: ans.luckyMultiplier })
  }, [room?.status])

  async function activatePrecision(powerUp: PowerUpType | null) {
    setSelectedPowerUp(powerUp)
    if (powerUp === 'precision' && room) {
      const q = QUIZ_QUESTIONS[room.currentQ]
      const wrongs = [0, 1, 2, 3].filter(i => i !== q.correct)
      setEliminated(wrongs.sort(() => Math.random() - 0.5).slice(0, 2))
    } else { setEliminated([]) }
  }

  async function submitAnswer(answerIndex: number) {
    if (!session || submittingRef.current || myAnswer !== null) return
    submittingRef.current = true
    if (timerRef.current) clearInterval(timerRef.current)
    setMyAnswer(answerIndex)
    await fetch(`/api/room/${code}/answer`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ playerId: session.playerId, answerIndex, powerUpUsed: selectedPowerUp }),
    })
  }

  if (error) return <ErrorScreen msg={error} />
  if (!room || !session) return <LoadingScreen />

  const me = room.players[session.playerId]
  const q = QUIZ_QUESTIONS[room.currentQ]

  if (room.status === 'finished') return <FinalPodium entries={room.leaderboard} myPlayerId={session.playerId} isHost={false} />

  if (room.status === 'waiting') {
    const playerCount = Object.values(room.players).filter(p => p.id !== room.hostId).length
    return <WaitingRoom code={code} playerCount={playerCount} myName={session.name} hostName={room.hostName} />
  }

  if (room.status === 'post_question') {
    return (
      <div style={{ ...BG, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ width: '100%', maxWidth: '480px' }}>
          {feedback && (
            <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
              <h2 style={{ fontFamily: D, fontSize: '2.4rem', fontWeight: 700, color: feedback.correct ? GOLD : '#c87070', marginBottom: '0.75rem' }}>
                {feedback.correct ? 'Chính xác!' : 'Chưa đúng!'}
              </h2>
              {feedback.correct && feedback.earned > 0 && (
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: B, fontSize: '0.85rem', fontWeight: 600, color: GOLD, border: '1px solid rgba(201,168,76,0.35)', background: 'rgba(201,168,76,0.08)', padding: '0.25rem 0.85rem', borderRadius: '20px' }}>
                    +{feedback.earned} xu
                  </span>
                  {feedback.multiplier && feedback.multiplier !== 1 && (
                    <span style={{ fontFamily: B, fontSize: '0.85rem', fontWeight: 600, color: '#c8a0e8', border: '1px solid rgba(200,160,232,0.35)', background: 'rgba(200,160,232,0.08)', padding: '0.25rem 0.85rem', borderRadius: '20px' }}>
                      x{feedback.multiplier} may mắn
                    </span>
                  )}
                </div>
              )}
              {!feedback.correct && (
                <div style={{ marginTop: '0.75rem', background: 'rgba(40,120,80,0.12)', border: '1px solid rgba(40,120,80,0.4)', borderRadius: '6px', padding: '0.75rem 1rem' }}>
                  <span style={{ fontFamily: B, fontSize: '0.85rem', fontWeight: 600, color: '#7dc99a' }}>Đáp án đúng: </span>
                  <span style={{ fontFamily: B, fontSize: '0.85rem', color: PARCHMENT }}>{q.answers[q.correct]}</span>
                </div>
              )}
            </motion.div>
          )}
          <MiniLeaderboard entries={room.leaderboard} myPlayerId={session.playerId} questionIndex={room.currentQ} totalQ={room.totalQ} />
          <p style={{ textAlign: 'center', fontFamily: B, fontSize: '0.78rem', color: MUTED, marginTop: '1rem' }}>Chờ host tiếp tục câu tiếp theo...</p>
        </div>
      </div>
    )
  }

  const pct = (timeLeft / TIMER_TOTAL) * 100
  const timerColor = pct > 50 ? GOLD : pct > 25 ? '#e8a060' : '#c87070'
  const hasAnswered = myAnswer !== null

  return (
    <div style={{ ...BG, display: 'flex', flexDirection: 'column', padding: '1rem' }}>
      <div style={{ maxWidth: '680px', width: '100%', margin: '0 auto', paddingTop: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.3)', padding: '0.3rem 0.85rem', borderRadius: '20px' }}>
            <span style={{ fontFamily: D, fontSize: '0.75rem', color: GOLD, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Xu</span>
            <span style={{ fontFamily: D, fontSize: '1rem', fontWeight: 700, color: GOLD }}>{(me?.score ?? 0).toLocaleString()}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            {(me?.streak ?? 0) >= 2 && (
              <span style={{ fontFamily: B, fontSize: '0.78rem', fontWeight: 600, color: '#e8a060', border: '1px solid rgba(232,160,96,0.4)', background: 'rgba(232,160,96,0.1)', padding: '0.2rem 0.65rem', borderRadius: '20px' }}>
                Streak ×{me?.streak}
              </span>
            )}
            <span style={{ fontFamily: B, fontSize: '0.85rem', color: MUTED }}>{room.currentQ + 1}/{room.totalQ}</span>
          </div>
        </div>

        {/* Timer */}
        <div style={{ marginBottom: '0.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
            <span style={{ fontFamily: B, fontSize: '0.72rem', color: MUTED, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Thời gian</span>
            <span style={{ fontFamily: D, fontSize: '0.95rem', fontWeight: 700, color: timeLeft <= 5 ? '#c87070' : GOLD }}>{timeLeft}s</span>
          </div>
          <div style={{ height: '4px', background: 'rgba(201,168,76,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{ height: '100%', borderRadius: '2px', backgroundColor: timerColor, width: `${pct}%`, transition: 'width 1s linear' }} />
          </div>
        </div>

        {!hasAnswered && me && me.powerUps.length > 0 && (
          <div style={{ marginBottom: '0.5rem', textAlign: 'center' }}>
            <p style={{ fontFamily: B, fontSize: '0.75rem', color: MUTED, marginBottom: '0.5rem' }}>Chọn hỗ trợ:</p>
            <PowerUpBar powerUps={me.powerUps} selected={selectedPowerUp} onSelect={activatePrecision} />
          </div>
        )}
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: '680px', width: '100%', margin: '0 auto', paddingTop: '1rem', paddingBottom: '1rem' }}>
        <motion.div key={room.currentQ} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ marginBottom: '0.75rem' }}>
            <span style={{ fontFamily: B, fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: GOLD, border: '1px solid rgba(201,168,76,0.28)', background: 'rgba(201,168,76,0.06)', padding: '0.2rem 0.75rem', borderRadius: '20px' }}>
              {categoryLabel(q.category)}
            </span>
          </div>

          <div style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.22)', borderRadius: '8px', padding: '1.25rem 1.5rem', marginBottom: '1rem' }}>
            <p style={{ fontFamily: D, fontSize: '1.25rem', fontWeight: 600, color: PARCHMENT, lineHeight: 1.5 }}>{q.question}</p>
            {selectedPowerUp && (
              <p style={{ marginTop: '0.6rem', fontFamily: B, fontSize: '0.78rem', color: GOLD }}>
                {POWER_UP_INFO[selectedPowerUp].name} đang kích hoạt
              </p>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.6rem' }}>
            {q.answers.map((ans, i) => {
              const isElim = eliminated.includes(i)
              const isSelected = myAnswer === i
              const showResult = hasAnswered && room.status === 'playing'
              let bg = ANSWER_STYLES[i].bg
              let border = ANSWER_STYLES[i].border
              if (isElim && !hasAnswered) { bg = 'rgba(201,168,76,0.03)'; border = 'rgba(201,168,76,0.08)' }
              else if (showResult && i === q.correct) { bg = 'rgba(40,120,80,0.3)'; border = 'rgba(40,120,80,0.6)' }
              else if (showResult && isSelected && i !== q.correct) { bg = 'rgba(139,26,26,0.35)'; border = 'rgba(139,26,26,0.6)' }
              return (
                <motion.button
                  key={i}
                  whileHover={hasAnswered || isElim ? {} : { scale: 1.02 }}
                  whileTap={hasAnswered || isElim ? {} : { scale: 0.97 }}
                  onClick={() => !hasAnswered && !isElim && submitAnswer(i)}
                  disabled={hasAnswered || isElim}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.85rem 1rem',
                    borderRadius: '8px', textAlign: 'left', cursor: hasAnswered || isElim ? 'default' : 'pointer',
                    background: bg, border: `1px solid ${border}`, opacity: isElim ? 0.3 : 1,
                    transition: 'background 0.2s',
                  }}
                >
                  <div style={{ width: '26px', height: '26px', borderRadius: '50%', flexShrink: 0, background: ANSWER_STYLES[i].dot, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: D, fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>
                    {ANSWER_STYLES[i].label}
                  </div>
                  <span style={{ fontFamily: B, fontSize: '0.92rem', color: PARCHMENT, lineHeight: 1.45 }}>{ans}</span>
                </motion.button>
              )
            })}
          </div>

          {hasAnswered && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', fontFamily: B, fontSize: '0.78rem', color: MUTED, marginTop: '1rem' }}>
              {myAnswer === -1 ? 'Hết giờ — chờ host tiếp tục...' : 'Đã trả lời — chờ kết quả...'}
            </motion.p>
          )}
        </motion.div>
      </div>
    </div>
  )
}

function WaitingRoom({ code, playerCount, myName, hostName }: { code: string; playerCount: number; myName: string; hostName: string }) {
  return (
    <div style={{ ...BG, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ textAlign: 'center', maxWidth: '360px' }}>
        <div style={{ width: '44px', height: '2px', background: GOLD, margin: '0 auto 1.5rem', opacity: 0.55 }} />
        <h2 style={{ fontFamily: D, fontSize: '2rem', fontWeight: 700, color: PARCHMENT, marginBottom: '0.5rem' }}>Đang chờ bắt đầu</h2>
        <p style={{ fontFamily: B, fontSize: '0.9rem', color: MUTED, marginBottom: '2rem' }}>
          Chào <span style={{ color: GOLD, fontWeight: 600 }}>{myName}</span>! Host <span style={{ color: GOLD, fontWeight: 600 }}>{hostName}</span> sẽ bắt đầu sớm.
        </p>
        <div style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.22)', borderRadius: '8px', padding: '1.5rem' }}>
          <p style={{ fontFamily: B, fontSize: '0.72rem', color: MUTED, textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: '0.5rem' }}>Mã phòng</p>
          <div style={{ fontFamily: D, fontSize: '3rem', fontWeight: 700, color: GOLD, letterSpacing: '0.35em', marginBottom: '1rem' }}>{code}</div>
          <div style={{ fontFamily: B, fontSize: '0.88rem', color: MUTED }}>
            <span style={{ color: PARCHMENT, fontWeight: 600 }}>{playerCount}</span> người trong phòng
          </div>
        </div>
      </div>
    </div>
  )
}

function LoadingScreen() {
  return (
    <div style={{ ...BG, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ fontFamily: B, fontSize: '0.9rem', color: MUTED }}>Đang kết nối...</p>
    </div>
  )
}

function ErrorScreen({ msg }: { msg: string }) {
  return (
    <div style={{ ...BG, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ textAlign: 'center', maxWidth: '360px' }}>
        <h2 style={{ fontFamily: D, fontSize: '1.8rem', fontWeight: 700, color: '#c87070', marginBottom: '0.75rem' }}>Lỗi kết nối</h2>
        <p style={{ fontFamily: B, fontSize: '0.9rem', color: MUTED, marginBottom: '1.5rem' }}>{msg}</p>
        <a href="/room" style={{ fontFamily: B, fontSize: '0.88rem', color: GOLD }}>Quay lại</a>
      </div>
    </div>
  )
}

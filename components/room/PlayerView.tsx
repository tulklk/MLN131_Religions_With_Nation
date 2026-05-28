'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRoomPoll } from './useRoomPoll'
import { QUIZ_QUESTIONS } from '@/lib/quiz-data'
import { PowerUpType, POWER_UP_INFO } from '@/lib/room-types'
import PowerUpBar from './PowerUpBar'
import MiniLeaderboard from './MiniLeaderboard'
import FinalPodium from './FinalPodium'

const TIMER_TOTAL = 15
const ANSWER_COLORS = [
  { bg: 'bg-red-900/40 hover:bg-red-800/60 border-red-700/50 active:bg-red-700/70', correct: 'bg-green-800/60 border-green-500/70', wrong: 'bg-red-800/60 border-red-500/70', label: 'A', dot: 'bg-red-500' },
  { bg: 'bg-blue-900/40 hover:bg-blue-800/60 border-blue-700/50 active:bg-blue-700/70', correct: 'bg-green-800/60 border-green-500/70', wrong: 'bg-red-800/60 border-red-500/70', label: 'B', dot: 'bg-blue-500' },
  { bg: 'bg-amber-900/40 hover:bg-amber-800/60 border-amber-700/50 active:bg-amber-700/70', correct: 'bg-green-800/60 border-green-500/70', wrong: 'bg-red-800/60 border-red-500/70', label: 'C', dot: 'bg-amber-500' },
  { bg: 'bg-green-900/40 hover:bg-green-800/60 border-green-700/50 active:bg-green-700/70', correct: 'bg-green-800/60 border-green-500/70', wrong: 'bg-red-800/60 border-red-500/70', label: 'D', dot: 'bg-green-500' },
]

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

  // Reset per question — uses server timestamp so late joiners get accurate remaining time
  useEffect(() => {
    if (!room || room.status !== 'playing') return
    if (room.currentQ === lastQRef.current) return
    lastQRef.current = room.currentQ
    setMyAnswer(null)
    setSelectedPowerUp(null)
    setEliminated([])
    setFeedback(null)
    submittingRef.current = false

    const elapsed = room.questionStartedAt > 0 ? (Date.now() - room.questionStartedAt) / 1000 : 0
    const initial = Math.max(0, Math.ceil(TIMER_TOTAL - elapsed))
    setTimeLeft(initial)

    if (timerRef.current) clearInterval(timerRef.current)
    if (initial <= 0) return

    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current!); return 0 }
        return t - 1
      })
    }, 1000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [room?.currentQ, room?.status])

  // Auto-submit timeout
  useEffect(() => {
    if (timeLeft === 0 && myAnswer === null && room?.status === 'playing') {
      submitAnswer(-1)
    }
  }, [timeLeft])

  async function activatePrecision(powerUp: PowerUpType | null) {
    setSelectedPowerUp(powerUp)
    if (powerUp === 'precision' && room) {
      const q = QUIZ_QUESTIONS[room.currentQ]
      const wrongs = [0, 1, 2, 3].filter(i => i !== q.correct)
      const toElim = wrongs.sort(() => Math.random() - 0.5).slice(0, 2)
      setEliminated(toElim)
    } else {
      setEliminated([])
    }
  }

  async function submitAnswer(answerIndex: number) {
    if (!session || submittingRef.current || myAnswer !== null) return
    submittingRef.current = true
    if (timerRef.current) clearInterval(timerRef.current)
    setMyAnswer(answerIndex)

    await fetch(`/api/room/${code}/answer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ playerId: session.playerId, answerIndex, powerUpUsed: selectedPowerUp }),
    })
  }

  // Set feedback when room transitions to post_question
  useEffect(() => {
    if (!room || !session || room.status !== 'post_question') return
    const ans = room.currentAnswers[session.playerId]
    if (ans) setFeedback({ correct: ans.isCorrect, earned: ans.scoreEarned, multiplier: ans.luckyMultiplier })
  }, [room?.status])

  if (error) return <ErrorScreen msg={error} />
  if (!room || !session) return <LoadingScreen />

  const me = room.players[session.playerId]
  const q = QUIZ_QUESTIONS[room.currentQ]

  if (room.status === 'finished') {
    return <FinalPodium entries={room.leaderboard} myPlayerId={session.playerId} isHost={false} />
  }

  if (room.status === 'waiting') {
    const playerCount = Object.values(room.players).filter(p => p.id !== room.hostId).length
    return (
      <WaitingRoom
        code={code}
        playerCount={playerCount}
        myName={session.name}
        hostName={room.hostName}
      />
    )
  }

  if (room.status === 'post_question') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4" style={{ background: '#0f0e17' }}>
        <div className="w-full max-w-md">
          {feedback && (
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center mb-6">
              <div className="text-6xl mb-2">{feedback.correct ? '✅' : '❌'}</div>
              <div className="font-display text-2xl font-bold text-white mb-1">
                {feedback.correct ? 'Chính xác!' : 'Chưa đúng!'}
              </div>
              {feedback.correct && feedback.earned > 0 && (
                <div className="flex items-center justify-center gap-2 mt-2">
                  <span className="bg-gold-500/20 border border-gold-500/40 text-gold-400 font-mono font-bold px-3 py-1 rounded-full text-sm">
                    🪙 +{feedback.earned}
                  </span>
                  {feedback.multiplier && feedback.multiplier !== 1 && (
                    <span className="bg-purple-500/20 border border-purple-500/40 text-purple-400 font-mono font-bold px-3 py-1 rounded-full text-sm">
                      🎲 ×{feedback.multiplier}
                    </span>
                  )}
                </div>
              )}
              {/* Correct answer */}
              {!feedback.correct && (
                <div className="mt-3 bg-green-900/30 border border-green-500/40 rounded-xl p-3 text-sm">
                  <span className="text-green-400 font-viet font-semibold">Đáp án đúng: </span>
                  <span className="text-white font-viet">{q.answers[q.correct]}</span>
                </div>
              )}
            </motion.div>
          )}
          <MiniLeaderboard entries={room.leaderboard} myPlayerId={session.playerId} questionIndex={room.currentQ} totalQ={room.totalQ} />
          <p className="text-center text-ghost/50 font-viet text-xs mt-4">Chờ host tiếp tục câu tiếp theo...</p>
        </div>
      </div>
    )
  }

  // playing
  const pct = (timeLeft / TIMER_TOTAL) * 100
  const timerColor = pct > 50 ? '#4cc9f0' : pct > 25 ? '#f4a261' : '#e63946'
  const hasAnswered = myAnswer !== null

  return (
    <div className="min-h-screen flex flex-col p-4" style={{ background: '#0f0e17' }}>
      {/* Top bar */}
      <div className="max-w-2xl w-full mx-auto pt-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5 bg-surface/80 border border-gold-500/30 px-3 py-1.5 rounded-full">
            <span>🪙</span>
            <span className="font-mono font-bold text-gold-400 text-sm">{(me?.score ?? 0).toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2">
            {(me?.streak ?? 0) >= 2 && (
              <span className="bg-orange-500/20 border border-orange-500/40 text-orange-400 text-xs font-mono font-bold px-2 py-1 rounded-full">
                🔥 ×{me?.streak}
              </span>
            )}
            <span className="text-ghost text-sm font-mono">{room.currentQ + 1}<span className="text-muted">/{room.totalQ}</span></span>
          </div>
        </div>

        {/* Timer */}
        <div className="mb-4">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-ghost/60 font-mono">Thời gian</span>
            <span className={`font-mono font-bold tabular-nums ${timeLeft <= 5 ? 'text-red-400 animate-pulse' : 'text-white'}`}>{timeLeft}s</span>
          </div>
          <div className="h-2 bg-surface-2 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-1000 linear" style={{ width: `${pct}%`, backgroundColor: timerColor }} />
          </div>
        </div>

        {/* Power-ups */}
        {!hasAnswered && me && me.powerUps.length > 0 && (
          <div className="mb-3">
            <p className="text-xs text-ghost/50 font-viet mb-1.5 text-center">Chọn item hỗ trợ:</p>
            <PowerUpBar powerUps={me.powerUps} selected={selectedPowerUp} onSelect={activatePrecision} />
          </div>
        )}
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col justify-center max-w-2xl w-full mx-auto py-4">
        <motion.div key={room.currentQ} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-3">
            <span className="text-xs font-mono text-muted uppercase tracking-widest">
              {q.category === 'phat-giao' ? '🪷 Phật giáo' : q.category === 'cong-giao' ? '✝️ Công giáo' : q.category === 'mac-lenin' ? '📖 Mác-Lênin' : '⚖️ Pháp luật'}
              {' · '}
              {q.difficulty === 'easy' ? '⭐' : q.difficulty === 'medium' ? '⭐⭐' : '⭐⭐⭐'}
            </span>
          </div>

          <div className="bg-surface/50 border border-white/10 rounded-2xl p-5 mb-5">
            <p className="text-white font-viet text-lg font-semibold leading-relaxed">{q.question}</p>
            {selectedPowerUp && (
              <div className={`mt-3 text-xs font-viet px-2 py-1 rounded-lg inline-block ${POWER_UP_INFO[selectedPowerUp].color}`}>
                {POWER_UP_INFO[selectedPowerUp].icon} {POWER_UP_INFO[selectedPowerUp].name} đang kích hoạt
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {q.answers.map((ans, i) => {
              const isEliminated = eliminated.includes(i)
              const isSelected = myAnswer === i
              const showResult = hasAnswered && room.status === 'playing'
              let bgClass = ANSWER_COLORS[i].bg

              if (isEliminated && !hasAnswered) bgClass = 'bg-surface/20 border-white/5 opacity-30'
              else if (showResult && i === q.correct) bgClass = ANSWER_COLORS[i].correct
              else if (showResult && isSelected && i !== q.correct) bgClass = ANSWER_COLORS[i].wrong

              return (
                <motion.button
                  key={i}
                  whileHover={hasAnswered || isEliminated ? {} : { scale: 1.02 }}
                  whileTap={hasAnswered || isEliminated ? {} : { scale: 0.97 }}
                  onClick={() => !hasAnswered && !isEliminated && submitAnswer(i)}
                  disabled={hasAnswered || isEliminated}
                  className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all duration-200 ${bgClass} ${
                    hasAnswered || isEliminated ? 'cursor-default' : 'cursor-pointer'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-black text-white flex-shrink-0 ${ANSWER_COLORS[i].dot}`}>
                    {ANSWER_COLORS[i].label}
                  </div>
                  <span className="text-white font-viet text-sm leading-snug">{ans}</span>
                </motion.button>
              )
            })}
          </div>

          {hasAnswered && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-ghost/50 font-viet text-xs mt-4">
              {myAnswer === -1 ? '⏰ Hết giờ — chờ host tiếp tục...' : '✓ Đã trả lời — chờ kết quả...'}
            </motion.p>
          )}
        </motion.div>
      </div>
    </div>
  )
}

function WaitingRoom({ code, playerCount, myName, hostName }: { code: string; playerCount: number; myName: string; hostName: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: '#0f0e17' }}>
      <div className="text-center max-w-sm">
        <div className="text-5xl mb-4">⏳</div>
        <h2 className="font-display text-2xl font-bold text-white mb-2">Đang chờ bắt đầu</h2>
        <p className="text-ghost font-viet text-sm mb-6">Chào <span className="text-gold-400 font-semibold">{myName}</span>! Host <span className="text-blue-400 font-semibold">{hostName}</span> sẽ bắt đầu sớm.</p>
        <div className="bg-surface/50 border border-white/10 rounded-2xl p-6">
          <p className="text-ghost/60 font-viet text-xs uppercase tracking-widest mb-2">Mã phòng</p>
          <div className="font-mono text-4xl font-black text-gold-400 tracking-[0.3em] mb-4">{code}</div>
          <div className="text-ghost font-viet text-sm">
            <span className="text-white font-semibold">{playerCount}</span> người chơi trong phòng
          </div>
        </div>
      </div>
    </div>
  )
}

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#0f0e17' }}>
      <div className="text-center">
        <div className="text-4xl mb-3 animate-spin">⏳</div>
        <p className="text-ghost font-viet text-sm">Đang kết nối...</p>
      </div>
    </div>
  )
}

function ErrorScreen({ msg }: { msg: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: '#0f0e17' }}>
      <div className="text-center max-w-sm">
        <div className="text-5xl mb-3">❌</div>
        <h2 className="font-display text-xl font-bold text-white mb-2">Lỗi kết nối</h2>
        <p className="text-ghost font-viet text-sm mb-6">{msg}</p>
        <a href="/room" className="text-gold-400 font-viet underline">← Quay lại</a>
      </div>
    </div>
  )
}

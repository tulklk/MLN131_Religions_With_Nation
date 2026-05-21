import { create } from 'zustand'
import { QuizQuestion, QUIZ_QUESTIONS } from '../quiz-data'

interface QuizState {
  screen: 'lobby' | 'game' | 'feedback' | 'results'
  questions: QuizQuestion[]
  currentIndex: number
  coins: number
  streak: number
  maxStreak: number
  correctCount: number
  wrongCount: number
  lastAnswerCorrect: boolean | null
  lastCoinsEarned: number
  timeLeft: number

  startGame: () => void
  answer: (index: number) => void
  nextQuestion: () => void
  timeOut: () => void
  restartGame: () => void
  setTimeLeft: (t: number) => void
}

export const useQuizStore = create<QuizState>((set, get) => ({
  screen: 'lobby',
  questions: QUIZ_QUESTIONS,
  currentIndex: 0,
  coins: 0,
  streak: 0,
  maxStreak: 0,
  correctCount: 0,
  wrongCount: 0,
  lastAnswerCorrect: null,
  lastCoinsEarned: 0,
  timeLeft: 15,

  startGame: () =>
    set({
      screen: 'game',
      currentIndex: 0,
      coins: 0,
      streak: 0,
      maxStreak: 0,
      correctCount: 0,
      wrongCount: 0,
      lastAnswerCorrect: null,
      timeLeft: 15,
    }),

  answer: (selectedIndex) => {
    const { questions, currentIndex, coins, streak, maxStreak, correctCount, wrongCount, timeLeft } = get()
    const q = questions[currentIndex]
    const isCorrect = selectedIndex === q.correct

    if (isCorrect) {
      const newStreak = streak + 1
      const bonus = newStreak >= 3 ? newStreak * 50 : 0
      const base = Math.round(100 + (timeLeft / 15) * 100)
      const earned = base + bonus
      set({
        screen: 'feedback',
        coins: coins + earned,
        streak: newStreak,
        maxStreak: Math.max(maxStreak, newStreak),
        correctCount: correctCount + 1,
        lastAnswerCorrect: true,
        lastCoinsEarned: earned,
      })
    } else {
      set({
        screen: 'feedback',
        streak: 0,
        wrongCount: wrongCount + 1,
        lastAnswerCorrect: false,
        lastCoinsEarned: 0,
      })
    }
  },

  nextQuestion: () => {
    const { currentIndex, questions } = get()
    if (currentIndex + 1 >= questions.length) {
      set({ screen: 'results' })
    } else {
      set({ screen: 'game', currentIndex: currentIndex + 1, timeLeft: 15 })
    }
  },

  timeOut: () => {
    const { wrongCount } = get()
    set({
      screen: 'feedback',
      wrongCount: wrongCount + 1,
      streak: 0,
      lastAnswerCorrect: false,
      lastCoinsEarned: 0,
    })
  },

  restartGame: () => get().startGame(),
  setTimeLeft: (t) => set({ timeLeft: t }),
}))

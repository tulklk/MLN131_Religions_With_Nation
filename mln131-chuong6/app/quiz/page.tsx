'use client'

import { useQuizStore } from '@/lib/store/quiz-store'
import QuizLobby from '@/components/quiz/QuizLobby'
import QuizQuestion from '@/components/quiz/QuizQuestion'
import QuizFeedback from '@/components/quiz/QuizFeedback'
import QuizResults from '@/components/quiz/QuizResults'

export default function QuizPage() {
  const screen = useQuizStore((s) => s.screen)

  if (screen === 'lobby') return <QuizLobby />
  if (screen === 'game') return <QuizQuestion />
  if (screen === 'feedback') return <QuizFeedback />
  return <QuizResults />
}

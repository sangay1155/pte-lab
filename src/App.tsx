import React, { useEffect, useState } from 'react'
import './App.css'
import { ExamLayout } from './components/ExamLayout'
import { SpeakingQuestion } from './components/SpeakingQuestion'
import ReadingQuestion from './components/ReadingQuestion'
import ListeningQuestion from './components/ListeningQuestion'
import { LandingPage } from './components/LandingPage'
import { mockQuestions } from './types/pte'
import type { PTEQuestion } from './types/pte'
import { loadAnswers, saveAnswers } from './utils/answers'

function App() {
  const [showLanding, setShowLanding] = useState(true)
  const [questions] = useState<PTEQuestion[]>(mockQuestions)
  const [current, setCurrent] = useState(0)
  const [isPractice, setIsPractice] = useState(true)
  const [answers, setAnswers] = useState<Record<string, string>>({})

  useEffect(() => setAnswers(loadAnswers()), [])
  useEffect(() => saveAnswers(answers), [answers])

  function onNext() {
    setCurrent((c) => Math.min(questions.length - 1, c + 1))
  }
  function onPrev() {
    setCurrent((c) => Math.max(0, c - 1))
  }
  function onSelectQuestion(i: number) {
    setCurrent(i)
  }

  const onAnswer = (id: string, value: string) => setAnswers((a) => ({ ...a, [id]: value }))

  const q = questions[current]

  if (showLanding) {
    return <LandingPage onStartPractice={() => setShowLanding(false)} />
  }

  return (
    <ExamLayout
      currentQuestion={q}
      currentIndex={current}
      totalQuestions={questions.length}
      onNext={onNext}
      onPrev={onPrev}
      isPracticeMode={isPractice}
      setIsPracticeMode={setIsPractice}
      onSelectQuestion={onSelectQuestion}
      questions={questions}
    >
      {q.section === 'speaking-writing' && (
        <SpeakingQuestion question={q} isPracticeMode={isPractice} onAnswer={onAnswer} />
      )}
      {q.section === 'reading' && (
        <ReadingQuestion question={q} practiceMode={isPractice} onNext={onNext} onAnswer={onAnswer} />
      )}
      {q.section === 'listening' && (
        <ListeningQuestion question={q} practiceMode={isPractice} onNext={onNext} onAnswer={onAnswer} />
      )}
    </ExamLayout>
  )
}

export default App

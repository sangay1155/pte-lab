import React, { useEffect, useState } from 'react'
import './App.css'
import { Dashboard } from './components/Dashboard'
import { ModernExam } from './components/ModernExam'
import { mockQuestions } from './types/pte'
import type { PTEQuestion } from './types/pte'
import { loadAnswers, saveAnswers } from './utils/answers'

type AppMode = 'dashboard' | 'practice' | 'exam'

function App() {
  const [mode, setMode] = useState<AppMode>('dashboard')
  const [questions] = useState<PTEQuestion[]>(mockQuestions)
  const [answers, setAnswers] = useState<Record<string, string>>({})

  useEffect(() => setAnswers(loadAnswers()), [])
  useEffect(() => saveAnswers(answers), [answers])

  useEffect(() => setAnswers(loadAnswers()), [])
  useEffect(() => saveAnswers(answers), [answers])

  if (mode === 'dashboard') {
    return (
      <Dashboard
        onStartPractice={() => setMode('practice')}
        onStartExam={() => setMode('exam')}
      />
    )
  }

  if (mode === 'practice' || mode === 'exam') {
    return (
      <ModernExam
        questions={questions}
        onBack={() => setMode('dashboard')}
      />
    )
  }

  return null
}

export default App

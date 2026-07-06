import React, { useMemo, useState, useEffect } from 'react'
import { PTEQuestion, mockQuestions } from '../types/pte'
import { loadAnswers, saveAnswers, scoreAnswers, AnswerMap } from '../utils/answers'
import SpeakingQuestion from './SpeakingQuestion'
import ReadingQuestion from './ReadingQuestion'
import ListeningQuestion from './ListeningQuestion'

function Timer({ seconds }: { seconds: number | null }) {
  const m = seconds ? Math.floor(seconds / 60) : 0
  const s = seconds ? seconds % 60 : 0
  const danger = (seconds ?? 0) <= 30
  return (
    <div className={`px-3 py-1 rounded-md ${danger ? 'text-red-600' : 'text-sky-800'}`}>
      <strong style={{ fontSize: 18 }}>
        {String(m).padStart(2, '0')}:{String(s).padStart(2, '0')}
      </strong>
    </div>
  )
}

export default function ExamLayout() {
  const questions = useMemo<PTEQuestion[]>(() => mockQuestions, [])
  const [index, setIndex] = useState(0)
  const [practice, setPractice] = useState(true)
  const [answers, setAnswers] = useState<AnswerMap>({})

  useEffect(() => {
    setAnswers(loadAnswers())
  }, [])

  useEffect(() => {
    saveAnswers(answers)
  }, [answers])

  const q = questions[index]

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <header className="flex items-center justify-between p-4 border-b">
        <div>
          <h2 className="text-lg font-semibold">{q.section.toUpperCase()}</h2>
          <div className="text-sm text-gray-500">Question {index + 1} of {questions.length}</div>
        </div>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={practice} onChange={(e) => setPractice(e.target.checked)} />
            <span className="text-sm">Practice Mode</span>
          </label>
          <Timer seconds={q.timeLimitSeconds ?? null} />
          <button className="bg-sky-600 text-white px-4 py-2 rounded" onClick={() => setIndex((i) => Math.min(questions.length - 1, i + 1))}>Next</button>
        </div>
      </header>

      <main className="p-6 md:flex md:gap-6">
        <aside className="w-60 hidden md:block border-r pr-4">
          <h4 className="font-semibold mb-2">Questions</h4>
          <ul className="grid gap-2">
            {questions.map((qq, i) => (
              <li key={qq.id}>
                <button className={`w-full text-left p-2 rounded ${i === index ? 'bg-sky-100' : 'hover:bg-gray-50'}`} onClick={() => setIndex(i)}>
                  {i + 1}. {qq.type}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <section className="flex-1">
          {q.section === 'speaking-writing' && (
            <SpeakingQuestion question={q} practiceMode={practice} onNext={() => setIndex((i) => Math.min(questions.length - 1, i + 1))} onAnswer={(id, value) => setAnswers((a) => ({ ...a, [id]: value }))} />
          )}
          {q.section === 'reading' && (
            <ReadingQuestion question={q} practiceMode={practice} onNext={() => setIndex((i) => Math.min(questions.length - 1, i + 1))} onAnswer={(id, value) => setAnswers((a) => ({ ...a, [id]: value }))} />
          )}
          {q.section === 'listening' && (
            <ListeningQuestion question={q} practiceMode={practice} onNext={() => setIndex((i) => Math.min(questions.length - 1, i + 1))} onAnswer={(id, value) => setAnswers((a) => ({ ...a, [id]: value }))} />
          )}
        </section>
      </main>

      {practice && (
        <div className="p-4 border-t">
          <h4 className="font-semibold mb-2">Check Answers (Practice)</h4>
          <div className="grid gap-2 md:grid-cols-3">
            {questions.map((qq) => (
              <div key={qq.id} className="p-2 border rounded">
                <div className="text-sm font-medium">{qq.type}</div>
                <div className="text-xs text-gray-600">Your answer: {answers[qq.id] ?? '—'}</div>
                <div className="text-xs text-gray-500">Model: {qq.modelAnswer ?? '—'}</div>
              </div>
            ))}
          </div>
          <div className="mt-3">
            <strong>Score:</strong> {scoreAnswers(questions, answers).correct} / {scoreAnswers(questions, answers).total}
          </div>
        </div>
      )}
    </div>
  )
}

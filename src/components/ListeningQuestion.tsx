import React, { useEffect, useRef, useState } from 'react'
import type { PTEQuestion } from '../types/pte'

export default function ListeningQuestion({ question, practiceMode, onNext, onAnswer }: { question: PTEQuestion; practiceMode: boolean; onNext: () => void; onAnswer: (id: string, value: string) => void }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [played, setPlayed] = useState(false)
  const [inputs, setInputs] = useState<string[]>((question.blankOptions || []).map(() => ''))
  const [dictation, setDictation] = useState('')

  useEffect(() => {
    if (audioRef.current && !played) {
      audioRef.current.play().catch(() => {})
    }
  }, [])

  function onPlayStart() {
    setPlayed(true)
    // disable controls after play begins
    if (audioRef.current) {
      audioRef.current.controls = false
    }
  }

  return (
    <div className="p-6 border rounded-md shadow-sm">
      <h3 className="text-xl font-semibold mb-2">Listening: {question.type}</h3>
      <div className="mb-4">{question.promptText}</div>

      <div className="mb-4">
        <audio ref={audioRef} src={question.audioUrl} onPlay={onPlayStart} />
      </div>

      {question.type === 'listening-fill-blanks' && (
        <div className="space-y-2">
          {(question.blankOptions || []).map((_, i) => (
            <input key={i} className="w-full p-2 border rounded" placeholder={`Blank ${i + 1}`} value={inputs[i] ?? ''} onChange={(e) => { setInputs((s) => { const c = [...s]; c[i] = e.target.value; onAnswer(question.id, c.join('|')); return c }) }} />
          ))}
        </div>
      )}

      {question.type === 'write-dictation' && (
        <div>
          <textarea className="w-full p-3 border rounded" rows={6} value={dictation} onChange={(e) => { setDictation(e.target.value); onAnswer(question.id, e.target.value) }} />
          <div className="text-sm text-gray-600 mt-2">Words: {dictation.trim().split(/\s+/).filter(Boolean).length} — Chars: {dictation.length}</div>
        </div>
      )}

      <div className="mt-4 flex justify-end">
        {practiceMode && <div className="mr-auto text-sm text-gray-600">Model answer: {question.modelAnswer}</div>}
        <button className="px-4 py-2 bg-sky-600 text-white rounded" onClick={onNext}>Next</button>
      </div>
    </div>
  )
}

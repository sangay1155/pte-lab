import React, { useState } from 'react'
import type { PTEQuestion } from '../types/pte'

export default function ReadingQuestion({ question, practiceMode, onNext, onAnswer }: { question: PTEQuestion; practiceMode: boolean; onNext: () => void; onAnswer: (id: string, value: string) => void }) {
  const [order, setOrder] = useState<string[]>(question.scrambledTexts ?? [])
  const [selected, setSelected] = useState<string | null>(null)

  // persist current answer whenever it changes
  React.useEffect(() => {
    if (question.type === 'reorder-paragraphs') {
      onAnswer(question.id, order.join('||'))
    }
  }, [order])

  function onDragStart(e: React.DragEvent, text: string) {
    e.dataTransfer.setData('text/plain', text)
  }

  function onDrop(e: React.DragEvent) {
    const t = e.dataTransfer.getData('text/plain')
    setOrder((o) => o.filter((x) => x !== t))
  }

  return (
    <div className="p-6 border rounded-md shadow-sm">
      <h3 className="text-xl font-semibold mb-2">Reading: {question.type}</h3>

      {question.type === 'reorder-paragraphs' && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium mb-2">Scrambled</h4>
            <div className="space-y-2">
              {(question.scrambledTexts ?? []).map((t) => (
                <div key={t} draggable onDragStart={(e) => onDragStart(e, t)} className="p-2 border rounded bg-white">{t}</div>
              ))}
            </div>
          </div>
          <div onDragOver={(e) => e.preventDefault()} onDrop={onDrop} className="p-2 border rounded min-h-[200px] bg-gray-50">
            <h4 className="font-medium">Arrange here</h4>
            <div className="mt-2 space-y-2">
              {order.map((t) => (
                <div key={t} className="p-2 border rounded bg-white">{t}</div>
              ))}
            </div>
          </div>
        </div>
      )}

      {question.type === 'reading-multiple-choice-single' && (
        <div className="flex gap-4">
          <div className="flex-1">{question.promptText}</div>
          <div className="w-64">
            {(question.options ?? []).map((opt) => (
              <label key={opt} className="block p-2 border rounded mb-2">
                <input type="radio" name="mc" value={opt} checked={selected === opt} onChange={() => { setSelected(opt); onAnswer(question.id, opt) }} /> {opt}
              </label>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 flex justify-end">
        {practiceMode && <div className="mr-auto text-sm text-gray-600">Model answer: {question.modelAnswer}</div>}
        <button className="px-4 py-2 bg-sky-600 text-white rounded" onClick={onNext}>Next</button>
      </div>
    </div>
  )
}

import React, { useEffect, useRef } from 'react'
import usePTEAudioRecorder from '../hooks/usePTEAudioRecorder'
import type { PTEQuestion } from '../types/pte'

export default function SpeakingQuestion({
  question,
  practiceMode,
  onNext,
  onAnswer
}: {
  question: PTEQuestion
  practiceMode: boolean
  onNext: () => void
  onAnswer: (id: string, value: string) => void
}) {
  const { state, preSeconds, timeLeft, audioBlob, prepareRecording, stopRecording, startRecording } = usePTEAudioRecorder()
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    // small side-effect to prepare automatically if read-aloud
    if (question.type === 'read-aloud') {
      prepareRecording(3, question.timeLimitSeconds ?? 40)
    }
  }, [question])

  return (
    <div className="p-6 border rounded-md shadow-sm">
      <h3 className="text-xl font-semibold mb-2">Speaking: {question.type}</h3>
      {question.type === 'describe-image' && question.imageUrl && (
        <div className="mb-4 flex gap-4">
          <img src={question.imageUrl} alt="describe" className="w-48 h-32 object-cover border" />
        </div>
      )}

      <div className="mb-4">
        <div className="p-3 bg-gray-50 rounded">{question.promptText}</div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1">
          <div className="mb-2">Status: <strong>{state}</strong></div>
          {state === 'preparing' && <div>Recording begins in {preSeconds}...</div>}
          {state === 'recording' && <div>Time left: {timeLeft}s</div>}
          <canvas ref={canvasRef} className="w-full h-16 bg-black/5 rounded" />
        </div>

        <div className="flex flex-col gap-2">
          <button className="px-3 py-2 bg-orange-500 text-white rounded" onClick={() => prepareRecording(3, question.timeLimitSeconds ?? 40)}>Prepare</button>
          <button className="px-3 py-2 bg-sky-600 text-white rounded" onClick={() => startRecording(question.timeLimitSeconds ?? 40)}>Start</button>
          <button className="px-3 py-2 bg-gray-200 rounded" onClick={() => stopRecording()}>Stop</button>
        </div>
      </div>

      {practiceMode && audioBlob && (
        <div className="mt-4">
          <h4 className="font-medium">Practice Playback</h4>
          <audio controls src={URL.createObjectURL(audioBlob)} />
          <div className="mt-2 text-sm text-gray-600">Model answer: {question.modelAnswer}</div>
        </div>
      )}

      {/* emit answer when recording completes */}
      {state === 'completed' && (
        <div style={{ display: 'none' }}>{onAnswer(question.id, audioBlob ? 'recording_saved' : '')}</div>
      )}

      <div className="mt-4 flex justify-end">
        <button className="px-4 py-2 bg-sky-600 text-white rounded" onClick={onNext}>Next</button>
      </div>
    </div>
  )
}

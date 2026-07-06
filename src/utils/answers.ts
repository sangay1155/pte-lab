import type { PTEQuestion } from '../types/pte'

const STORAGE_KEY = 'pte_answers_v1'

export type AnswerMap = Record<string, string>

export function loadAnswers(): AnswerMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function saveAnswers(map: AnswerMap) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map))
  } catch {}
}

export function scoreAnswers(questions: PTEQuestion[], answers: AnswerMap) {
  let correct = 0
  for (const q of questions) {
    const ans = (answers[q.id] || '').trim().toLowerCase()
    const model = (q.modelAnswer || '').trim().toLowerCase()
    if (!model) continue
    if (model && ans && model === ans) correct += 1
  }
  return {
    total: questions.length,
    correct
  }
}

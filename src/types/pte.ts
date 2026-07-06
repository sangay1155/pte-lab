export type PTEQuestionType =
  | 'read-aloud'
  | 'repeat-sentence'
  | 'describe-image'
  | 'retell-lecture'
  | 'answer-short-question'
  | 'summarize-written'
  | 'write-essay'
  | 'reading-drop-down'
  | 'reading-multiple-choice-multiple'
  | 'reorder-paragraphs'
  | 'reading-drag-drop'
  | 'reading-multiple-choice-single'
  | 'summarize-spoken'
  | 'listening-multiple-choice-multiple'
  | 'listening-fill-blanks'
  | 'highlight-summary'
  | 'listening-multiple-choice-single'
  | 'select-missing-word'
  | 'highlight-incorrect-words'
  | 'write-dictation'

export type PTESection = 'speaking-writing' | 'reading' | 'listening'

export interface PTEQuestion {
  id: string
  type: PTEQuestionType
  section: PTESection
  promptText?: string
  audioUrl?: string
  imageUrl?: string
  options?: string[]
  blankOptions?: string[]
  scrambledTexts?: string[]
  timeLimitSeconds?: number
  modelAnswer?: string
}

export const mockQuestions: PTEQuestion[] = [
  {
    id: 's1',
    type: 'read-aloud',
    section: 'speaking-writing',
    promptText:
      'The benefits of urban green spaces include improved air quality and mental wellbeing.',
    timeLimitSeconds: 40,
    modelAnswer: 'Urban green spaces improve air quality and boost mental health.'
  },
  {
    id: 'r1',
    type: 'reorder-paragraphs',
    section: 'reading',
    promptText: 'Re-order the following paragraphs to make a coherent passage.',
    scrambledTexts: [
      'Paragraph 3: As a result, the city invested in public parks.',
      'Paragraph 1: Cities face problems with pollution and crowded streets.',
      'Paragraph 2: Citizens demanded cleaner, greener public spaces.'
    ],
    timeLimitSeconds: 120,
    modelAnswer: 'Paragraph 1, Paragraph 2, Paragraph 3'
  },
  {
    id: 'l1',
    type: 'listening-fill-blanks',
    section: 'listening',
    promptText: 'Listen and fill the missing words in the transcript below.',
    audioUrl: '/src/assets/hero.mp3',
    blankOptions: ['economy', 'education', 'environment'],
    timeLimitSeconds: 90,
    modelAnswer: 'environment'
  }
]

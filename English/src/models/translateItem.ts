export type TestLanguage = 'english' | 'georgian'

export interface TranslateItem {
  english: string
  georgian: string
  pronunciation: string
  eng_example: string
  geo_example: string
}

export interface TranslateAnswer {
  question: string
  userAnswer: string
  correctAnswer: string
  isCorrect: boolean
  isPartiallyCorrect: boolean
}
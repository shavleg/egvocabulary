import { useState, useCallback } from 'react'
import type { TranslateItem, TranslateAnswer, TestLanguage } from '../models'

export const useTest = (words: TranslateItem[]) => {
  // Test states
  const [showLanguageModal, setShowLanguageModal] = useState(false)
  const [showQuestionModal, setShowQuestionModal] = useState(false)
  const [showResultsModal, setShowResultsModal] = useState(false)
  const [testLanguage, setTestLanguage] = useState<TestLanguage>('english')
  const [testWords, setTestWords] = useState<TranslateItem[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<TranslateAnswer[]>([])
  const [currentAnswer, setCurrentAnswer] = useState('')
  const [usedWords, setUsedWords] = useState<Set<string>>(new Set())

  // Test functions
  const startTest = useCallback(() => {
    // Close any open modals first
    setShowQuestionModal(false)
    setShowResultsModal(false)
    setShowLanguageModal(true)
  }, [])

  const selectTestLanguage = useCallback((language: TestLanguage) => {
    setTestLanguage(language)
    setShowLanguageModal(false)
    
    // Use existing testWords if available (from selected words), otherwise use random words
    let wordsToUse = testWords.length > 0 ? testWords : words
    
    if (wordsToUse.length === 0) {
      wordsToUse = words
    }
    
    // Filter out already used words
    const availableWords = wordsToUse.filter(word => !usedWords.has(word.english))
    
    // If all words have been used, reset the used words
    let finalWords = availableWords
    if (availableWords.length === 0) {
      setUsedWords(new Set())
      finalWords = wordsToUse
    }
    console.log({testWords: testWords, finalWords: finalWords, usedWords: usedWords, wordsToUse: wordsToUse})
    // Select random words for test (max 10 or all if less)
    const shuffled = [...finalWords].sort(() => 0.5 - Math.random())
    const testCount = Math.min(finalWords.length, 10)
    setTestWords(shuffled.slice(0, testCount))
    setUserAnswers([])
    setCurrentQuestionIndex(0)
    setCurrentAnswer('')
    setShowQuestionModal(true)
  }, [words, testWords, usedWords])

  const startTestWithWords = useCallback((selectedWords: TranslateItem[]) => {
    setShowQuestionModal(false)
    setShowResultsModal(false)
    setShowLanguageModal(true)
    // Store selected words for later use
    setTestWords(selectedWords)
  }, [])
  console.log({testWords: testWords, usedWords: usedWords})
  const checkAnswer = useCallback((userAnswer, correctAnswer) => {
    const userAnswerLower = userAnswer.toLowerCase().trim()
    const correctAnswers = correctAnswer.toLowerCase().trim().split('/').map(answer => answer.trim())
    const userHasMultipleAnswers = userAnswerLower.includes('/')
    
    let isCorrect = false
    let isPartiallyCorrect = false
    
    if (userHasMultipleAnswers) {
      // If user wrote multiple answers, check if all match
      const userAnswers = userAnswerLower.split('/').map(answer => answer.trim())
      const correctUserAnswers = userAnswers.filter(userAns => 
        correctAnswers.some(correct => correct === userAns)
      )
      
      if (correctUserAnswers.length === userAnswers.length) {
        // All answers are correct - full green
        isCorrect = true
        isPartiallyCorrect = false
      } else if (correctUserAnswers.length > 0) {
        // Some answers are correct - warning orange
        isCorrect = true // Still give points for partial correctness
        isPartiallyCorrect = true
      }
    } else {
      // If user wrote single answer, any correct match is accepted - full green
      isCorrect = correctAnswers.some(correct => correct === userAnswerLower)
      isPartiallyCorrect = false
    }

    return { isCorrect, isPartiallyCorrect }
  }, [])

  const submitAnswer = useCallback(() => {
    if (!currentAnswer.trim()) return

    const currentWord = testWords[currentQuestionIndex]
    const correctAnswer = testLanguage === 'english' ? currentWord.english : currentWord.georgian
    
    const { isCorrect, isPartiallyCorrect } = checkAnswer(currentAnswer, correctAnswer)

    const newAnswer = {
      question: testLanguage === 'english' ? currentWord.georgian : currentWord.english,
      userAnswer: currentAnswer,
      correctAnswer: correctAnswer,
      isCorrect: isCorrect,
      isPartiallyCorrect: isPartiallyCorrect
    }

    setUserAnswers(prev => [...prev, newAnswer])
    
    // Mark word as used only if answered correctly (not partially correct)
    if (isCorrect && !isPartiallyCorrect) {
      setUsedWords(prev => {
        const newUsedWords = new Set(prev)
        newUsedWords.add(currentWord.english)
        return newUsedWords
      })
    }
    
    setCurrentAnswer('')

    if (currentQuestionIndex < testWords.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setShowLanguageModal(false)
      setShowQuestionModal(false)
      setShowResultsModal(true)
    }
  }, [currentAnswer, testWords, currentQuestionIndex, testLanguage, checkAnswer])

  const skipQuestion = useCallback(() => {
    const currentWord = testWords[currentQuestionIndex]
    const correctAnswer = testLanguage === 'english' ? currentWord.english : currentWord.georgian

    const newAnswer = {
      question: testLanguage === 'english' ? currentWord.georgian : currentWord.english,
      userAnswer: '', // Empty answer for skipped question
      correctAnswer: correctAnswer,
      isCorrect: false,
      isPartiallyCorrect: false
    }

    setUserAnswers(prev => [...prev, newAnswer])
    setCurrentAnswer('')
    
    // Don't mark skipped words as used - they should appear in future tests

    if (currentQuestionIndex < testWords.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setShowLanguageModal(false)
      setShowQuestionModal(false)
      setShowResultsModal(true)
    }
  }, [testWords, currentQuestionIndex, testLanguage])

  const showCurrentResults = useCallback(() => {
    setShowLanguageModal(false)
    setShowQuestionModal(false)
    setShowResultsModal(true)
  }, [])

  const closeModals = useCallback(() => {
    setShowLanguageModal(false)
    setShowQuestionModal(false)
    setShowResultsModal(false)
    setTestLanguage('english')
    setTestWords([])
    setCurrentQuestionIndex(0)
    setUserAnswers([])
    setCurrentAnswer('')
  }, [])

  const backToTest = useCallback(() => {
    setShowLanguageModal(false)
    setShowResultsModal(false)
    setShowQuestionModal(true)
  }, [])

  return {
    // States
    showLanguageModal,
    showQuestionModal,
    showResultsModal,
    testLanguage,
    testWords,
    currentQuestionIndex,
    userAnswers,
    currentAnswer,
    
    // Actions
    startTest,
    startTestWithWords,
    selectTestLanguage,
    submitAnswer,
    skipQuestion,
    showCurrentResults,
    closeModals,
    backToTest,
    setCurrentAnswer
  }
}

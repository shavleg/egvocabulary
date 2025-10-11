import { useState, useCallback, useEffect } from 'react'
import { TranslateItem, TestLanguage } from '../models/translateItem'
import { speakText } from '../utils/speechUtils'

export const useView = (words: TranslateItem[]) => {
  const [showViewModal, setShowViewModal] = useState(false)
  const [viewLanguage, setViewLanguage] = useState<TestLanguage>('english')
  const [viewWords, setViewWords] = useState<TranslateItem[]>([])
  const [currentViewIndex, setCurrentViewIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  // Determine delay based on text length
  const getDelay = (word: TranslateItem, language: TestLanguage): number => {
    const englishLength = word.english.length
    const georgianLength = word.georgian.length
    
    // If both are less than 15 chars = 5 seconds
    // If either is >= 15 chars = 10 seconds
    return (englishLength < 15 && georgianLength < 15) ? 5000 : 10000
  }

  const startView = useCallback((selectedWords?: TranslateItem[]) => {
    const wordsToView = selectedWords && selectedWords.length > 0 ? selectedWords : words
    
    if (wordsToView.length === 0) return

    // Shuffle words randomly
    const shuffled = [...wordsToView].sort(() => Math.random() - 0.5)
    
    setViewWords(shuffled)
    setCurrentViewIndex(0)
    setShowViewModal(true)
    setIsPlaying(false)
  }, [words])

  const startViewWithLanguage = useCallback((language: TestLanguage) => {
    setViewLanguage(language)
    setIsPlaying(true)
  }, [])

  const closeView = useCallback(() => {
    setShowViewModal(false)
    setIsPlaying(false)
    setCurrentViewIndex(0)
    setViewWords([])
  }, [])

  // Auto-play logic
  useEffect(() => {
    if (!isPlaying || !showViewModal || viewWords.length === 0) return

    const currentWord = viewWords[currentViewIndex]
    if (!currentWord) return

    // Speak the word with 1 second delay
    const speakTimeout = setTimeout(() => {
      const textToSpeak = viewLanguage === 'english' ? currentWord.english : currentWord.georgian
      const lang = viewLanguage === 'english' ? 'en-US' : 'ka-GE'
      speakText(textToSpeak, lang)
    }, 1000)

    // Move to next word after delay
    const delay = getDelay(currentWord, viewLanguage)
    const nextTimeout = setTimeout(() => {
      if (currentViewIndex < viewWords.length - 1) {
        setCurrentViewIndex(prev => prev + 1)
      } else {
        // End of words, close modal
        closeView()
      }
    }, delay)

    return () => {
      clearTimeout(speakTimeout)
      clearTimeout(nextTimeout)
    }
  }, [isPlaying, showViewModal, viewWords, currentViewIndex, viewLanguage, closeView])

  return {
    showViewModal,
    viewLanguage,
    currentWord: viewWords[currentViewIndex],
    currentViewIndex,
    totalViewWords: viewWords.length,
    startView,
    startViewWithLanguage,
    closeView,
    isPlaying
  }
}


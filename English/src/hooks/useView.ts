import { useState, useCallback, useEffect } from 'react'
import { TranslateItem, TestLanguage } from '../models/translateItem'
import { speakText } from '../utils/speechUtils'
import { requestWakeLock, releaseWakeLock, setupWakeLockReacquisition } from '../utils/wakeLockUtils'

export const useView = (words: TranslateItem[]) => {
  const [showViewModal, setShowViewModal] = useState(false)
  const [viewLanguage, setViewLanguage] = useState<TestLanguage>('english')
  const [viewWords, setViewWords] = useState<TranslateItem[]>([])
  const [currentViewIndex, setCurrentViewIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  // Determine delay based on text length
  const getDelay = (word: TranslateItem): number => {
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
    // Request wake lock to keep screen on
    requestWakeLock()
  }, [])

  const closeView = useCallback(() => {
    setShowViewModal(false)
    setIsPlaying(false)
    setIsPaused(false)
    setIsMuted(false)
    setCurrentViewIndex(0)
    setViewWords([])
    // Release wake lock when closing
    releaseWakeLock()
  }, [])

  const togglePause = useCallback(() => {
    setIsPaused(prev => !prev)
  }, [])

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev)
  }, [])

  const nextWord = useCallback(() => {
    if (currentViewIndex < viewWords.length - 1) {
      setCurrentViewIndex(prev => prev + 1)
    } else {
      // Last word, close modal
      closeView()
    }
  }, [currentViewIndex, viewWords.length, closeView])

  // Wake lock re-acquisition on visibility change
  useEffect(() => {
    if (!isPlaying) return
    
    const cleanup = setupWakeLockReacquisition(() => {
      requestWakeLock()
    })
    
    return cleanup
  }, [isPlaying])

  // Audio play logic (separate from navigation, only on word change)
  useEffect(() => {
    if (!isPlaying || !showViewModal || viewWords.length === 0 || isPaused || isMuted) return
    if (viewLanguage !== 'english') return

    const currentWord = viewWords[currentViewIndex]
    if (!currentWord) return

    // Speak the word with 1 second delay (only for English words and if not muted)
    const speakTimeout = setTimeout(() => {
      speakText(currentWord.english, 'en-US')
    }, 1000)

    return () => {
      clearTimeout(speakTimeout)
    }
  }, [isPlaying, showViewModal, viewWords, currentViewIndex, viewLanguage, isPaused]) // Removed isMuted from dependencies

  // Auto-navigation logic (independent of mute state)
  useEffect(() => {
    if (!isPlaying || !showViewModal || viewWords.length === 0 || isPaused) return

    const currentWord = viewWords[currentViewIndex]
    if (!currentWord) return

    // Move to next word after delay
    const delay = getDelay(currentWord)
    const nextTimeout = setTimeout(() => {
      if (currentViewIndex < viewWords.length - 1) {
        setCurrentViewIndex(prev => prev + 1)
      } else {
        // End of words, close modal
        closeView()
      }
    }, delay)

    return () => {
      clearTimeout(nextTimeout)
    }
  }, [isPlaying, showViewModal, viewWords, currentViewIndex, isPaused, closeView])

  return {
    showViewModal,
    viewLanguage,
    currentWord: viewWords[currentViewIndex],
    currentViewIndex,
    totalViewWords: viewWords.length,
    currentDelay: viewWords[currentViewIndex] ? getDelay(viewWords[currentViewIndex]) : 5000,
    startView,
    startViewWithLanguage,
    closeView,
    nextWord,
    isPlaying,
    isPaused,
    isMuted,
    togglePause,
    toggleMute
  }
}


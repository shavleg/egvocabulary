import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'knownWords'

export const useKnownWords = () => {
  const [knownWords, setKnownWords] = useState<Set<string>>(new Set())

  // Load known words from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setKnownWords(new Set(parsed))
      } catch (error) {
        console.error('Error loading known words:', error)
      }
    }
  }, [])

  // Save to localStorage whenever knownWords changes
  const saveToStorage = useCallback((words: Set<string>) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(words)))
  }, [])

  // Toggle a word as known/unknown
  const toggleKnownWord = useCallback((wordEnglish: string) => {
    setKnownWords(prev => {
      const newSet = new Set(prev)
      if (newSet.has(wordEnglish)) {
        newSet.delete(wordEnglish)
      } else {
        newSet.add(wordEnglish)
      }
      saveToStorage(newSet)
      return newSet
    })
  }, [saveToStorage])

  // Check if a word is known
  const isWordKnown = useCallback((wordEnglish: string) => {
    return knownWords.has(wordEnglish)
  }, [knownWords])

  // Get count of known words
  const getKnownWordsCount = useCallback(() => {
    return knownWords.size
  }, [knownWords])

  // Clear all known words
  const clearKnownWords = useCallback(() => {
    setKnownWords(new Set())
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  return {
    knownWords,
    toggleKnownWord,
    isWordKnown,
    getKnownWordsCount,
    clearKnownWords
  }
}


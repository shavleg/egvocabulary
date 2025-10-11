import { useState, useCallback } from 'react'
import type { TranslateItem } from '../models'

export const useSelection = () => {
  const [selectedWords, setSelectedWords] = useState<TranslateItem[]>([])
  const [isSelectionMode, setIsSelectionMode] = useState(false)

  const toggleWordSelection = useCallback((word: TranslateItem) => {
    if (!isSelectionMode) return

    setSelectedWords(prev => {
      const isSelected = prev.some(selected => selected.english === word.english)
      if (isSelected) {
        return prev.filter(selected => selected.english !== word.english)
      } else {
        return [...prev, word]
      }
    })
  }, [isSelectionMode])

  const enterSelectionMode = useCallback(() => {
    setIsSelectionMode(true)
  }, [])

  const exitSelectionMode = useCallback(() => {
    setIsSelectionMode(false)
    setSelectedWords([])
  }, [])

  const isWordSelected = useCallback((word: TranslateItem) => {
    return selectedWords.some(selected => selected.english === word.english)
  }, [selectedWords])

  const getSelectedWordsForTest = useCallback(() => {
    return selectedWords.length > 0 ? selectedWords : []
  }, [selectedWords])

  return {
    selectedWords,
    isSelectionMode,
    toggleWordSelection,
    enterSelectionMode,
    exitSelectionMode,
    isWordSelected,
    getSelectedWordsForTest
  }
}

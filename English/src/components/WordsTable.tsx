import React from 'react'
import './WordsTable.css'
import { TranslateItem } from '../models/translateItem'
import { translations } from '../constants/translations'
import PronunciationCell from './PronunciationCell'
interface WordsTableProps {
  filteredWords: TranslateItem[]
  searchTerm: string
  hideEnglish: boolean
  hideGeorgian: boolean
  highlightText: (text: string, searchTerm: string) => React.ReactNode
  hideText: (text: string) => string
  tableRef: React.RefObject<HTMLDivElement | null>
  setSearchTerm: (term: string) => void
  isSelectionMode: boolean
  isWordSelected: (word: TranslateItem) => boolean
  onWordLongPress: (word: TranslateItem) => void
  onWordClick: (word: TranslateItem) => void
  isWordKnown: (wordEnglish: string) => boolean
  onToggleKnownWord: (wordEnglish: string) => void
}

const WordsTable: React.FC<WordsTableProps> = ({ 
  filteredWords, 
  searchTerm, 
  hideEnglish, 
  hideGeorgian, 
  highlightText, 
  hideText,
  setSearchTerm,
  isSelectionMode,
  isWordSelected,
  onWordLongPress,
  onWordClick,
  isWordKnown,
  onToggleKnownWord
}) => {
  const handleLongPress = (word: TranslateItem) => {
    let timeoutId: number | null = null
    let isLongPress = false
    let startX = 0
    let startY = 0
    let hasMoved = false

    const start = (e: React.MouseEvent | React.TouchEvent) => {
      isLongPress = false
      hasMoved = false
      
      // Get initial position
      if ('touches' in e) {
        startX = e.touches[0].clientX
        startY = e.touches[0].clientY
      } else {
        startX = e.clientX
        startY = e.clientY
      }

      timeoutId = window.setTimeout(() => {
        if (!hasMoved) {
          isLongPress = true
          onWordLongPress(word)
        }
      }, 500)
    }

    const move = (e: React.MouseEvent | React.TouchEvent) => {
      let currentX = 0
      let currentY = 0

      if ('touches' in e) {
        currentX = e.touches[0].clientX
        currentY = e.touches[0].clientY
      } else {
        currentX = e.clientX
        currentY = e.clientY
      }

      // If moved more than 10px, consider it a scroll
      const deltaX = Math.abs(currentX - startX)
      const deltaY = Math.abs(currentY - startY)
      
      if (deltaX > 10 || deltaY > 10) {
        hasMoved = true
        if (timeoutId) {
          clearTimeout(timeoutId)
        }
      }
    }

    const end = () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      if (!isLongPress && !hasMoved && isSelectionMode) {
        onWordClick(word)
      }
    }

    const cancel = () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }

    return {
      onMouseDown: start,
      onMouseUp: end,
      onMouseMove: move,
      onMouseLeave: cancel,
      onTouchStart: start,
      onTouchEnd: end,
      onTouchMove: move,
      onTouchCancel: cancel,
    }
  }

  return (
    <div className="table-container">
      <table className="words-table">
        <thead>
          <tr>
            <th>{translations.ge.tableHeaderEnglish}</th>
            <th>{translations.ge.tableHeaderGeorgian}</th>
            <th>{translations.ge.tableHeaderPronunciation}</th>
            <th>{translations.ge.tableHeaderEnglishExample}</th>
            <th>{translations.ge.tableHeaderGeorgianExample}</th>
            <th className="known-column">{translations.ge.knownColumn}</th>
          </tr>
        </thead>
        <tbody>
          {filteredWords.map((word, index) => {
            const isSelected = isWordSelected(word)
            const isKnown = isWordKnown(word.english)
            
            return (
              <tr 
                key={index} 
                className={`
                  ${searchTerm ? 'search-result-row' : ''} 
                  ${isSelected ? 'selected-row' : ''}
                  ${isSelectionMode ? 'selection-mode' : ''}
                  ${isKnown ? 'known-word-row' : ''}
                `}
                {...handleLongPress(word)}
              >
                <td className="english-cell">
                  {hideEnglish ? hideText(word.english) : highlightText(word.english, searchTerm)}
                </td>
                <td className="georgian-cell">
                  {hideGeorgian ? hideText(word.georgian) : highlightText(word.georgian, searchTerm)}
                </td>
                <td className="pronunciation-cell">
                  {hideEnglish ? (
                    <span className="hidden-pronunciation">{hideText(word.pronunciation)}</span>
                  ) : (
                    <PronunciationCell 
                      pronunciation={word.pronunciation} 
                      word={word.english}
                    />
                  )}
                </td>
                <td className="eng-example-cell">
                  {hideEnglish ? hideText(word.eng_example) : highlightText(word.eng_example, searchTerm)}
                </td>
                <td className="geo-example-cell">
                  {hideGeorgian ? hideText(word.geo_example) : highlightText(word.geo_example, searchTerm)}
                </td>
                <td className="known-cell">
                  <button 
                    className={`known-btn ${isKnown ? 'known' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation()
                      onToggleKnownWord(word.english)
                    }}
                    title={isKnown ? 'ამოშლა ნასწავლებიდან' : 'მონიშვნა როგორც ნასწავლი'}
                  >
                    {isKnown ? '✓' : '○'}
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      
      {filteredWords.length === 0 && searchTerm && (
        <div className="no-results">
          <p>{translations.ge.noResults} "{searchTerm}"</p>
          <button onClick={() => setSearchTerm('')} className="clear-search-btn">
            {translations.ge.clearSearch}
          </button>
        </div>
      )}
    </div>
  )
}

export default WordsTable

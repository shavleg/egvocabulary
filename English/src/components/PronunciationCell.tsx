import React from 'react'
import { speakText } from '../utils/speechUtils'
import { translations } from '../constants/translations'
import './PronunciationCell.css'

interface PronunciationCellProps {
  pronunciation: string
  word: string
}

const PronunciationCell: React.FC<PronunciationCellProps> = ({ pronunciation, word }) => {
  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent row click
    speakText(word, 'en-US')
  }

  return (
    <div className="pronunciation-cell-container">
      <span className="pronunciation-text">{pronunciation}</span>
      <button 
        className="speak-btn"
        onClick={handleSpeak}
        title={translations.ge.listenPronunciation}
      >
        🔊
      </button>
    </div>
  )
}

export default PronunciationCell

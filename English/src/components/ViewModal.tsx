import React from 'react'
import './ViewModal.css'
import { TranslateItem, TestLanguage } from '../models/translateItem'

interface ViewModalProps {
  currentWord: TranslateItem | undefined
  viewLanguage: TestLanguage
  currentIndex: number
  totalWords: number
  onClose: () => void
}

const ViewModal: React.FC<ViewModalProps> = ({ 
  currentWord, 
  viewLanguage, 
  currentIndex, 
  totalWords, 
  onClose 
}) => {
  if (!currentWord) return null

  const primaryText = viewLanguage === 'english' ? currentWord.english : currentWord.georgian
  const secondaryText = viewLanguage === 'english' ? currentWord.georgian : currentWord.english
  const pronunciation = currentWord.pronunciation

  return (
    <div className="view-modal-overlay">
      <div className="view-modal">
        <button className="view-close-btn" onClick={onClose}>
          ✕
        </button>
        
        <div className="view-progress">
          {currentIndex + 1} / {totalWords}
        </div>

        <div className="view-content">
          <div className="view-primary">
            {primaryText}
            {viewLanguage === 'english' && pronunciation && (
              <div className="view-pronunciation">{pronunciation}</div>
            )}
          </div>
          
          <div className="view-divider">→</div>
          
          <div className="view-secondary">
            {secondaryText}
            {viewLanguage === 'georgian' && pronunciation && (
              <div className="view-pronunciation">{pronunciation}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewModal


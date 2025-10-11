import React from 'react'
import Modal from './Modal'
import Button from './Button'
import { useProgressBar } from '../hooks/useProgressBar'
import './ViewModal.css'
import { TranslateItem, TestLanguage } from '../models/translateItem'

interface ViewModalProps {
  currentWord: TranslateItem | undefined
  viewLanguage: TestLanguage
  currentIndex: number
  totalWords: number
  currentDelay: number
  onClose: () => void
}

const ViewModal: React.FC<ViewModalProps> = ({ 
  currentWord, 
  viewLanguage, 
  currentIndex, 
  totalWords,
  currentDelay,
  onClose 
}) => {
  if (!currentWord) return null

  const primaryText = viewLanguage === 'english' ? currentWord.english : currentWord.georgian
  const secondaryText = viewLanguage === 'english' ? currentWord.georgian : currentWord.english
  const pronunciation = currentWord.pronunciation

  // Progress bar animation using custom hook
  const progress = useProgressBar(currentDelay, currentIndex)

  return (
    <Modal onClose={onClose} className="view-modal-content" showCloseButton={false}>
      <div className="view-close-btn">
        <Button variant="danger" icon size="small" onClick={onClose}>
          ✕
        </Button>
      </div>
      
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
      
      {/* Progress bar */}
      <div className="view-progress-bar">
        <div 
          className="view-progress-bar-fill" 
          style={{ width: `${progress}%` }}
        />
      </div>
    </Modal>
  )
}

export default ViewModal


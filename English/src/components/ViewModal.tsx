import React from 'react'
import Modal from './Modal'
import Button from './Button'
import { useProgressBar } from '../hooks/useProgressBar'
import { translations } from '../constants/translations'
import './ViewModal.css'
import { TranslateItem, TestLanguage } from '../models/translateItem'

interface ViewModalProps {
  currentWord: TranslateItem | undefined
  viewLanguage: TestLanguage
  currentIndex: number
  totalWords: number
  currentDelay: number
  isPaused: boolean
  isMuted: boolean
  onClose: () => void
  onNext: () => void
  onTogglePause: () => void
  onToggleMute: () => void
}

const ViewModal: React.FC<ViewModalProps> = ({ 
  currentWord, 
  viewLanguage, 
  currentIndex, 
  totalWords,
  currentDelay,
  isPaused,
  isMuted,
  onClose,
  onNext,
  onTogglePause,
  onToggleMute
}) => {
  if (!currentWord) return null

  const primaryText = viewLanguage === 'english' ? currentWord.english : currentWord.georgian
  const secondaryText = viewLanguage === 'english' ? currentWord.georgian : currentWord.english
  const pronunciation = currentWord.pronunciation

  // Progress bar animation using custom hook
  const progress = useProgressBar(currentDelay, currentIndex, isPaused)

  // Fade and slide animation state
  const [isVisible, setIsVisible] = React.useState(true)

  React.useEffect(() => {
    setIsVisible(false)
    const timer = setTimeout(() => setIsVisible(true), 200)
    return () => clearTimeout(timer)
  }, [currentIndex])

  return (
    <Modal onClose={onClose} className="view-modal-content" showCloseButton={false}>
      <div className="view-header-buttons">
        {viewLanguage === 'english' && (
          <button 
            className="view-mute-btn"
            onClick={onToggleMute}
            title={isMuted ? "ხმის ჩართვა" : "ხმის გათიშვა"}
          >
            {isMuted ? '🔇' : '🔊'}
          </button>
        )}
        <Button variant="danger" icon size="small" onClick={onClose}>
          ✕
        </Button>
      </div>
      
      <div className="view-progress">
        {currentIndex + 1} / {totalWords}
      </div>

      <div 
        className="view-content" 
        style={{ 
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)'
        }}
      >
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
      
      {/* Control buttons above progress bar */}
      <div className="view-control-buttons">
        <Button 
          variant="warning" 
          size="small" 
          onClick={onTogglePause}
        >
          {isPaused ? translations.ge.play : translations.ge.pause}
        </Button>
        <Button 
          variant="primary" 
          size="small" 
          onClick={onNext}
        >
          {translations.ge.next} →
        </Button>
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


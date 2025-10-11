import React from 'react'
import './Modal.css'
import { TestLanguage } from '../models/translateItem'

interface LanguageModalProps {
  title: string
  description: string
  onSelectLanguage: (language: TestLanguage) => void
  onClose: () => void
}

const LanguageModal: React.FC<LanguageModalProps> = ({ 
  title, 
  description, 
  onSelectLanguage, 
  onClose 
}) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="language-buttons">
          <button 
            className="language-btn"
            onClick={() => onSelectLanguage('english')}
          >
            🇺🇸 ინგლისური → ქართული
          </button>
          <button 
            className="language-btn"
            onClick={() => onSelectLanguage('georgian')}
          >
            🇬🇪 ქართული → ინგლისური
          </button>
        </div>
        <button className="close-modal-btn" onClick={onClose}>
          ✕
        </button>
      </div>
    </div>
  )
}

export default LanguageModal


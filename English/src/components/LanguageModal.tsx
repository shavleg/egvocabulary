import React from 'react'
import Modal from './Modal'
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
    <Modal onClose={onClose}>
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
    </Modal>
  )
}

export default LanguageModal


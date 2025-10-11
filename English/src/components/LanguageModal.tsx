import React from 'react'
import './Modal.css'
import { Modal, Button } from './index'
import type { TestLanguage } from '../models'

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
        <Button 
          variant="language"
          onClick={() => onSelectLanguage('english')}
        >
          🇺🇸 ინგლისური → ქართული
        </Button>
        <Button 
          variant="language"
          onClick={() => onSelectLanguage('georgian')}
        >
          🇬🇪 ქართული → ინგლისური
        </Button>
      </div>
    </Modal>
  )
}

export default LanguageModal


import React from 'react'
import './Modal.css'
import { TestLanguage } from '../models/translateItem'

interface ViewLanguageModalProps {
  onSelectLanguage: (language: TestLanguage) => void
  onClose: () => void
}

const ViewLanguageModal: React.FC<ViewLanguageModalProps> = ({ onSelectLanguage, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>ნახვის რეჟიმის არჩევა</h2>
        <p>რომელ ენაზე გსურთ სიტყვების ნახვა?</p>
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

export default ViewLanguageModal


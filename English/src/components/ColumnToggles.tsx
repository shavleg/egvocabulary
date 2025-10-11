import React from 'react'
import './ColumnToggles.css'
import { translations } from '../constants'

interface ColumnTogglesProps {
  hideEnglish: boolean
  hideGeorgian: boolean
  onToggleEnglish: () => void
  onToggleGeorgian: () => void
}

const ColumnToggles: React.FC<ColumnTogglesProps> = ({ hideEnglish, hideGeorgian, onToggleEnglish, onToggleGeorgian }) => {
  return (
    <div className="column-toggle-container">
      <button 
        className={`toggle-btn ${hideEnglish ? 'active' : ''}`}
        onClick={onToggleEnglish}
        title={hideEnglish ? `${translations.ge.englishColumn} ${translations.ge.showColumn}` : `${translations.ge.englishColumn} ${translations.ge.hideColumn}`}
      >
        {hideEnglish ? '👁️' : '🙈'} {translations.ge.englishColumn}
      </button>
      <button 
        className={`toggle-btn ${hideGeorgian ? 'active' : ''}`}
        onClick={onToggleGeorgian}
        title={hideGeorgian ? `${translations.ge.georgianColumn} ${translations.ge.showColumn}` : `${translations.ge.georgianColumn} ${translations.ge.hideColumn}`}
      >
        {hideGeorgian ? '👁️' : '🙈'} {translations.ge.georgianColumn}
      </button>
    </div>
  )
}

export default ColumnToggles

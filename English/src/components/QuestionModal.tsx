import React from 'react'
import './Modal.css'
import { TranslateItem, TestLanguage } from '../models/translateItem'
import { translations } from '../constants/translations'

interface QuestionModalProps {
  currentQuestionIndex: number
  totalQuestions: number
  testLanguage: TestLanguage
  currentWord: TranslateItem | undefined
  currentAnswer: string
  setCurrentAnswer: (answer: string) => void
  onSubmitAnswer: () => void
  onSkipQuestion: () => void
  onShowResults: () => void
  onClose: () => void
  hasAnswers: boolean
}

const QuestionModal: React.FC<QuestionModalProps> = ({ 
  currentQuestionIndex, 
  totalQuestions, 
  testLanguage, 
  currentWord, 
  currentAnswer, 
  setCurrentAnswer, 
  onSubmitAnswer, 
  onSkipQuestion,
  onShowResults, 
  onClose, 
  hasAnswers 
}) => {
  const currentQuestion = testLanguage === 'english' 
    ? currentWord?.georgian 
    : currentWord?.english

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="question-header">
          <h2>{translations.ge.question} {currentQuestionIndex + 1} {translations.ge.of} {totalQuestions}</h2>
          <div className="question-header-buttons">
            {hasAnswers && (
              <button className="show-results-btn" onClick={onShowResults}>
{translations.ge.showResults}
              </button>
            )}
            <button className="close-modal-btn" onClick={onClose}>✕</button>
          </div>
        </div>
        
        <div className="question-content">
          <h3>
            {translations.ge.whatIsTranslation} "
            {testLanguage === 'georgian' ? (
              <>
                {currentQuestion}
                {currentWord?.pronunciation && (
                  <span className="question-pronunciation"> {currentWord.pronunciation}</span>
                )}
              </>
            ) : (
              currentQuestion
            )}
            "{translations.ge.translationOf}
          </h3>
          
          <div className="answer-input-container">
            <input
              type="text"
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              placeholder={translations.ge.enterAnswer}
              className="answer-input"
              onKeyPress={(e) => e.key === 'Enter' && onSubmitAnswer()}
              autoFocus
            />
            <div className="answer-buttons">
              <button 
                className="submit-answer-btn"
                onClick={onSubmitAnswer}
                disabled={!currentAnswer.trim()}
              >
                {translations.ge.next}
              </button>
              <button 
                className="skip-question-btn"
                onClick={onSkipQuestion}
              >
                {translations.ge.skip}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuestionModal

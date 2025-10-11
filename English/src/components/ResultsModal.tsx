import React from 'react'
import './Modal.css'
import { Modal, Button } from './index'
import type { TranslateAnswer } from '../models'
import { translations } from '../constants'

interface ResultsModalProps {
  userAnswers: TranslateAnswer[]
  currentQuestionIndex: number
  totalQuestions: number
  onBackToTest: () => void
  onRestartTest: () => void
  onClose: () => void
}

const ResultsModal: React.FC<ResultsModalProps> = ({ 
  userAnswers, 
  currentQuestionIndex, 
  totalQuestions, 
  onBackToTest, 
  onRestartTest, 
  onClose 
}) => {
  const correctAnswers = userAnswers.filter(answer => answer.isCorrect).length
  const percentage = Math.round((correctAnswers / userAnswers.length) * 100)

  return (
    <Modal onClose={onClose} className="results-modal" showCloseButton={false}>
      <div className="close-modal-btn-wrapper">
        <Button variant="danger" icon size="small" onClick={onClose}>
          ✕
        </Button>
      </div>
      
      <div className="results-header">
        <h2>{translations.ge.testResults}</h2>
      </div>
      
      <div className="results-summary">
        <div className="score">
          <span className="score-number">
            {correctAnswers} / {userAnswers.length}
          </span>
          <span className="score-label">{translations.ge.correctAnswers}</span>
        </div>
        <div className="percentage">
          {percentage}%
        </div>
      </div>

      <div className="results-list">
        {userAnswers.map((answer, index) => (
          <div key={index} className={`result-item ${answer.isCorrect ? (answer.isPartiallyCorrect ? 'partially-correct' : 'correct') : 'incorrect'}`}>
            <div className="result-question">
              <strong>{translations.ge.questionLabel}</strong> "{answer.question}"
            </div>
            <div className="result-answers">
              <div className="user-answer">
                <strong>{translations.ge.yourAnswer}</strong> "{answer.userAnswer}"
              </div>
              <div className="correct-answer">
                <strong>{translations.ge.correctAnswer}</strong> "{answer.correctAnswer}"
              </div>
            </div>
            <div className="result-status">
              {answer.isCorrect ? (
                answer.isPartiallyCorrect ? translations.ge.partiallyCorrect : translations.ge.correct
              ) : translations.ge.incorrect}
            </div>
          </div>
        ))}
      </div>

      <div className="results-actions">
        <div className="results-buttons">
          {currentQuestionIndex < totalQuestions - 1 && (
            <Button variant="info" onClick={onBackToTest}>
              {translations.ge.backToTest}
            </Button>
          )}
          <Button variant="language" size="large" onClick={onRestartTest}>
            {translations.ge.newTest}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default ResultsModal

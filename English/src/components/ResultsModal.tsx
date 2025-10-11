import React from 'react'
import './Modal.css'
import { TranslateAnswer } from '../models/translateItem'
import { translations } from '../constants/translations'

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
    <div className="modal-overlay">
      <div className="modal results-modal">
        <div className="results-header">
          <h2>{translations.ge.testResults}</h2>
          <button className="close-modal-btn" onClick={onClose}>✕</button>
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
              <button className="back-to-test-btn" onClick={onBackToTest}>
{translations.ge.backToTest}
              </button>
            )}
            <button className="restart-test-btn" onClick={onRestartTest}>
{translations.ge.newTest}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResultsModal

import React from "react";
import "./Modal.css";
import { Modal, Button } from "./index";
import type { TranslateItem, TestLanguage } from "../models";
import { translations } from "../constants";

interface QuestionModalProps {
  currentQuestionIndex: number;
  totalQuestions: number;
  testLanguage: TestLanguage;
  currentWord: TranslateItem | undefined;
  currentAnswer: string;
  setCurrentAnswer: (answer: string) => void;
  onSubmitAnswer: () => void;
  onSkipQuestion: () => void;
  onShowResults: () => void;
  onClose: () => void;
  hasAnswers: boolean;
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
  hasAnswers,
}) => {
  const currentQuestion =
    testLanguage === "english" ? currentWord?.georgian : currentWord?.english;

  return (
    <Modal onClose={onClose} showCloseButton={false}>
      <div className="close-modal-btn-wrapper">
        {hasAnswers && (
          <Button variant="warning" size="small" onClick={onShowResults}>
            {translations.ge.showResults}
          </Button>
        )}
        <Button variant="danger" icon size="small" onClick={onClose}>
          ✕
        </Button>
      </div>

      <div className="question-header">
        <h2>
          {translations.ge.question} {currentQuestionIndex + 1} /{" "}
          {totalQuestions}
        </h2>
      </div>

      <div className="question-content">
        <h3>
          {translations.ge.whatIsTranslation} "
          {testLanguage === "georgian" ? (
            <>
              {currentQuestion}
              {currentWord?.pronunciation && (
                <span className="question-pronunciation">
                  {" "}
                  {currentWord.pronunciation}
                </span>
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
            onKeyPress={(e) => e.key === "Enter" && onSubmitAnswer()}
            autoFocus
          />
          <div className="answer-buttons">
            <Button
              variant="success"
              onClick={onSubmitAnswer}
              disabled={!currentAnswer.trim()}
            >
              {translations.ge.next}
            </Button>
            <Button variant="danger" onClick={onSkipQuestion}>
              {translations.ge.skip}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default QuestionModal;

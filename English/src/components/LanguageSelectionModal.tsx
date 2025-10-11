import React from "react";
import "./Modal.css";
import { TestLanguage } from "../models/translateItem";
import { translations } from "../constants/translations";

interface LanguageSelectionModalProps {
  onSelectLanguage: (language: TestLanguage) => void;
  onClose: () => void;
}

const LanguageSelectionModal: React.FC<LanguageSelectionModalProps> = ({
  onSelectLanguage,
  onClose,
}) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{translations.ge.selectTestLanguage}</h2>
        <p>{translations.ge.selectLanguagePrompt}</p>
        <div className="language-buttons">
          <button
            className="language-btn"
            onClick={() => onSelectLanguage("english")}
          >
            {translations.ge.georgianToEnglish}
          </button>
          <button
            className="language-btn"
            onClick={() => onSelectLanguage("georgian")}
          >
            {translations.ge.englishToGeorgian}
          </button>
        </div>
        <button className="close-modal-btn" onClick={onClose}>
          ✕
        </button>
      </div>
    </div>
  );
};

export default LanguageSelectionModal;

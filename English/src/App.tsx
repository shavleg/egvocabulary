import { useState, useEffect, useRef, useCallback } from 'react'
import './App.css'

// Components
import SearchBar from './components/SearchBar'
import ColumnToggles from './components/ColumnToggles'
import WordsTable from './components/WordsTable'
import LanguageModal from './components/LanguageModal'
import QuestionModal from './components/QuestionModal'
import ResultsModal from './components/ResultsModal'
import ViewModal from './components/ViewModal'
import Button from './components/Button'

// Hooks
import { useTest } from './hooks/useTest'
import { useSelection } from './hooks/useSelection'
import { useKnownWords } from './hooks/useKnownWords'
import { useView } from './hooks/useView'

// Utils
import { highlightText, hideText } from './utils/textUtils'
import { TranslateItem } from './models/translateItem'
import { translations } from './constants/translations'
import React from 'react'

function App() {
  const [words, setWords] = useState<TranslateItem[]>([])
  const [filteredWords, setFilteredWords] = useState<TranslateItem[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [hideEnglish, setHideEnglish] = useState(false)
  const [hideGeorgian, setHideGeorgian] = useState(false)
  const tableRef = useRef<HTMLDivElement>(null)
  
  // Use test hook
  const testHook = useTest(words)
  
  // Use selection hook
  const selectionHook = useSelection()
  
  // Use known words hook
  const knownWordsHook = useKnownWords()
  
  // Use view hook
  const viewHook = useView(words)

  useEffect(() => {
    const basePath = import.meta.env.BASE_URL || '/'
    fetch(`${basePath}words.json`)
      .then<TranslateItem[]>(response => response.json())
      .then(data => {
        setWords(data)
        setFilteredWords(data)
        setLoading(false)
      })
      .catch((error: Error) => {
        console.error('Error loading words:', error)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredWords(words)
      return
    }

    const filtered = words.filter(word => {
      const searchLower = searchTerm.toLowerCase()
      return (
        word.english.toLowerCase().includes(searchLower) ||
        word.georgian.toLowerCase().includes(searchLower) ||
        word.pronunciation.toLowerCase().includes(searchLower) ||
        word.eng_example.toLowerCase().includes(searchLower) ||
        word.geo_example.toLowerCase().includes(searchLower)
      )
    })
    setFilteredWords(filtered)
  }, [searchTerm, words])


  const handleToggleEnglish = () => {
    setHideEnglish(!hideEnglish)
    setHideGeorgian(false)
  }
  
  const handleToggleGeorgian = () => {
    setHideGeorgian(!hideGeorgian)
    setHideEnglish(false)
  }

  const handleWordLongPress = (word: TranslateItem) => {
    if (!selectionHook.isSelectionMode) {
      selectionHook.enterSelectionMode()
    }
    selectionHook.toggleWordSelection(word)
  }

  const handleWordClick = (word: TranslateItem) => {
    if (selectionHook.isSelectionMode) {
      selectionHook.toggleWordSelection(word)
    }
  }

  const handleStartTestWithSelection = () => {
    const selectedWords = selectionHook.getSelectedWordsForTest()
    if (selectedWords.length > 0) {
      // Use selected words for test
      testHook.startTestWithWords(selectedWords)
    } else {
      // Use all words for test
      testHook.startTest()
    }
  }

  const handleStartView = () => {
    const selectedWords = selectionHook.getSelectedWordsForTest()
    viewHook.startView(selectedWords.length > 0 ? selectedWords : undefined)
  }

  const scrollToFirstMatch = useCallback(() => {
    if (filteredWords.length > 0 && tableRef.current) {
      setTimeout(() => {
        const firstRow = tableRef.current?.querySelector('tbody tr')
        if (firstRow) {
          firstRow.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 100)
    }
  }, [filteredWords])

  useEffect(() => {
    if (searchTerm.trim() !== '') {
      scrollToFirstMatch()
    }
  }, [searchTerm, scrollToFirstMatch])

  if (loading) {
    return (
      <div className="app">
        <div className="container">
          <div className="loading">{translations.ge.loading}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <div className="container">
        <div className="header-container">
          <h1 className="title">
            {translations.ge.dictionaryTitle} - ({searchTerm && filteredWords.length + ` ${translations.ge.of} `}{words.length} {translations.ge.wordsCount}{knownWordsHook.getKnownWordsCount() > 0 && ` | ✓ ${knownWordsHook.getKnownWordsCount()} ვიცი`})
          </h1>
          <div className="test-controls">
            <Button variant="primary" onClick={handleStartTestWithSelection}>
              🧪 ტესტი
            </Button>
            <Button variant="secondary" onClick={handleStartView}>
              👁️ ნახვა
            </Button>
            {selectionHook.isSelectionMode && (
              <Button 
                variant="danger"
                icon
                onClick={selectionHook.exitSelectionMode}
                title={translations.ge.exitSelectionMode}
              >
                ✕
              </Button>
            )}
          </div>
        </div>
        
        <div className="controls-container">
          <ColumnToggles 
            hideEnglish={hideEnglish}
            hideGeorgian={hideGeorgian}
            onToggleEnglish={handleToggleEnglish}
            onToggleGeorgian={handleToggleGeorgian}
          />
          
          <SearchBar 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>
        
        <WordsTable 
          filteredWords={filteredWords}
          searchTerm={searchTerm}
          hideEnglish={hideEnglish}
          hideGeorgian={hideGeorgian}
          highlightText={highlightText}
          hideText={hideText}
          tableRef={tableRef}
          setSearchTerm={setSearchTerm}
          isSelectionMode={selectionHook.isSelectionMode}
          isWordSelected={selectionHook.isWordSelected}
          onWordLongPress={handleWordLongPress}
          onWordClick={handleWordClick}
          isWordKnown={knownWordsHook.isWordKnown}
          onToggleKnownWord={knownWordsHook.toggleKnownWord}
        />
      </div>

      {/* Test Modals */}
      {testHook.showLanguageModal && (
        <LanguageModal 
          title="ტესტის ენის არჩევა"
          description="რომელ ენაზე გსურთ კითხვების მიღება?"
          onSelectLanguage={testHook.selectTestLanguage}
          onClose={testHook.closeModals}
        />
      )}

      {testHook.showQuestionModal && (
        <QuestionModal 
          currentQuestionIndex={testHook.currentQuestionIndex}
          totalQuestions={testHook.testWords.length}
          testLanguage={testHook.testLanguage}
          currentWord={testHook.testWords[testHook.currentQuestionIndex]}
          currentAnswer={testHook.currentAnswer}
          setCurrentAnswer={testHook.setCurrentAnswer}
          onSubmitAnswer={testHook.submitAnswer}
          onSkipQuestion={testHook.skipQuestion}
          onShowResults={testHook.showCurrentResults}
          onClose={testHook.closeModals}
          hasAnswers={testHook.userAnswers.length > 0}
        />
      )}

      {testHook.showResultsModal && (
        <ResultsModal 
          userAnswers={testHook.userAnswers}
          currentQuestionIndex={testHook.currentQuestionIndex}
          totalQuestions={testHook.testWords.length}
          onBackToTest={testHook.backToTest}
          onRestartTest={testHook.startTest}
          onClose={testHook.closeModals}
        />
      )}

      {/* View Modals */}
      {viewHook.showViewModal && !viewHook.isPlaying && (
        <LanguageModal 
          title="ნახვის რეჟიმის არჩევა"
          description="რომელ ენაზე გსურთ სიტყვების ნახვა?"
          onSelectLanguage={viewHook.startViewWithLanguage}
          onClose={viewHook.closeView}
        />
      )}

      {viewHook.showViewModal && viewHook.isPlaying && (
        <ViewModal 
          currentWord={viewHook.currentWord}
          viewLanguage={viewHook.viewLanguage}
          currentIndex={viewHook.currentViewIndex}
          totalWords={viewHook.totalViewWords}
          currentDelay={viewHook.currentDelay}
          onClose={viewHook.closeView}
        />
      )}
    </div>
  )
}

export default App

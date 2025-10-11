import React from 'react'
import './SearchBar.css'
import { translations } from '../constants'

interface SearchBarProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder={translations.ge.searchPlaceholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      {searchTerm && (
        <button 
          className="clear-search"
          onClick={() => setSearchTerm('')}
          title={translations.ge.clearSearch}
        >
          ✕
        </button>
      )}
    </div>
  )
}

export default SearchBar

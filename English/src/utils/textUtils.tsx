import React from 'react'

// Text highlighting utility
export const highlightText = (text, searchTerm) => {
  if (!searchTerm.trim()) return text
  
  const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  const parts = text.split(regex)
  
  return parts.map((part, index) => {
    if (regex.test(part)) {
      return <mark key={index} className="search-highlight">{part}</mark>
    }
    return part
  })
}

// Text hiding utility
export const hideText = (text) => {
  return '*'.repeat(text.length)
}

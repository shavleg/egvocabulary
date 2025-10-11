import { useState, useEffect } from 'react'

export const useProgressBar = (duration: number, key: number | string) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setProgress(0)
    const startTime = Date.now()
    
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const newProgress = Math.min((elapsed / duration) * 100, 100)
      setProgress(newProgress)
      
      if (newProgress >= 100) {
        clearInterval(interval)
      }
    }, 16) // ~60fps for smooth animation

    return () => clearInterval(interval)
  }, [duration, key])

  return progress
}


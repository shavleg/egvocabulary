import { useState, useEffect } from 'react'

export const useProgressBar = (duration: number, key: number | string, isPaused: boolean) => {
  const [progress, setProgress] = useState(0)
  const [startTime, setStartTime] = useState(Date.now())
  const [pausedTime, setPausedTime] = useState(0)

  useEffect(() => {
    setProgress(0)
    setStartTime(Date.now())
    setPausedTime(0)
  }, [key])

  useEffect(() => {
    if (isPaused) return

    const effectiveStartTime = startTime + pausedTime
    
    const interval = setInterval(() => {
      const elapsed = Date.now() - effectiveStartTime
      const newProgress = Math.min((elapsed / duration) * 100, 100)
      setProgress(newProgress)
      
      if (newProgress >= 100) {
        clearInterval(interval)
      }
    }, 16) // ~60fps for smooth animation

    return () => clearInterval(interval)
  }, [duration, isPaused, startTime, pausedTime])

  // Track pause time
  useEffect(() => {
    if (isPaused) {
      const pauseStart = Date.now()
      return () => {
        setPausedTime(prev => prev + (Date.now() - pauseStart))
      }
    }
  }, [isPaused])

  return progress
}


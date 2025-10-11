import { useState, useEffect } from 'react'
import { PROGRESS_BAR } from '../constants'

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
      const newProgress = Math.min((elapsed / duration) * PROGRESS_BAR.MAX_PROGRESS, PROGRESS_BAR.MAX_PROGRESS)
      setProgress(newProgress)
      
      if (newProgress >= PROGRESS_BAR.MAX_PROGRESS) {
        clearInterval(interval)
      }
    }, PROGRESS_BAR.UPDATE_INTERVAL)

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


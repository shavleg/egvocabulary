// Wake Lock API utility to prevent screen sleep during view mode

let wakeLock: any | null = null

export const requestWakeLock = async (): Promise<boolean> => {
  try {
    if ('wakeLock' in navigator) {
      wakeLock = await navigator.wakeLock.request('screen')
      
      // Listen for wake lock release
      wakeLock.addEventListener('release', () => {
        console.log('Wake Lock released')
      })
      
      console.log('Wake Lock activated')
      return true
    } else {
      console.warn('Wake Lock API not supported')
      return false
    }
  } catch (err) {
    console.error('Failed to acquire Wake Lock:', err)
    return false
  }
}

export const releaseWakeLock = async (): Promise<void> => {
  if (wakeLock) {
    try {
      await wakeLock.release()
      wakeLock = null
      console.log('Wake Lock manually released')
    } catch (err) {
      console.error('Failed to release Wake Lock:', err)
    }
  }
}

// Re-acquire wake lock when page becomes visible again
export const setupWakeLockReacquisition = (callback: () => void) => {
  const handleVisibilityChange = () => {
    if (document.visibilityState === 'visible' && wakeLock !== null) {
      callback()
    }
  }
  
  document.addEventListener('visibilitychange', handleVisibilityChange)
  
  return () => {
    document.removeEventListener('visibilitychange', handleVisibilityChange)
  }
}


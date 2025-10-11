export const useLongPress = (
  onLongPress: () => void,
  onClick: () => void,
  delay: number = 500
) => {
  let timeoutId: number | null = null
  let isLongPressTriggered = false

  const start = () => {
    isLongPressTriggered = false
    timeoutId = setTimeout(() => {
      isLongPressTriggered = true
      onLongPress()
    }, delay)
  }

  const stop = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
  }

  const handleMouseDown = () => {
    start()
  }

  const handleMouseUp = () => {
    stop()
    if (!isLongPressTriggered) {
      onClick()
    }
  }

  const handleMouseLeave = () => {
    stop()
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault()
    start()
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault()
    stop()
    if (!isLongPressTriggered) {
      onClick()
    }
  }

  return {
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
    onMouseLeave: handleMouseLeave,
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd
  }
}

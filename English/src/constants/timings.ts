/**
 * Timing constants used throughout the application
 */

// View mode timings
export const VIEW_TIMINGS = {
  /** Delay for short words/phrases (when both languages < 15 chars) */
  SHORT_WORD_DELAY: 5000,
  
  /** Delay for long words/phrases (when either language >= 15 chars) */
  LONG_WORD_DELAY: 10000,
  
  /** Character threshold for determining short vs long words */
  CHAR_THRESHOLD: 15,
  
  /** Delay before speaking word pronunciation (in ms) */
  SPEECH_DELAY: 1000,
  
  /** Transition animation duration for word changes (in ms) */
  WORD_TRANSITION_DELAY: 200,
} as const

// Progress bar timings
export const PROGRESS_BAR = {
  /** Update interval for smooth animation (~60fps) */
  UPDATE_INTERVAL: 16,
  
  /** Maximum progress value (percentage) */
  MAX_PROGRESS: 100,
} as const

// Default delay for fallback scenarios
export const DEFAULT_DELAY = 5000


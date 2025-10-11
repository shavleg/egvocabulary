export const speakText = (text: string, language: 'en-US' | 'ka-GE' = 'en-US') => {
  if ('speechSynthesis' in window) {
    // Stop any ongoing speech
    speechSynthesis.cancel()
    
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = language
    utterance.rate = 1
    
    // Try to find a female voice for the language
    const voices = speechSynthesis.getVoices()
    
    // First, try to find a female voice for the language
    let preferredVoice = voices.find(voice => 
      voice.lang.startsWith(language.split('-')[0]) && 
      (voice.name.toLowerCase().includes('female') || voice.name.toLowerCase().includes('woman'))
    )
    
    // If no explicitly named female voice, look for common female voice names
    if (!preferredVoice) {
      const femaleVoiceNames = ['samantha', 'victoria', 'karen', 'susan', 'moira', 'tessa', 'fiona', 'zira', 'hazel']
      preferredVoice = voices.find(voice => 
        voice.lang.startsWith(language.split('-')[0]) && 
        femaleVoiceNames.some(name => voice.name.toLowerCase().includes(name))
      )
    }
    
    // If still no female voice found, just pick any voice for the language
    if (!preferredVoice) {
      preferredVoice = voices.find(voice => 
        voice.lang.startsWith(language.split('-')[0])
      )
    }
    
    if (preferredVoice) {
      utterance.voice = preferredVoice
    }
    
    speechSynthesis.speak(utterance)
  } else {
    console.warn('Speech synthesis not supported in this browser')
  }
}

export const stopSpeaking = () => {
  if ('speechSynthesis' in window) {
    speechSynthesis.cancel()
  }
}

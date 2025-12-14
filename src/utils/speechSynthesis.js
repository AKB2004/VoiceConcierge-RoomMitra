/**
 * Speech Synthesis (TTS) - Text to Speech
 * Uses browser's Web Speech API
 */

/**
 * Speak text using browser's speech synthesis
 * 
 * @param {string} text - Text to speak
 * @param {function} onEnd - Callback when speech ends
 * @param {object} options - Voice options (rate, pitch, volume)
 */
export function speak(text, onEnd = null, options = {}) {
  // Check if speech synthesis is supported
  if (!('speechSynthesis' in window)) {
    console.error('Speech synthesis not supported in this browser')
    onEnd && onEnd()
    return
  }

  // Stop any ongoing speech
  window.speechSynthesis.cancel()

  // Create utterance
  const utterance = new SpeechSynthesisUtterance(text)

  // Configuration
  utterance.rate = options.rate || 1.0  // Speed (0.1 to 10)
  utterance.pitch = options.pitch || 1.0  // Pitch (0 to 2)
  utterance.volume = options.volume || 1.0  // Volume (0 to 1)
  utterance.lang = options.lang || 'en-US'

  // Try to use a more natural voice if available
  const voices = window.speechSynthesis.getVoices()
  if (voices.length > 0) {
    // Prefer Google/Microsoft voices for better quality
    const preferredVoice = voices.find(voice => 
      voice.name.includes('Google') || 
      voice.name.includes('Microsoft') ||
      voice.lang.startsWith('en')
    )
    if (preferredVoice) {
      utterance.voice = preferredVoice
    }
  }

  // Event: Speech ended
  utterance.onend = () => {
    onEnd && onEnd()
  }

  // Event: Error occurred
  utterance.onerror = (event) => {
    console.error('Speech synthesis error:', event.error)
    onEnd && onEnd()
  }

  // Speak
  window.speechSynthesis.speak(utterance)
}

/**
 * Stop ongoing speech
 */
export function stopSpeaking() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel()
  }
}

/**
 * Check if speech synthesis is supported
 */
export function isSpeechSynthesisSupported() {
  return 'speechSynthesis' in window
}

/**
 * Get available voices
 */
export function getAvailableVoices() {
  if (!('speechSynthesis' in window)) {
    return []
  }
  return window.speechSynthesis.getVoices()
}

/**
 * Load voices (needed for some browsers)
 * Call this on app initialization
 */
export function loadVoices(callback) {
  if (!('speechSynthesis' in window)) {
    callback && callback([])
    return
  }

  let voices = window.speechSynthesis.getVoices()
  
  if (voices.length > 0) {
    callback && callback(voices)
  } else {
    // Some browsers load voices asynchronously
    window.speechSynthesis.onvoiceschanged = () => {
      voices = window.speechSynthesis.getVoices()
      callback && callback(voices)
    }
  }
}
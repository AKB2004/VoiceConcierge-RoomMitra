
 //Speech Recognition (STT) - Speech to Text


let recognition = null

/**
 * Initialize and start speech recognition
 * 
 * @param {function} onTranscript - Callback for interim results
 * @param {function} onEnd - Callback when speech ends
 * @param {function} onError - Callback for errors
 */
export function startSpeechRecognition(onTranscript, onEnd, onError) {
  // Check if browser supports speech recognition
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    alert('Sorry, your browser does not support speech recognition. Please use Chrome or Edge.')
    onError && onError('Browser not supported')
    return
  }

  // Create recognition instance
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  recognition = new SpeechRecognition()

  // Configuration
  recognition.continuous = false  // Stop after user stops speaking
  recognition.interimResults = true  // Show results while speaking
  recognition.lang = 'en-US'  // Language
  recognition.maxAlternatives = 1

  // Event: Results received
  recognition.onresult = (event) => {
    let interimTranscript = ''
    let finalTranscript = ''

    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript
      if (event.results[i].isFinal) {
        finalTranscript += transcript
      } else {
        interimTranscript += transcript
      }
    }

    // Show interim results
    if (interimTranscript) {
      onTranscript && onTranscript(interimTranscript)
    }

    // When final result is available
    if (finalTranscript) {
      onEnd && onEnd(finalTranscript)
    }
  }

  // Event: Speech recognition ends
  recognition.onend = () => {
    onError && onError('Speech recognition ended')
  }

  // Event: Error occurred
  recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error)
    
    if (event.error === 'no-speech') {
      onTranscript && onTranscript('No speech detected. Please try again.')
    } else if (event.error === 'not-allowed') {
      alert('Microphone access denied. Please allow microphone access in browser settings.')
    } else {
      onTranscript && onTranscript('Error occurred. Please try again.')
    }
    
    onError && onError(event.error)
  }

  // Start recognition
  try {
    recognition.start()
  } catch (error) {
    console.error('Failed to start recognition:', error)
    onError && onError(error)
  }
}

/**
 * Stop speech recognition
 */
export function stopSpeechRecognition() {
  if (recognition) {
    try {
      recognition.stop()
      recognition = null
    } catch (error) {
      console.error('Error stopping recognition:', error)
    }
  }
}

/**
 * Check if speech recognition is supported
 */
export function isSpeechRecognitionSupported() {
  return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window
}
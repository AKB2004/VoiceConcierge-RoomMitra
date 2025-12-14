'use client'

import { useState, useEffect, useRef } from 'react'
import ChatMessage from './ChatMessage'
import MicrophoneButton from './MicrophoneButton'
import { startSpeechRecognition, stopSpeechRecognition } from '@/utils/speechRecognition'
import { speak, stopSpeaking } from '@/utils/speechSynthesis'
import { matchQuery } from '@/utils/queryMatcher'

export default function ChatPage() {
  const [messages, setMessages] = useState([])
  const [transcript, setTranscript] = useState('')
  const [textInput, setTextInput] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [inputMode, setInputMode] = useState('voice')
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleTranscript = (text) => {
    setTranscript(text)
  }

  const handleSpeechEnd = (finalTranscript) => {
    if (!finalTranscript || finalTranscript.trim() === '') return

    //  user message
    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: finalTranscript,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    setMessages(prev => [...prev, userMessage])

    // Get response from query matcher
    const response = matchQuery(finalTranscript)

    // assistant message
    setTimeout(() => {
      const assistantMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        text: response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, assistantMessage])

      // Speak the response
      setIsSpeaking(true)
      speak(response, () => {
        setIsSpeaking(false)
      })
    }, 500)

    setTranscript('')
  }

  const toggleListening = () => {
    if (isListening) {
      stopSpeechRecognition()
      setIsListening(false)
      setTranscript('')
      setInputMode('voice')
    } else {
      // Stop any ongoing speech
      if (isSpeaking) {
        stopSpeaking()
        setIsSpeaking(false)
      }
      
      setIsListening(true)
      setTranscript('Listening...')
      setInputMode('voice')
      startSpeechRecognition(handleTranscript, handleSpeechEnd, () => {
        setIsListening(false)
        setTranscript('')
        setInputMode('voice')
      })
    }
  }

  const handleTextSend = () => {
    const message = textInput.trim()
    
    if (!message) return

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    setMessages(prev => [...prev, userMessage])

    // Clear input
    setTextInput('')

    // Get response from query matcher
    const response = matchQuery(message)

    // Add assistant message
    setTimeout(() => {
      const assistantMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        text: response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, assistantMessage])

      // Speak the response
      setIsSpeaking(true)
      speak(response, () => {
        setIsSpeaking(false)
      })
    }, 500)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleTextSend()
    }
  }

  const handleInputClick = () => {
    setInputMode('text')
    if (isListening) {
      stopSpeechRecognition()
      setIsListening(false)
      setTranscript('')
    }
  }

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-5 relative z-10">
      {/* Header */}
      <div 
        className="flex justify-between items-center p-4 md:p-6 mb-5 rounded-2xl"
        style={{
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(20px)',
          border: '1px solid var(--glass-border)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div className="text-lg md:text-xl font-bold tracking-wide">
          VOICE CONCIERGE
        </div>
        <button
          className="px-5 md:px-6 py-2 md:py-2.5 text-white text-sm md:text-base font-semibold rounded-full transition-all duration-300"
          style={{
            background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
            boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(99, 102, 241, 0.5)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(99, 102, 241, 0.3)'
          }}
        >
          📋 Chat History
        </button>
      </div>

      {/* Chat Container */}
      <div 
        className="flex-1 max-w-6xl w-full mx-auto mb-5 rounded-3xl flex flex-col overflow-hidden"
        style={{
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(30px)',
          border: '1px solid var(--glass-border)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
        }}
      >
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10">
          {messages.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl md:text-8xl mb-8 opacity-40">🎤</div>
              <h3 
                className="text-2xl md:text-3xl font-semibold mb-3"
                style={{
                  background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-tertiary) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Start Conversation
              </h3>
              <p className="text-base md:text-lg" style={{ color: 'var(--text-secondary)' }}>
                Click the microphone button to speak or type your message below
              </p>
            </div>
          ) : (
            <div className="space-y-7">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div 
          className="p-5 md:p-7 flex gap-3 md:gap-4 items-center"
          style={{
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(20px)',
            borderTop: '1px solid var(--glass-border)',
          }}
        >
          {/* Input Field - Shows transcript when listening, text input otherwise */}
          {inputMode === 'voice' && isListening ? (
            <div
              className="flex-1 px-5 md:px-6 py-3 md:py-4 rounded-full flex items-center min-h-14 transition-all duration-300"
              style={{
                background: 'var(--user-msg-bg)',
                border: '1px solid var(--accent-primary)',
                boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.1)',
                color: 'var(--text-primary)',
              }}
            >
              <span className="text-sm md:text-base">{transcript}</span>
            </div>
          ) : (
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              onKeyPress={handleKeyPress}
              onClick={handleInputClick}
              placeholder="Type your message or use voice..."
              className="flex-1 px-5 md:px-6 py-3 md:py-4 rounded-full min-h-14 transition-all duration-300 outline-none"
              style={{
                background: 'var(--assistant-msg-bg)',
                border: '1px solid var(--glass-border)',
                color: 'var(--text-primary)',
              }}
            />
          )}

          {/* Action Buttons */}
          <button
            onClick={handleTextSend}
            disabled={!textInput.trim() || isListening}
            className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-xl md:text-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: textInput.trim() && !isListening ? 'var(--accent-primary)' : 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
            }}
            onMouseEnter={(e) => {
              if (textInput.trim() && !isListening) {
                e.currentTarget.style.transform = 'scale(1.1)'
                e.currentTarget.style.background = 'var(--accent-secondary)'
              }
            }}
            onMouseLeave={(e) => {
              if (textInput.trim() && !isListening) {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.background = 'var(--accent-primary)'
              }
            }}
            title="Send Message"
          >
            ✈️
          </button>

          <MicrophoneButton 
            isListening={isListening} 
            onClick={toggleListening}
            isSpeaking={isSpeaking}
          />
        </div>
      </div>
    </div>
  )
}
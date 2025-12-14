// 'use client'

// import { useState, useEffect, useRef } from 'react'
// import ChatMessage from './ChatMessage'
// import MicrophoneButton from './MicrophoneButton'
// import { startSpeechRecognition, stopSpeechRecognition } from '@/utils/speechRecognition'
// import { speak, stopSpeaking } from '@/utils/speechSynthesis'
// import { matchQuery } from '@/utils/queryMatcher'

// export default function ChatPage() {
//   const [messages, setMessages] = useState([])
//   const [transcript, setTranscript] = useState('')
//   const [textInput, setTextInput] = useState('')
//   const [isListening, setIsListening] = useState(false)
//   const [isSpeaking, setIsSpeaking] = useState(false)
//   const [inputMode, setInputMode] = useState('voice')
//   const messagesEndRef = useRef(null)

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
//   }

//   useEffect(() => {
//     scrollToBottom()
//   }, [messages])

//   const handleTranscript = (text) => setTranscript(text)

//   const handleSpeechEnd = (finalTranscript) => {
//     if (!finalTranscript?.trim()) return

//     const userMessage = {
//       id: Date.now(),
//       type: 'user',
//       text: finalTranscript,
//       timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//     }
//     setMessages(prev => [...prev, userMessage])

//     const response = matchQuery(finalTranscript)

//     setTimeout(() => {
//       const assistantMessage = {
//         id: Date.now() + 1,
//         type: 'assistant',
//         text: response,
//         timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//       }
//       setMessages(prev => [...prev, assistantMessage])

//       setIsSpeaking(true)
//       speak(response, () => setIsSpeaking(false))
//     }, 400)

//     setTranscript('')
//   }

//   const toggleListening = () => {
//     if (isListening) {
//       stopSpeechRecognition()
//       setIsListening(false)
//       setTranscript('')
//     } else {
//       if (isSpeaking) {
//         stopSpeaking()
//         setIsSpeaking(false)
//       }
//       setIsListening(true)
//       setTranscript('Listening...')
//       startSpeechRecognition(handleTranscript, handleSpeechEnd, () => {
//         setIsListening(false)
//         setTranscript('')
//       })
//     }
//   }

//   const handleTextSend = () => {
//     if (!textInput.trim()) return

//     const userMessage = {
//       id: Date.now(),
//       type: 'user',
//       text: textInput.trim(),
//       timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//     }
//     setMessages(prev => [...prev, userMessage])
//     setTextInput('')

//     const response = matchQuery(userMessage.text)

//     setTimeout(() => {
//       const assistantMessage = {
//         id: Date.now() + 1,
//         type: 'assistant',
//         text: response,
//         timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//       }
//       setMessages(prev => [...prev, assistantMessage])

//       setIsSpeaking(true)
//       speak(response, () => setIsSpeaking(false))
//     }, 400)
//   }

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault()
//       handleTextSend()
//     }
//   }

//   const handleInputClick = () => {
//     setInputMode('text')
//     if (isListening) {
//       stopSpeechRecognition()
//       setIsListening(false)
//       setTranscript('')
//     }
//   }

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center px-4">

//       {/* Title */}
//       <div className="text-xl md:text-2xl font-bold tracking-wide mb-24">
//         VOICE CONCIERGE
//       </div>

//       {/* Chat Container */}
//       <div
//         className="flex-1 max-w-5xl w-full mx-auto rounded-2xl flex flex-col overflow-hidden"
//         style={{
//           background: 'var(--glass-bg)',
//           backdropFilter: 'blur(28px)',
//           border: '1px solid var(--glass-border)',
//         }}
//       >

//         {/* Messages */}
//         <div className="flex-1 overflow-y-auto p-8 space-y-4">
//           {messages.length === 0 ? (
//             <div className="text-center px-16 mt-40">
//   <div className="text-8xl mb-6 opacity-40">🎤</div>
//   <h3 className="text-4xl font-semibold mb-2">Start Conversation</h3>
//   <p className="text-xl" style={{ color: 'var(--text-secondary)' }}>
//     Tap the mic or type your message
//   </p>
// </div>

//           ) : (
//             <>
//               {messages.map(msg => (
//                 <ChatMessage key={msg.id} message={msg} />
//               ))}
//               <div ref={messagesEndRef} />
//             </>
//           )}
//         </div>

//         {/* Input Area */}
//         <div
//           className="px-[50px] py-[10px] flex gap-3 items-center"
//           style={{
//             background: 'var(--glass-bg)',
//             backdropFilter: 'blur(20px)',
//             borderTop: '1px solid var(--glass-border)',
//           }}
//         >
//           {inputMode === 'voice' && isListening ? (
//             <div
//               className="flex-1 px-[50px] py-[10px] rounded-full text-sm"
//               style={{
//                 background: 'var(--user-msg-bg)',
//                 border: '1px solid var(--accent-primary)',
//               }}
//             >
//               {transcript}
//             </div>
//           ) : (
//             <input
//               type="text"
//               value={textInput}
//               onChange={(e) => setTextInput(e.target.value)}
//               onKeyPress={handleKeyPress}
//               onClick={handleInputClick}
//               placeholder="Type a message..."
//               className="flex-1 px-[50px] py-[10px] rounded-full text-sm outline-none"
//               style={{
//                 background: 'var(--assistant-msg-bg)',
//                 border: '1px solid var(--glass-border)',
//                 color: 'var(--text-primary)',
//               }}
//             />
//           )}

//           {/* Send Button */}
//           <button
//             onClick={handleTextSend}
//             disabled={!textInput.trim() || isListening}
//             className="w-10 h-10 rounded-full flex items-center justify-center text-lg disabled:opacity-50"
//             style={{
//               background: textInput.trim() ? 'var(--accent-primary)' : 'var(--glass-bg)',
//               border: '1px solid var(--glass-border)',
//             }}
//           >
//             ✈️
//           </button>

//           {/* Mic Button */}
//           <MicrophoneButton
//             isListening={isListening}
//             onClick={toggleListening}
//             isSpeaking={isSpeaking}
//           />
//         </div>
//       </div>
//     </div>
//   )
// }


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
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSpeechEnd = (finalText) => {
    if (!finalText?.trim()) return

    setMessages(prev => [...prev, { id: Date.now(), type: 'user', text: finalText }])

    const response = matchQuery(finalText)

    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now() + 1, type: 'assistant', text: response }])
      setIsSpeaking(true)
      speak(response, () => setIsSpeaking(false))
    }, 400)

    setTranscript('')
  }

  const toggleListening = () => {
    if (isListening) {
      stopSpeechRecognition()
      setIsListening(false)
    } else {
      if (isSpeaking) stopSpeaking()
      setIsListening(true)
      setTranscript('Listening...')
      startSpeechRecognition(setTranscript, handleSpeechEnd, () => {
        setIsListening(false)
        setTranscript('')
      })
    }
  }

  const handleSend = () => {
    if (!textInput.trim()) return

    setMessages(prev => [...prev, { id: Date.now(), type: 'user', text: textInput }])

    const response = matchQuery(textInput)
    setTextInput('')

    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now() + 1, type: 'assistant', text: response }])
      setIsSpeaking(true)
      speak(response, () => setIsSpeaking(false))
    }, 400)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      <style>{`

:root {
  --page-bg: radial-gradient(circle at top right, #1f1f3a, #000);
  --bg-main: rgba(25,25,25,0.95);
  --bg-input: rgba(45,45,45,0.9);
  --text-primary: #ffffff;
  --text-secondary: rgba(255,255,255,0.7);
  --border: rgba(255,255,255,0.12);
  --accent: #6366f1;
}

[data-theme="light"] {
  --page-bg: radial-gradient(circle at top right, #e0e7ff, #ffffff);
  --bg-main: #ffffff;
  --bg-input: #f3f4f6;
  --text-primary: #111827;
  --text-secondary: #6b7280;
  --border: rgba(0,0,0,0.1);
  --accent: #4f46e5;
}

body {
  background: var(--page-bg);
  color: var(--text-primary);
  transition: background 0.3s ease, color 0.3s ease;
}

.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 40px;
  letter-spacing: 1px;
}

.chat-box {
  width: 100%;
  max-width: 900px;
  height: 80vh;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  overflow: hidden;
  background: var(--bg-main);
  border: 1px solid var(--border);
  backdrop-filter: blur(28px);
}

.messages {
  flex: 1;
  overflow-y: auto;
  padding: 32px;
}

.empty-state {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.empty-icon {
  font-size: 80px;
  opacity: 0.4;
  margin-bottom: 24px;
}

.empty-title {
  font-size: 36px;
  font-weight: 600;
}

.empty-text {
  font-size: 18px;
  color: var(--text-secondary);
}

.input-bar {
  display: flex;
  gap: 12px;
  padding: 10px 50px;
  border-top: 1px solid var(--border);
  background: var(--bg-main);
}

.input {
  flex: 1;
  padding: 10px 50px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--bg-input);
  color: var(--text-primary);
  outline: none;
}

.send-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--accent);
  border: none;
  color: #fff;
  cursor: pointer;
}

.send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
      `}</style>

      <div className="page">
        <div className="title">VOICE CONCIERGE</div>

        <div className="chat-box">
          <div className="messages">
            {messages.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🎤</div>
                <div className="empty-title">Start Conversation</div>
                <div className="empty-text">
                  Tap the mic or type your message
                </div>
              </div>
            ) : (
              <>
                {messages.map(msg => (
                  <ChatMessage key={msg.id} message={msg} />
                ))}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          <div className="input-bar">
            <input
              className="input"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
            />

            <button
              className="send-btn"
              onClick={handleSend}
              disabled={!textInput.trim()}
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
    </>
  )
}

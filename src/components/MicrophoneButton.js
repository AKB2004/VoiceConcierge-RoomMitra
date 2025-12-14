'use client'

export default function MicrophoneButton({ isListening, onClick, isSpeaking }) {
  return (
    <button
      onClick={onClick}
      className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-2xl md:text-3xl transition-all duration-300 ${
        isListening ? 'recording' : ''
      }`}
      style={{
        background: isListening 
          ? 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)'
          : 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
        boxShadow: isListening
          ? '0 6px 25px rgba(239, 68, 68, 0.4)'
          : '0 6px 25px rgba(99, 102, 241, 0.4)',
        border: 'none',
        animation: isListening ? 'recordingPulse 1.5s ease-in-out infinite' : 'none',
      }}
      onMouseEnter={(e) => {
        if (!isListening) {
          e.currentTarget.style.transform = 'scale(1.15)'
          e.currentTarget.style.boxShadow = '0 8px 35px rgba(99, 102, 241, 0.6)'
        }
      }}
      onMouseLeave={(e) => {
        if (!isListening) {
          e.currentTarget.style.transform = 'scale(1)'
          e.currentTarget.style.boxShadow = '0 6px 25px rgba(99, 102, 241, 0.4)'
        }
      }}
      title={isListening ? 'Stop Recording' : 'Start Recording'}
      disabled={isSpeaking}
    >
      🎤
    </button>
  )
}
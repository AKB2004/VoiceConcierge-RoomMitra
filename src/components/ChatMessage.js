'use client'

export default function ChatMessage({ message }) {
  const isUser = message.type === 'user'

  return (
    <div 
      className={`flex gap-3 md:gap-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
      style={{ animation: 'messageAppear 0.4s ease-out' }}
    >
      {/* Avatar */}
      <div
        className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-lg md:text-xl flex-shrink-0"
        style={{
          background: isUser ? 'var(--user-msg-bg)' : 'var(--glass-bg)',
          border: `2px solid ${isUser ? 'var(--user-msg-border)' : 'var(--glass-border)'}`,
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        }}
      >
        {isUser ? '👤' : '🤖'}
      </div>

      {/* Message Content */}
      <div className="flex-1 max-w-xl md:max-w-2xl">
        <div
          className={`px-5 md:px-6 py-3 md:py-4 ${
            isUser ? 'rounded-2xl rounded-tr-sm' : 'rounded-2xl rounded-tl-sm'
          }`}
          style={{
            background: isUser ? 'var(--user-msg-bg)' : 'var(--assistant-msg-bg)',
            border: `1px solid ${isUser ? 'var(--user-msg-border)' : 'var(--assistant-msg-border)'}`,
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
            color: 'var(--text-primary)',
          }}
        >
          <p className="text-sm md:text-base leading-relaxed">{message.text}</p>
        </div>
        <div 
          className="text-xs md:text-sm mt-1.5 italic"
          style={{ color: 'var(--text-secondary)' }}
        >
          {isUser ? 'you' : 'assistant'} • {message.timestamp}
        </div>
      </div>
    </div>
  )
}
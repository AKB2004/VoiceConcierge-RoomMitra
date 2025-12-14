'use client'

export default function LandingPage({ onGetStarted }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 md:px-10 relative z-10">
      {/* Logo Title */}
      <h1 
        className="text-3xl md:text-5xl font-bold tracking-wider  mb-16 md:mb-20 uppercase"
        style={{
  marginTop: '-10px',
  background: 'linear-gradient(135deg, var(--text-primary) 0%, var(--accent-secondary) 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}}

      >
        VOICE CONCIERGE
      </h1>

      {/* Robot Container */}
      <div 
        className="w-64 h-64 md:w-80 md:h-80 mb-12 md:mb-14 relative"
        style={{ animation: 'levitate 4s ease-in-out infinite' }}
      >
        <div
          className="w-full h-full rounded-3xl flex items-center justify-center relative overflow-hidden"
          style={{
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(30px)',
            border: '1px solid var(--glass-border)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          }}
        >
          {/* Shine Effect */}
          <div
            className="absolute w-full h-full"
            style={{
              background: 'linear-gradient(45deg, transparent, rgba(99, 102, 241, 0.1), transparent)',
              animation: 'shine 3s linear infinite',
            }}
          />
          
          {/* Robot Emoji */}
          <div 
            className="text-7xl md:text-9xl relative z-10"
            style={{ filter: 'drop-shadow(0 10px 30px rgba(99, 102, 241, 0.4))' }}
          >
            🤖
          </div>

          {/* Robot Label */}
          <div 
            className="absolute bottom-5 left-1/2 transform -translate-x-1/2 text-xs text-center z-20 max-w-48"
            style={{ color: 'var(--text-secondary)' }}
          >
            Your AI Hotel Assistant
          </div>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="text-center mb-12 md:mb-16 max-w-2xl px-4">
        <h2 
          className="text-3xl md:text-5xl font-bold mb-5"
          style={{
            background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-tertiary) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Welcome to Voice Concierge 
        </h2>
        <p 
          className="text-base md:text-lg leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
        >
          Press the microphone button to start speaking. I'm here to help with room service, housekeeping, and hotel information.
        </p>
      </div>

      {/* Get Started Button */}
      <button
        onClick={onGetStarted}
        className="px-16 md:px-16 py-4 md:py-5 text-base md:text-lg font-semibold text-white rounded-full uppercase tracking-wide transition-all duration-400 relative overflow-hidden cursor-pointer"
        style={{
          background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
          boxShadow: '0 10px 40px rgba(99, 102, 241, 0.4)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-5px)'
          e.currentTarget.style.boxShadow = '0 15px 50px rgba(99, 102, 241, 0.6)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = '0 10px 40px rgba(99, 102, 241, 0.4)'
        }}
      >
        <span className="relative z-10">GET STARTED</span>
      </button>
    </div>
  )
}
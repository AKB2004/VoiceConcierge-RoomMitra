'use client'

import { useState } from 'react'
import LandingPage from '@/components/LandingPage'
import ChatPage from '@/components/ChatPage'
import ThemeToggle from '@/components/ThemeToggle'

export default function Home() {
  const [showChat, setShowChat] = useState(false)

  return (
    <>
      <ThemeToggle />
      {!showChat ? (
        <LandingPage onGetStarted={() => setShowChat(true)} />
      ) : (
        <ChatPage />
      )}
    </>
  )
}
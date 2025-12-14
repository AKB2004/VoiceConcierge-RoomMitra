import './globals.css'

export const metadata = {
  title: 'Voice Concierge - Room Mitra',
  description: 'AI-powered hotel voice assistant for seamless guest experience',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
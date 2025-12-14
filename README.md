# 🎤 Voice Concierge - Room Mitra

An AI-powered hotel voice assistant web application built with Next.js, featuring Speech-to-Text (STT) and Text-to-Speech (TTS) capabilities.

## 🌟 Features

- ✅ **Voice Input**: Browser-based speech recognition (STT)
- ✅ **Voice Output**: Natural text-to-speech responses (TTS)
- ✅ **Rule-Based Q&A**: Keyword matching for hotel queries
- ✅ **Chat Interface**: Clean, modern UI with glassmorphism design
- ✅ **Dark/Light Theme**: Toggle between themes
- ✅ **Responsive Design**: Works on mobile and desktop
- ✅ **No Backend Required**: All processing happens in the browser

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- Modern browser (Chrome, Edge recommended for best voice support)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd voice-concierge

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
voice-concierge/
├── src/
│   ├── app/
│   │   ├── page.js              # Main app page
│   │   ├── layout.js            # Root layout
│   │   └── globals.css          # Global styles
│   ├── components/
│   │   ├── LandingPage.js       # Welcome screen
│   │   ├── ChatPage.js          # Chat interface
│   │   ├── ChatMessage.js       # Message bubble component
│   │   ├── MicrophoneButton.js  # Voice input button
│   │   └── ThemeToggle.js       # Theme switcher
│   ├── utils/
│   │   ├── speechRecognition.js # STT logic
│   │   ├── speechSynthesis.js   # TTS logic
│   │   └── queryMatcher.js      # Q&A matching
│   └── data/
│       └── cannedResponses.js   # Predefined responses
├── public/
└── package.json
```

## 🧠 How Query Matching Works

The application uses **keyword-based matching** to respond to user queries:

1. User speaks → STT converts to text
2. Text is normalized (lowercase, trimmed)
3. Query is matched against predefined keywords
4. Best matching response is selected
5. Response is spoken using TTS

### Example:

**User**: "I need some water"
- **Keywords matched**: ['water', 'bottle']
- **Response**: "Sure! Housekeeping will deliver two bottles of drinking water shortly."

### Supported Queries:

- **Room Service**: food, breakfast, menu, order
- **Housekeeping**: clean room, towel, linen
- **WiFi**: wifi, internet, password
- **Facilities**: pool, gym, fitness
- **Hotel Info**: checkout, location, address

## 🧪 Testing Documentation

### Manual Testing Done:

#### 1. Speech Recognition (STT)
- ✅ Microphone button starts/stops recording
- ✅ Real-time transcription displayed
- ✅ Handles "no speech detected" gracefully
- ✅ Browser permission requests work correctly
- ✅ Multiple queries processed correctly

#### 2. Query Matching
- ✅ Exact keyword matches work ("water" → water response)
- ✅ Partial matches work ("I need water please" → matches)
- ✅ Case-insensitive matching ("WIFI" = "wifi")
- ✅ Fallback message for unrecognized queries
- ✅ Multiple keyword variations supported

#### 3. Speech Synthesis (TTS)
- ✅ Responses are spoken clearly
- ✅ Speech can be interrupted
- ✅ Natural voice selection works
- ✅ No conflicts with STT

#### 4. UI/UX
- ✅ Landing page animations smooth
- ✅ Chat messages appear with animation
- ✅ Auto-scroll to latest message
- ✅ Theme toggle works instantly
- ✅ Responsive on mobile/tablet/desktop
- ✅ Glassmorphism effects render properly

#### 5. Browser Compatibility
- ✅ Chrome/Edge: Full support
- ⚠️ Firefox: Limited voice support
- ⚠️ Safari: Requires permissions handling


### Known Issues:

1. **Browser Support**: Speech APIs work best in Chrome/Edge
2. **Voice Quality**: Depends on system's TTS voices
3. **Accent Recognition**: May have difficulty with strong accents
4. **Background Noise**: Can affect recognition accuracy

## 🎨 Design Decisions

- **Glassmorphism Theme**: Modern, premium aesthetic matching hotel brand
- **Black/White Base**: Professional, accessible color scheme
- **Indigo/Purple Accents**: Vibrant, contemporary feel
- **No Backend**: Simplified deployment, faster performance
- **State Management**: React hooks (useState) for conversation history

## 🔮 Future Improvements

1. **Fuzzy Matching**: Implement Levenshtein distance for better query matching
2. **Multi-language Support**: Add support for Hindi, Spanish, etc.
3. **Voice Selection**: Let users choose TTS voice
4. **Conversation Export**: Download chat history as PDF
5. **Context Awareness**: Remember previous queries for better responses
6. **Analytics**: Track most common queries
7. **Admin Dashboard**: Manage responses without code changes
8. **Integration**: Connect to actual hotel systems (PMS, POS)

## 🐛 Troubleshooting

### Microphone Not Working
- Ensure browser has microphone permission
- Check system microphone is working
- Try using Chrome/Edge browsers

### No Voice Output
- Check system volume
- Ensure browser allows audio autoplay
- Try refreshing the page

### Queries Not Matching
- Speak clearly and directly
- Try rephrasing your question
- Check supported queries in cannedResponses.js


## 📄 License

This project is created as an internship assignment for Room Mitra.

## 👨‍💻 Author

Created for Room Mitra SWE Intern Hiring

---

**Note**: This application uses browser APIs for speech recognition and synthesis. Performance may vary across different browsers and devices.
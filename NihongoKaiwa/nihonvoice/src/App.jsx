import { useState, useEffect } from 'react'
import OnboardingModal from './components/OnboardingModal'
import Sidebar from './components/Sidebar'
import ChatWindow from './components/ChatWindow'
import MessageInput from './components/MessageInput'
import SettingsPanel from './components/SettingsPanel'
import { getJapaneseReply } from './utils/openai'

function App() {
  const [user, setUser] = useState(null)
  const [chats, setChats] = useState([])
  const [activeChat, setActiveChat] = useState(0)
  const [messages, setMessages] = useState([])
  const [showSettings, setShowSettings] = useState(false)
  const [settings, setSettings] = useState({
    speed: 1.0,
    kanjiOn: false,
    language: 'English',
    speechMode: 'Both'
  })

  useEffect(() => {
    const saved = localStorage.getItem('nihonvoice_user')
    if (saved) {
      const profile = JSON.parse(saved)
      setUser(profile)
      setSettings(prev => ({ ...prev, language: profile.language }))
    }
  }, [])

  function handleOnboardingComplete(userProfile) {
    setUser(userProfile)
    setSettings(prev => ({ ...prev, language: userProfile.language }))
  }

  function handleNewChat() {
    const newChat = { title: 'New Chat', messages: [] }
    setChats([...chats, newChat])
    setActiveChat(chats.length)
    setMessages([])
  }

  function handleSelectChat(index) {
    setActiveChat(index)
    setMessages(chats[index].messages || [])
  }

  async function handleSend(text) {
    const userMessage = { role: 'user', text }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)

    const thinkingMessage = { role: 'ai', text: 'しょうしょうおまちください... (thinking...)' }
    setMessages([...updatedMessages, thinkingMessage])

    try {
      const reply = await getJapaneseReply(text, settings)
      const aiMessage = { role: 'ai', text: reply }
      setMessages([...updatedMessages, aiMessage])
    } catch (error) {
      console.log('ERROR:', error)
      const errorMessage = { role: 'ai', text: 'すみません！エラーがありました。Please try again.' }
      setMessages([...updatedMessages, errorMessage])
    }
  }

  if (!user) {
    return <OnboardingModal onComplete={handleOnboardingComplete} />
  }

  return (
    <div style={styles.appContainer}>
      <Sidebar
        user={user}
        chats={chats}
        activeChat={activeChat}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        onOpenSettings={() => setShowSettings(true)}
      />
      <div style={styles.mainArea}>
        <div style={styles.topBar}>
          <p style={styles.topBarText}>
            こんにちは {user.name}
            <span style={styles.topBarSub}> What do you want to talk about today?</span>
          </p>
          <div style={styles.topBarRight}>
            <span style={styles.speedLabel}>Audio: {settings.speed}x</span>
            <input
              type="range"
              min="0.25"
              max="1.5"
              step="0.25"
              value={settings.speed}
              onChange={(e) => setSettings({
                ...settings,
                speed: parseFloat(e.target.value)
              })}
              style={{
                accentColor: '#ff0055',
                width: '100px',
                cursor: 'pointer',
                background: 'rgba(255,0,85,0.3)',
                borderRadius: '4px',
                height: '4px',
                outline: 'none',
                border: 'none'
              }}
            />
            <button
              style={styles.settingsBtn}
              onClick={() => setShowSettings(true)}
            >
              Settings
            </button>
          </div>
        </div>
        <ChatWindow messages={messages} />
        <MessageInput onSend={handleSend} />
      </div>
      {showSettings && (
        <SettingsPanel
          settings={settings}
          onSettingsChange={setSettings}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  )
}

const styles = {
  appContainer: {
    display: 'flex',
    height: '100vh',
    backgroundColor: '#03010a',
    color: 'white'
  },
  mainArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  topBar: {
    padding: '14px 20px',
    borderBottom: '1px solid rgba(255,0,85,0.2)',
    backgroundColor: '#080616',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  topBarText: {
    fontSize: '14px',
    color: 'white'
  },
  topBarSub: {
    color: '#888',
    fontSize: '13px'
  },
  topBarRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  speedLabel: {
    fontSize: '13px',
    color: '#00c8ff',
    minWidth: '70px'
  },
  settingsBtn: {
    background: 'none',
    border: '1px solid rgba(255,255,255,0.15)',
    color: '#aaa',
    borderRadius: '8px',
    padding: '6px 12px',
    cursor: 'pointer',
    fontSize: '13px'
  }
}

export default App
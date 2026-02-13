import { useState } from 'react'
import { LandingPage } from './components/LandingPage'
import { StepFlow } from './components/StepFlow'
import { Dashboard } from './components/Dashboard'
import './App.css'

type View = 'landing' | 'flow' | 'dashboard'
type TabId = 'preview' | 'console' | 'step' | 'theme'

function App() {
  const [view, setView] = useState<View>('landing')
  const [tab, setTab] = useState<TabId>('preview')
  const [progressPercent, setProgressPercent] = useState(0)
  const [isThinking, setIsThinking] = useState(false)

  const handleStart = () => {
    setView('flow')
    setTab('preview')
    setProgressPercent(0)
    setIsThinking(false)
  }

  const handleStepSend = (_value: string) => {
    setIsThinking(true)
    setProgressPercent(12)
    const t = setInterval(() => {
      setProgressPercent((p) => {
        if (p >= 90) {
          clearInterval(t)
          return 90
        }
        return p + 15
      })
    }, 400)
    setTimeout(() => {
      clearInterval(t)
      setIsThinking(false)
      setProgressPercent(100)
    }, 2500)
  }

  const handleGoToDashboard = () => {
    setView('dashboard')
    setTab('preview')
    setProgressPercent(100)
    setIsThinking(false)
  }

  if (view === 'landing') {
    return <LandingPage onStart={handleStart} />
  }

  return (
    <div className="app">
      <div className="app-tabs">
        <button
          type="button"
          className={`app-tab ${tab === 'preview' ? 'active' : ''}`}
          onClick={() => setTab('preview')}
        >
          Preview
        </button>
        <button
          type="button"
          className={`app-tab ${tab === 'console' ? 'active' : ''}`}
          onClick={() => setTab('console')}
        >
          Console
        </button>
        <button
          type="button"
          className={`app-tab ${tab === 'step' ? 'active' : ''}`}
          onClick={() => setTab('step')}
        >
          Step
        </button>
        <button
          type="button"
          className={`app-tab ${tab === 'theme' ? 'active' : ''}`}
          onClick={() => setTab('theme')}
        >
          Theme
        </button>
      </div>

      {tab === 'preview' && view === 'flow' && (
        <StepFlow
          progressPercent={progressPercent}
          isThinking={isThinking}
          onSend={handleStepSend}
          onGoToDashboard={handleGoToDashboard}
        />
      )}

      {tab === 'preview' && view === 'dashboard' && (
        <Dashboard />
      )}

      {tab === 'console' && (
        <div className="app-placeholder">Console output will appear here.</div>
      )}

      {tab === 'step' && (
        <div className="app-placeholder">Step-by-step breakdown will appear here.</div>
      )}

      {tab === 'theme' && (
        <div className="app-placeholder">Theme settings will appear here.</div>
      )}
    </div>
  )
}

export default App

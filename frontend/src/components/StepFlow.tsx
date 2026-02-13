import { useState } from 'react'
import './StepFlow.css'

const STEP_PROMPTS = [
  'Upload a reference image or sketch.',
  'Specify the manufacturing agent type.',
  'Provide precise measurements and dimensions.',
  'Upload a CAD diagram or detailed sketch.',
]

interface StepFlowProps {
  progressPercent: number
  isThinking: boolean
  onSend: (value: string) => void
  onGoToDashboard: () => void
}

export function StepFlow({
  progressPercent,
  isThinking,
  onSend,
  onGoToDashboard,
}: StepFlowProps) {
  const [step, setStep] = useState(0)
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const v = inputValue.trim()
    if (v) {
      onSend(v)
      setInputValue('')
      if (step < STEP_PROMPTS.length - 1) setStep((s) => s + 1)
      else onGoToDashboard()
    }
  }

  return (
    <div className="step-flow">
      <div className="step-flow-header">
        <button type="button" className="icon-btn" aria-label="Menu">☰</button>
        <button
          type="button"
          className="step-flow-dashboard-link"
          onClick={onGoToDashboard}
        >
          Open dashboard
        </button>
        <div className="step-flow-progress">
          <div className="step-flow-progress-track">
            <div
              className="step-flow-progress-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
        <button type="button" className="icon-btn" aria-label="Refresh">↻</button>
      </div>

      <div className="step-flow-main">
        {isThinking ? (
          <div className="step-thinking">
            <div className="step-thinking-blob" />
            <h2 className="step-thinking-title">Thinking...</h2>
            <p className="step-thinking-progress">
              Front Agent Intent Design And Manufacturing Intelligence: {progressPercent}%
            </p>
          </div>
        ) : (
          <p className="step-prompt">{STEP_PROMPTS[step]}</p>
        )}
      </div>

      <div className="step-flow-input-wrap">
        <form onSubmit={handleSubmit} className="step-flow-input-bar">
          <button type="button" className="step-flow-attach" aria-label="Upload">
            +
          </button>
          <input
            type="text"
            className="step-flow-input"
            placeholder="Type or upload your response."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="button" className="step-flow-mic" aria-label="Voice">
            🎤
          </button>
          <button type="submit" className="step-flow-send" aria-label="Send">
            ➤
          </button>
        </form>
        <p className="step-flow-disclaimer">Opal can make mistakes, so double-check it</p>
      </div>
    </div>
  )
}

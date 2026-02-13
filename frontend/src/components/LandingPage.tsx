import './LandingPage.css'

interface LandingPageProps {
  onStart: () => void
}

export function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="landing">
      <div className="landing-header">
        <button type="button" className="icon-btn" aria-label="Menu">☰</button>
        <div className="landing-progress">
          <div className="landing-progress-track">
            <div className="landing-progress-fill" style={{ width: '0%' }} />
          </div>
        </div>
        <button type="button" className="icon-btn" aria-label="Refresh">↻</button>
      </div>

      <div className="landing-graphic">
        <div className="landing-graphic-inner">
          <div className="landing-scene">
            <div className="scene-block" />
            <div className="scene-arm scene-arm-1" />
            <div className="scene-arm scene-arm-2" />
            <div className="scene-arm scene-arm-3" />
            <div className="scene-wood" />
            <div className="scene-metal" />
            <div className="scene-gold" />
            <div className="scene-lines" />
          </div>
        </div>
      </div>

      <div className="landing-content">
        <h1 className="landing-title">Panchakarma Agent</h1>
        <p className="landing-desc">
          Automate manufacturing with AI agents: stone, wood, metal, tools, and gold.
        </p>
        <button type="button" className="landing-start" onClick={onStart}>
          <span className="landing-start-icon">★</span>
          Start
        </button>
      </div>
    </div>
  )
}

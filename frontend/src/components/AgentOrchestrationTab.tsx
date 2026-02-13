import { useState } from 'react'
import {
  parseIntent,
  runDomainAgent,
  listAgents,
  type ManufacturingIntent,
  type DomainAgentId,
  type AgentInfo,
} from '../api/client'
import { useEffect } from 'react'

const DOMAIN_LABELS: Record<DomainAgentId, string> = {
  stone_sculpture: 'Stone Sculpture',
  wood_carpenter: 'Wood / Carpenter',
  metallic_craft: 'Metallic Craft',
  tool_maker: 'Tool Maker',
  gold_crafting: 'Gold Crafting',
}

export function AgentOrchestrationTab() {
  const [text, setText] = useState('')
  const [locale, setLocale] = useState('en')
  const [intent, setIntent] = useState<ManufacturingIntent | null>(null)
  const [agentResult, setAgentResult] = useState<{ message: string; outputs: Record<string, unknown> } | null>(null)
  const [loadingIntent, setLoadingIntent] = useState(false)
  const [loadingAgent, setLoadingAgent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [agents, setAgents] = useState<AgentInfo[]>([])

  useEffect(() => {
    listAgents().then((r) => setAgents(r.agents)).catch(() => {})
  }, [])

  async function handleParseIntent(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setIntent(null)
    setAgentResult(null)
    if (!text.trim()) {
      setError('Enter a description or request')
      return
    }
    setLoadingIntent(true)
    try {
      const parsed = await parseIntent({ text: text.trim(), locale })
      setIntent(parsed)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Parse failed')
    } finally {
      setLoadingIntent(false)
    }
  }

  async function handleRunAgent() {
    if (!intent) return
    setError(null)
    setAgentResult(null)
    setLoadingAgent(true)
    try {
      const res = await runDomainAgent({ intent })
      setAgentResult({ message: res.message, outputs: res.outputs })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Agent failed')
    } finally {
      setLoadingAgent(false)
    }
  }

  return (
    <div>
      <div className="card">
        <h2>Front Agent – Intent &amp; Design</h2>
        <p style={{ color: 'var(--textMuted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
          Describe your manufacturing or design request in any language. The system will infer the domain and structured intent.
        </p>
        <form onSubmit={handleParseIntent}>
          <label className="label">Description (text / multilingual)</label>
          <textarea
            className="input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="e.g. I need a small wooden side table with dovetail joints, 50cm height. Or: Marble statue of a deity, 2 feet tall."
            rows={3}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.75rem' }}>
            <div>
              <label className="label">Locale</label>
              <select
                className="input localeSelect"
                value={locale}
                onChange={(e) => setLocale(e.target.value)}
              >
                <option value="en">English</option>
                <option value="hi">हिन्दी</option>
                <option value="ta">தமிழ்</option>
                <option value="te">తెలుగు</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
              </select>
            </div>
            <button type="submit" className="btn btnPrimary" style={{ marginTop: '1.5rem' }} disabled={loadingIntent}>
              {loadingIntent ? 'Parsing…' : 'Parse intent'}
            </button>
          </div>
        </form>
        {error && <p className="error">{error}</p>}
      </div>

      {intent && (
        <div className="card">
          <h2>Structured intent</h2>
          <p>
            <span className="domainBadge">{DOMAIN_LABELS[intent.domain] ?? intent.domain}</span>
            <span style={{ marginLeft: '0.5rem', color: 'var(--textMuted)', fontSize: '0.9rem' }}>
              {intent.measurement_unit} · {intent.raw_input_type}
            </span>
          </p>
          <p style={{ marginTop: '0.5rem' }}>{intent.description}</p>
          <button
            className="btn btnPrimary"
            style={{ marginTop: '0.75rem' }}
            onClick={handleRunAgent}
            disabled={loadingAgent}
          >
            {loadingAgent ? 'Running agent…' : `Run ${DOMAIN_LABELS[intent.domain] ?? intent.domain} agent`}
          </button>
        </div>
      )}

      {agentResult && (
        <div className="card">
          <h2>Domain agent output</h2>
          <p className="success">{agentResult.message}</p>
          <label className="label">Outputs</label>
          <pre className="outputsPre">{JSON.stringify(agentResult.outputs, null, 2)}</pre>
        </div>
      )}

      {agents.length > 0 && (
        <div className="card">
          <h2>Domain agents</h2>
          <ul style={{ margin: 0, paddingLeft: '1.25rem', color: 'var(--textMuted)', fontSize: '0.9rem' }}>
            {agents.map((a) => (
              <li key={a.id}>{a.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

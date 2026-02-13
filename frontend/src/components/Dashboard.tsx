import { useState } from 'react'
import './Dashboard.css'

const AGENT_OPTIONS = [
  'Stone Sculpture Agent',
  'Wood / Carpenter Agent',
  'Metallic Craft Agent',
  'Tool Maker Agent',
  'Gold Crafting Agent',
]

interface DashboardProps {
  onBack?: () => void
}

export function Dashboard({ onBack: _onBack }: DashboardProps) {
  const [agentType, setAgentType] = useState(AGENT_OPTIONS[0])

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="dashboard-logo">
          <div className="dashboard-logo-icon">▣</div>
          <div>
            <div className="dashboard-logo-text">OpalAI Manufacturing Dashboard</div>
            <div className="dashboard-subtitle">PRECISION SYSTEMS • MULTI-AGENT FABRICATION</div>
          </div>
        </div>
        <div className="dashboard-status">
          <span className="dashboard-status-dot" />
          <span>SYSTEM STATUS</span>
          <span>Operational</span>
        </div>
      </header>

      <div className="dashboard-grid">
        <div className="dashboard-panel">
          <div className="dashboard-agent-type">
            <div className="dashboard-agent-type-label">AGENT TYPE</div>
            <select
              className="dashboard-agent-select"
              value={agentType}
              onChange={(e) => setAgentType(e.target.value)}
              aria-label="Manufacturing agent type"
            >
              {AGENT_OPTIONS.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>
          <div className="dashboard-panel-header">
            3D DESIGN PROTOTYPE & RECONSTRUCTION
            <span className="dashboard-live-badge">LIVE PREVIEW</span>
          </div>
          <div className="dashboard-3d-area">
            <div className="dashboard-3d-wireframe">
              <span className="dashboard-3d-dims h">450 mm</span>
              <span className="dashboard-3d-dims w">310 mm</span>
              <span className="dashboard-3d-dims d">220 mm</span>
            </div>
            <button type="button" className="dashboard-3d-zoom" aria-label="Zoom">🔍</button>
          </div>
        </div>

        <div className="dashboard-panel">
          <div className="dashboard-panel-header">INPUT DESCRIPTION</div>
          <div className="dashboard-input-desc">
            <div className="dashboard-input-desc-row">
              <span className="dashboard-input-desc-label">Subject:</span>
              <span>Classical human bust</span>
            </div>
            <div className="dashboard-input-desc-row">
              <span className="dashboard-input-desc-label">Material:</span>
              <span>White Marble</span>
            </div>
            <div className="dashboard-input-desc-row">
              <span className="dashboard-input-desc-label">Dims:</span>
              <span>450×280×220 mm</span>
            </div>
            <div className="dashboard-input-desc-row">
              <span className="dashboard-input-desc-label">Finish:</span>
              <span>Fine Polish (Ra &lt; 0.1 µm)</span>
            </div>
          </div>
          <div className="dashboard-panel-header">G-CODE & ROBOTIC SCRIPTS</div>
          <div className="dashboard-gcode-header">
            <div className="dashboard-gcode-dots">
              <span className="dashboard-gcode-dot r" />
              <span className="dashboard-gcode-dot y" />
              <span className="dashboard-gcode-dot g" />
            </div>
            <span className="dashboard-gcode-filename">WHITE_MARBLE_BUST.NC</span>
          </div>
          <pre className="dashboard-gcode-body">
            <span className="c">// 5-AXIS CNC ROUGHING/FINISHING</span>{'\n'}
            <span className="c">(WHITE MARBLE BUST CARVING)</span>{'\n'}
            <span className="c">(Tool 1: Ø25mm Diamond Ball Nose)</span>{'\n'}
            <span className="c">(ROUGHING PASS START)</span>{'\n'}
            <span className="g">G21 G90</span> <span className="c">(Metric, Absolute)</span>{'\n'}
            <span className="g">M06 T1</span>{'\n'}
            <span className="g">S8000 M03</span>{'\n'}
            <span className="g">G00 X0 Y0 Z100.0</span>{'\n'}
            <span className="g">S18000 F200</span>{'\n'}
            ...{'\n'}
            <span className="c">(Tool 3: Ø3mm Diamond Tapered)</span>{'\n'}
            <span className="c">(FINE FINISHING)</span>{'\n'}
            <span className="g">S24000 F80</span>{'\n'}
            ...{'\n'}
            <span className="c">(Tool 4: Ø1.5mm Diamond Burr)</span>{'\n'}
            <span className="c">(ULTRA-DETAIL EYES/NOSE)</span>
          </pre>
        </div>
      </div>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <div className="dashboard-card-title">PURPOSE-DRIVEN DESIGN & ANALYSIS</div>
          <div className="dashboard-card-body">
            Integrates objective (Prayojan) with deep engineering understanding. Every curve and toolpath is dictated by intended function and aesthetic fidelity. Rigorous evaluation of White Marble properties (Mohs 3–4, brittle fracture) against high-precision tolerances.
          </div>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card-title">KPI BENCHMARKS</div>
          <div className="dashboard-kpi-row">
            <span>Dimensional Tolerance</span>
            <span className="dashboard-kpi-value">±0.2 mm</span>
          </div>
          <div className="dashboard-kpi-row">
            <span>Minimum Detail Radius</span>
            <span className="dashboard-kpi-value">1.5 mm</span>
          </div>
          <div className="dashboard-kpi-row">
            <span>Target Finish</span>
            <span className="dashboard-kpi-value">Ra &lt; 0.1 µm</span>
          </div>
          <div className="dashboard-kpi-row">
            <span>Material Hardness</span>
            <span className="dashboard-kpi-value">3–4 Mohs</span>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card-title">SIMULATION VALIDATION</div>
          <div className="dashboard-sim-header">
            <span className="dashboard-sim-passed">PASSED</span>
          </div>
          <div className="dashboard-sim-metrics">
            <div className="dashboard-sim-metric">CNC EFFICIENCY <span>73.07%</span></div>
            <div className="dashboard-sim-metric">ROBOT EFFICIENCY <span>79.37%</span></div>
            <div className="dashboard-sim-metric">EST. TIME <span>6.07 hrs</span></div>
            <div className="dashboard-sim-metric">TOTAL COST <span>$1,062.77</span></div>
          </div>
          <div className="dashboard-sim-check">
            <span className="icon">✓</span>
            Swept volume, safety boundaries, and kinematic constraints verified.
          </div>
          <div className="dashboard-sim-check">
            <span className="icon info">ℹ</span>
            Toolpath is safe, efficient, and meets quality specifications for production.
          </div>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card-title">MATERIAL MODEL: WHITE MARBLE</div>
          <div className="dashboard-card-body">
            <strong>Mechanical:</strong> High compressive strength (70–120 MPa), brittle fracture. Requires precise abrasive force control.<br />
            <strong>Thermal:</strong> Low expansion. Continuous flood cooling (M08) mandated to prevent thermal shock.<br />
            <strong>Processing:</strong> Multi-stage abrasive extraction. Diamond burrs for fine detail to avoid grain tear-out.<br />
            <strong>Refinement:</strong> Specify geologic origin for veining; verify ±0.1 mm tolerance for orbital areas; surface Ra &lt; 0.1 µm.
          </div>
        </div>

        <div className="dashboard-card dashboard-card-full">
          <div className="dashboard-card-title">FINANCIAL BREAKDOWN</div>
          <div className="dashboard-fin-row">
            <span>Material</span>
            <span>$500.00</span>
          </div>
          <div className="dashboard-fin-row">
            <span>Labor</span>
            <span>$265.51</span>
          </div>
          <div className="dashboard-fin-row">
            <span>Machine Op</span>
            <span>$136.21</span>
          </div>
          <div className="dashboard-fin-row">
            <span>Consumables</span>
            <span>$59.00</span>
          </div>
          <div className="dashboard-fin-row dashboard-fin-total">
            <span>TOTAL</span>
            <span>$1,062.77</span>
          </div>
          <div className="dashboard-fin-note">Includes 1.1× general overhead factor.</div>
        </div>
      </div>
    </div>
  )
}

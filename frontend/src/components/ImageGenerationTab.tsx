import { useState } from 'react'
import { generateImage } from '../api/client'

export function ImageGenerationTab() {
  const [prompt, setPrompt] = useState('')
  const [styleHint, setStyleHint] = useState('')
  const [count, setCount] = useState(1)
  const [aspectRatio, setAspectRatio] = useState('1:1')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [images, setImages] = useState<string[]>([])
  const [promptUsed, setPromptUsed] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setImages([])
    if (!prompt.trim()) {
      setError('Enter a prompt')
      return
    }
    setLoading(true)
    try {
      const res = await generateImage({
        prompt: prompt.trim(),
        number_of_images: count,
        aspect_ratio: aspectRatio,
        style_hint: styleHint.trim() || undefined,
      })
      setImages(res.images_base64)
      setPromptUsed(res.prompt_used)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Generation failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card">
      <h2>Gemini Imagen – Image Generation</h2>
      <p style={{ color: 'var(--textMuted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
        Generate reference images for manufacturing and design (stone, wood, metal, jewelry, tools).
      </p>
      <form onSubmit={handleSubmit}>
        <label className="label">Prompt</label>
        <textarea
          className="input"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g. A marble sculpture of a seated figure, classical proportions, rough stone texture"
          rows={3}
        />
        <label className="label" style={{ marginTop: '0.75rem' }}>Style hint (optional)</label>
        <input
          type="text"
          className="input"
          value={styleHint}
          onChange={(e) => setStyleHint(e.target.value)}
          placeholder="e.g. photorealistic, technical drawing"
        />
        <div className="grid2" style={{ marginTop: '0.75rem' }}>
          <div>
            <label className="label">Number of images (1–4)</label>
            <input
              type="number"
              min={1}
              max={4}
              className="input"
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
            />
          </div>
          <div>
            <label className="label">Aspect ratio</label>
            <select
              className="input"
              value={aspectRatio}
              onChange={(e) => setAspectRatio(e.target.value)}
            >
              <option value="1:1">1:1</option>
              <option value="3:4">3:4</option>
              <option value="4:3">4:3</option>
              <option value="9:16">9:16</option>
              <option value="16:9">16:9</option>
            </select>
          </div>
        </div>
        <button type="submit" className="btn btnPrimary" style={{ marginTop: '1rem' }} disabled={loading}>
          {loading ? 'Generating…' : 'Generate images'}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      {promptUsed && images.length > 0 && (
        <p className="success" style={{ marginTop: '0.5rem' }}>
          Used prompt: {promptUsed}
        </p>
      )}
      {images.length > 0 && (
        <div className="imageGrid">
          {images.map((b64, i) => (
            <img key={i} src={`data:image/png;base64,${b64}`} alt={`Generated ${i + 1}`} />
          ))}
        </div>
      )}
    </div>
  )
}

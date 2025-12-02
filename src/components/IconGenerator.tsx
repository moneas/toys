import { useState } from 'react'
import { STYLE_PRESETS } from '../config/styles'
import { IconGeneratorService } from '../services/iconGenerator'
import { GeneratedIcon } from '../types'
import { validatePrompt, validateColors, isValidHexColor } from '../utils/validation'
import './IconGenerator.css'

function IconGenerator() {
  const [prompt, setPrompt] = useState('')
  const [selectedStyle, setSelectedStyle] = useState(1)
  const [colors, setColors] = useState<string[]>([''])
  const [icons, setIcons] = useState<GeneratedIcon[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleColorChange = (index: number, value: string) => {
    const newColors = [...colors]
    newColors[index] = value
    setColors(newColors)
  }

  const addColorInput = () => {
    setColors([...colors, ''])
  }

  const removeColorInput = (index: number) => {
    if (colors.length > 1) {
      const newColors = colors.filter((_, i) => i !== index)
      setColors(newColors)
    }
  }

  const handleGenerate = async () => {
    const promptValidation = validatePrompt(prompt)
    if (!promptValidation.valid) {
      setError(promptValidation.error || 'Invalid prompt')
      return
    }

    const colorValidation = validateColors(colors)
    if (!colorValidation.valid) {
      setError(colorValidation.error || 'Invalid colors')
      return
    }

    setLoading(true)
    setError(null)
    setIcons([])

    try {
      const validColors = colors
        .map(c => c.trim())
        .filter(c => c && isValidHexColor(c))

      const generatedIcons = await IconGeneratorService.generateIconSet(
        prompt,
        selectedStyle,
        validColors.length > 0 ? validColors : undefined
      )

      setIcons(generatedIcons)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate icons')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = async (icon: GeneratedIcon, index: number) => {
    try {
      const response = await fetch(icon.url)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `icon-${index + 1}-${Date.now()}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (err) {
      setError('Failed to download icon')
    }
  }

  return (
    <div className="icon-generator">
      <header className="header">
        <h1>Icon Set Generator</h1>
        <p>Generate a consistent set of 4 icons from a single prompt</p>
      </header>

      <div className="form-container">
        <div className="form-group">
          <label htmlFor="prompt">Prompt for Icon Set</label>
          <input
            id="prompt"
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., Toys"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="style">Preset Style</label>
          <select
            id="style"
            value={selectedStyle}
            onChange={(e) => setSelectedStyle(Number(e.target.value))}
            disabled={loading}
          >
            {STYLE_PRESETS.map(style => (
              <option key={style.id} value={style.id}>
                {style.name} - {style.description}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>
            Brand Colors (Optional - HEX format)
            <button
              type="button"
              onClick={addColorInput}
              className="add-color-btn"
              disabled={loading}
            >
              + Add Color
            </button>
          </label>
          <div className="color-inputs">
            {colors.map((color, index) => (
              <div key={index} className="color-input-group">
                <input
                  type="text"
                  value={color}
                  onChange={(e) => handleColorChange(index, e.target.value)}
                  placeholder="#FF5733"
                  pattern="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
                  disabled={loading}
                />
                {colors.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeColorInput(index)}
                    className="remove-color-btn"
                    disabled={loading}
                  >
                    ×
                  </button>
                )}
                {color && !isValidHexColor(color) && (
                  <span className="color-error">Invalid HEX color</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading || !prompt.trim()}
          className="generate-btn"
        >
          {loading ? 'Generating Icons...' : 'Generate Icon Set'}
        </button>

        {error && <div className="error-message">{error}</div>}
      </div>

      {icons.length > 0 && (
        <div className="icons-grid">
          <h2>Generated Icons</h2>
          <div className="grid">
            {icons.map((icon, index) => (
              <div key={icon.id} className="icon-card">
                <img src={icon.url} alt={`Icon ${index + 1}`} />
                <button
                  onClick={() => handleDownload(icon, index)}
                  className="download-btn"
                >
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>Generating your icons... This may take a minute.</p>
        </div>
      )}
    </div>
  )
}

export default IconGenerator


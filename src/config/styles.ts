import { StylePreset } from '../types'

export const STYLE_PRESETS: StylePreset[] = [
  {
    id: 1,
    name: 'Pastels',
    description: 'Soft, muted pastel colors with gentle gradients',
    promptSuffix: ', pastel colors, soft gradients, gentle tones, light and airy, minimalist style'
  },
  {
    id: 2,
    name: 'Bubbles',
    description: 'Playful bubble-like shapes with vibrant colors',
    promptSuffix: ', bubble style, rounded shapes, vibrant colors, playful, glossy finish'
  },
  {
    id: 3,
    name: 'Geometric',
    description: 'Clean geometric shapes with bold lines',
    promptSuffix: ', geometric style, clean lines, bold shapes, modern, minimalist design'
  },
  {
    id: 4,
    name: 'Watercolor',
    description: 'Soft watercolor effects with flowing colors',
    promptSuffix: ', watercolor style, soft brush strokes, flowing colors, artistic, hand-painted look'
  },
  {
    id: 5,
    name: 'Neon',
    description: 'Bright neon colors with glowing effects',
    promptSuffix: ', neon style, bright glowing colors, cyberpunk aesthetic, vibrant, electric'
  }
]

export const REPLICATE_MODEL = 'black-forest-labs/flux-schnell'
export const REPLICATE_MODEL_VERSION = 'latest'


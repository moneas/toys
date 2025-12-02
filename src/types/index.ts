export interface StylePreset {
  id: number
  name: string
  description: string
  promptSuffix: string
}

export interface IconGenerationRequest {
  prompt: string
  styleId: number
  colors?: string[]
}

export interface GeneratedIcon {
  id: string
  url: string
  prompt: string
}


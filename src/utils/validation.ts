export const isValidHexColor = (color: string): boolean => {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color)
}

export const validatePrompt = (prompt: string): { valid: boolean; error?: string } => {
  if (!prompt || prompt.trim().length === 0) {
    return { valid: false, error: 'Prompt cannot be empty' }
  }
  if (prompt.trim().length < 2) {
    return { valid: false, error: 'Prompt must be at least 2 characters' }
  }
  if (prompt.trim().length > 200) {
    return { valid: false, error: 'Prompt must be less than 200 characters' }
  }
  return { valid: true }
}

export const validateColors = (colors: string[]): { valid: boolean; error?: string } => {
  const invalidColors = colors.filter(c => c.trim() && !isValidHexColor(c.trim()))
  if (invalidColors.length > 0) {
    return { valid: false, error: 'All colors must be valid HEX format (e.g., #FF5733)' }
  }
  return { valid: true }
}


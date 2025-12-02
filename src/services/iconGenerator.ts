import { ReplicateService } from './replicateService'
import { STYLE_PRESETS } from '../config/styles'
import { GeneratedIcon } from '../types'

export class IconGeneratorService {
  static async generateIconSet(
    basePrompt: string,
    styleId: number,
    colors?: string[]
  ): Promise<GeneratedIcon[]> {
    const style = STYLE_PRESETS.find(s => s.id === styleId)
    if (!style) {
      throw new Error(`Style with id ${styleId} not found`)
    }

    const colorPrompt = colors && colors.length > 0
      ? `, using colors: ${colors.join(', ')}`
      : ''

    const baseStylePrompt = `${basePrompt}${style.promptSuffix}${colorPrompt}, icon design, 512x512, simple and clear`

    const iconPrompts = [
      `${baseStylePrompt}, first variation`,
      `${baseStylePrompt}, second variation`,
      `${baseStylePrompt}, third variation`,
      `${baseStylePrompt}, fourth variation`
    ]

    const generationPromises = iconPrompts.map(async (prompt, index) => {
      try {
        const url = await ReplicateService.generateImage(prompt)
        return {
          id: `icon-${Date.now()}-${index}`,
          url,
          prompt
        } as GeneratedIcon
      } catch (error) {
        throw new Error(`Failed to generate icon ${index + 1}: ${error instanceof Error ? error.message : 'Unknown error'}`)
      }
    })

    return Promise.all(generationPromises)
  }
}


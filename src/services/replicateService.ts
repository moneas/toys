import axios from 'axios'

interface ReplicateResponse {
  output: string[]
  status: string
  error?: string
}

export class ReplicateService {
  private static readonly API_URL = import.meta.env.VITE_API_URL || '/api'
  private static readonly POLL_INTERVAL = 1000
  private static readonly MAX_POLL_ATTEMPTS = 60

  static async createPrediction(prompt: string, aspectRatio: string = '1:1'): Promise<string> {
    try {
      const response = await axios.post(
        `${this.API_URL}/predictions`,
        {
          prompt,
          aspectRatio
        }
      )

      return response.data.id
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorDetail = error.response?.data?.error || error.response?.data?.detail || error.message
        throw new Error(`Failed to create prediction: ${errorDetail}`)
      }
      throw error
    }
  }

  static async getPrediction(predictionId: string): Promise<ReplicateResponse> {
    try {
      const response = await axios.get(
        `${this.API_URL}/predictions/${predictionId}`
      )

      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Failed to get prediction: ${error.response?.data?.error || error.response?.data?.detail || error.message}`)
      }
      throw error
    }
  }

  static async waitForCompletion(predictionId: string): Promise<string[]> {
    let attempts = 0

    while (attempts < this.MAX_POLL_ATTEMPTS) {
      const prediction = await this.getPrediction(predictionId)

      if (prediction.status === 'succeeded') {
        return Array.isArray(prediction.output) ? prediction.output : [prediction.output]
      }

      if (prediction.status === 'failed' || prediction.status === 'canceled') {
        throw new Error(`Prediction ${prediction.status}: ${prediction.error || 'Unknown error'}`)
      }

      await new Promise(resolve => setTimeout(resolve, this.POLL_INTERVAL))
      attempts++
    }

    throw new Error('Prediction timeout: exceeded maximum polling attempts')
  }

  static async generateImage(prompt: string): Promise<string> {
    const predictionId = await this.createPrediction(prompt)
    const outputs = await this.waitForCompletion(predictionId)
    return outputs[0]
  }
}

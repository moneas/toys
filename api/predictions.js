import axios from 'axios'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN.trim()
  const REPLICATE_API_URL = 'https://api.replicate.com/v1'

  if (!REPLICATE_API_TOKEN || REPLICATE_API_TOKEN === '') {
    return res.status(500).json({ 
      error: 'REPLICATE_API_TOKEN not configured. Please set it in Vercel Environment Variables or get a new token from https://replicate.com/account/api-tokens'
    })
  }

  if (req.method === 'POST') {
    try {
      const { prompt, aspectRatio = '1:1' } = req.body

      if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' })
      }

      const modelResponse = await axios.get(
        `${REPLICATE_API_URL}/models/black-forest-labs/flux-schnell`,
        {
          headers: {
            'Authorization': `Bearer ${REPLICATE_API_TOKEN.trim()}`,
            'Content-Type': 'application/json'
          }
        }
      )

      const version = modelResponse.data.latest_version?.id || 'latest'

      const predictionResponse = await axios.post(
        `${REPLICATE_API_URL}/predictions`,
        {
          version: version,
          input: {
            prompt,
            aspect_ratio: aspectRatio,
            output_format: 'png',
            output_quality: 90
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${REPLICATE_API_TOKEN.trim()}`,
            'Content-Type': 'application/json'
          }
        }
      )

      return res.json(predictionResponse.data)
    } catch (error) {
      console.error('Error creating prediction:', error.response?.data || error.message)
      return res.status(500).json({
        error: error.response?.data?.detail || error.response?.data?.error || error.message
      })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}


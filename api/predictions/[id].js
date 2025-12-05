import axios from 'axios'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN.trim()
  const REPLICATE_API_URL = 'https://api.replicate.com/v1'

  if (!REPLICATE_API_TOKEN || REPLICATE_API_TOKEN === '') {
    return res.status(500).json({ 
      error: 'REPLICATE_API_TOKEN not configured'
    })
  }

  if (req.method === 'GET') {
    try {
      const { id } = req.query

      if (!id) {
        return res.status(400).json({ error: 'Prediction ID is required' })
      }

      const response = await axios.get(
        `${REPLICATE_API_URL}/predictions/${id}`,
        {
          headers: {
            'Authorization': `Bearer ${REPLICATE_API_TOKEN.trim()}`,
            'Content-Type': 'application/json'
          }
        }
      )

      return res.json(response.data)
    } catch (error) {
      console.error('Error getting prediction:', error.response?.data || error.message)
      return res.status(500).json({
        error: error.response?.data?.detail || error.response?.data?.error || error.message
      })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}


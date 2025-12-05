import express from 'express'
import cors from 'cors'
import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN

if (!REPLICATE_API_TOKEN) {
  console.error('ERROR: REPLICATE_API_TOKEN environment variable is required')
  console.error('Please set it in your .env file')
  process.exit(1)
}
const REPLICATE_API_URL = 'https://api.replicate.com/v1'

app.post('/api/predictions', async (req, res) => {
  try {
    const { prompt, aspectRatio = '1:1' } = req.body

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' })
    }

    const modelResponse = await axios.get(
      `${REPLICATE_API_URL}/models/black-forest-labs/flux-schnell`,
      {
        headers: {
          'Authorization': `Token ${REPLICATE_API_TOKEN}`,
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
          'Authorization': `Token ${REPLICATE_API_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    )

    res.json(predictionResponse.data)
  } catch (error) {
    console.error('Error creating prediction:', error.response?.data || error.message)
    res.status(500).json({
      error: error.response?.data?.detail || error.response?.data?.error || error.message
    })
  }
})

app.get('/api/predictions/:id', async (req, res) => {
  try {
    const { id } = req.params

    const response = await axios.get(
      `${REPLICATE_API_URL}/predictions/${id}`,
      {
        headers: {
          'Authorization': `Token ${REPLICATE_API_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    )

    res.json(response.data)
  } catch (error) {
    console.error('Error getting prediction:', error.response?.data || error.message)
    res.status(500).json({
      error: error.response?.data?.detail || error.response?.data?.error || error.message
    })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})


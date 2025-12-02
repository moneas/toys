import { ReplicateService } from '../replicateService'

jest.mock('axios')

describe('ReplicateService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('createPrediction', () => {
    it('should create a prediction with valid prompt', async () => {
      const mockAxios = require('axios')
      mockAxios.post.mockResolvedValue({
        data: { id: 'test-prediction-id' }
      })

      const predictionId = await ReplicateService.createPrediction('test prompt')
      expect(predictionId).toBe('test-prediction-id')
      expect(mockAxios.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          input: expect.objectContaining({
            prompt: 'test prompt'
          })
        }),
        expect.any(Object)
      )
    })

    it('should throw error on API failure', async () => {
      const mockAxios = require('axios')
      mockAxios.post.mockRejectedValue({
        response: {
          data: { detail: 'API Error' }
        }
      })

      await expect(ReplicateService.createPrediction('test')).rejects.toThrow('Failed to create prediction')
    })
  })
})


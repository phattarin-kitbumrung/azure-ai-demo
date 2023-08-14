import axios from 'axios'

const subscriptionKey = '<Your Subscription Key>'
const endpoint = '<Your Endpoint>'

export async function analyzeSentiment<T>(text: string, language: string): Promise<T> {
  const apiUrl = `${endpoint}/text/analytics/v3.0/sentiment`

  const requestData = {
    documents: [
      {
        id: '1',
        language: language,
        text: text,
      },
    ],
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': subscriptionKey
    },
  }

  try {
    const response = await axios.post(apiUrl, requestData, config)

    return response.data.documents[0]
  } catch (error) {
    console.log('Error analyzing sentiment:', error)
    throw error
  }
}

export async function extractKeyPhrases<T>(text: string, language: string): Promise<T> {
  const apiUrl = `${endpoint}/text/analytics/v3.0/keyPhrases`

  const requestData = {
    documents: [
      {
        id: '1',
        language: language,
        text: text,
      }
    ],
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': subscriptionKey
    },
  }

  try {
    const response = await axios.post(apiUrl, requestData, config)

    return response.data.documents[0]
  } catch (error) {
    console.log('Error extracting key phrases:', error)
    throw error
  }
}

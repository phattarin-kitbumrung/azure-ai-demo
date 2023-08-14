import axios from 'axios'

const subscriptionKey = '<Your Subscription Key>'
const endpoint = '<Your Endpoint>'
const region = '<Your Region>'

export async function translateText(text: string, targetLanguage: string): Promise<string> {
  try {
    const response = await axios.post(
      `${endpoint}/translate?api-version=3.0&to=${targetLanguage}`,
      [{ text }],
      {
          headers: {
              'Ocp-Apim-Subscription-Key': subscriptionKey,
              'Ocp-Apim-Subscription-Region': region,
              'Content-Type': 'application/json'
          }
      }
    )

    const translations = response.data[0].translations

    return translations[0].text
  } catch (error) {
    console.log('Error translations:', error)
    throw error
  }
}

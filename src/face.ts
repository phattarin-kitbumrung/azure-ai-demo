import axios from 'axios'

// Replace with your Azure Face API subscription key and endpoint
const subscriptionKey = '<Your Subscription Key>'
const endpoint = '<Your Endpoint>'
const detectUrl = `${endpoint}/face/v1.0/detect`
const analyzeUrl = `${endpoint}/face/v1.0/analyze`

// Detect faces in an image using Azure Face API
export async function detectFaces(imageUrl: string) {
  try {
    const response = await axios.post(
      detectUrl,
      { url: imageUrl },
      {
        headers: { 'Content-Type': 'application/json', 'Ocp-Apim-Subscription-Key': subscriptionKey },
      }
    )

    return response.data
  } catch (error) {
    console.log('Error detecting faces:', error)
    throw error
  }
}

// Analyze facial attributes of a detected face using Azure Face API
export async function analyzeFace(faceId: string) {
  try {
    const response = await axios.post(
      analyzeUrl,
      {
        faceId,
        returnFaceAttributes: ['age', 'gender', 'smile', 'emotion'],
      },
      {
        headers: { 'Content-Type': 'application/json', 'Ocp-Apim-Subscription-Key': subscriptionKey },
      }
    )
    
    return response
  } catch (error) {
    console.log('Error analyzing face: ', error)
    throw error
  }
}

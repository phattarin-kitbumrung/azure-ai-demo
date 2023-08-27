import axios from 'axios'

const subscriptionKey = '<Your Subscription Key>'
const endpoint = '<Your Endpoint>'

// Function to analyze a document using Azure Form Recognizer
export async function analyzeDocument(filePath: string): Promise<string> {
  const url = `${endpoint}/formrecognizer/documentModels/prebuilt-document:analyze?api-version=2023-07-31`
  const headers = {
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': subscriptionKey
  }
  const body = {
    urlSource: filePath
  }

  try {
    const response = await axios.post(url, body, { headers })
    const result = await getAnalyzeResult(response.headers['operation-location'])

    return result
  } catch (error) {
    console.log('Error analyzing document:', error)
    throw error
  }
}

async function getAnalyzeResult(operationLocation: string): Promise<string> {
  try {
    const headers = {
      'Ocp-Apim-Subscription-Key': subscriptionKey
    }

    let response = await axios.get(operationLocation, { headers })
    let operationResult = response.data

    while (
      operationResult.status === 'running' ||
      operationResult.status === 'notstarted'
    ) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      response = await axios.get(operationLocation, { headers })
      operationResult = response.data
    }

    if (operationResult.status === 'succeeded') {
      return operationResult.analyzeResult
    } else {
      throw new Error(`getAnalyzeResult failed, Status: ${operationResult.status}`)
    }
  } catch (error) {
    console.log('Error retrieving analyze result:', error)
    throw error
  }
}

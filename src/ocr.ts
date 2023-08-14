import axios from 'axios'

interface OCRLine {
  words: OCRWord[]
}

interface OCRWord {
  text: string
}

interface OCRRegion {
  lines: OCRLine[]
}

const subscriptionKey = '<Your Subscription Key>'
const endpoint = '<Your Endpoint>'

export async function performOCR(imageUrl: string): Promise<string> {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': subscriptionKey,
    }

    const body = {
      url: imageUrl
    }

    const response = await axios.post(`${endpoint}/vision/v3.1/ocr`, body, { headers })

    const extractedText = response.data.regions.reduce((text: string, region: OCRRegion) => {
      region.lines.forEach((line: OCRLine) => {
        line.words.forEach((word: OCRWord) => {
          text += `${word.text}` + ' '
        })
        text += '\n'
      })

      return text
    }, '')

    return extractedText
  } catch (error) {
    console.log('Error performing OCR:', error)
    throw error
  }
}

export async function readOCR(imageUrl: string) {
  try {
    const url = `${endpoint}/vision/v3.1/read/analyze`
    const headers = {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': subscriptionKey,
    }
    const data = {
      url: imageUrl,
    }

    const response = await axios.post(url, data, { headers })

    // Get the operation ID from the response
    const operationId = response.headers['operation-location']

    // Check the status of the OCR operation
    const result = await getOCRResult(operationId)

    return result
  } catch (error) {
    console.log('Error reading OCR:', error)
    throw error
  }
}

async function getOCRResult(operationUrl: string): Promise<string> {
  try {
    const headers = {
      'Ocp-Apim-Subscription-Key': subscriptionKey,
    }

    let response = await axios.get(operationUrl, { headers })
    let operationResult = response.data

    while (
      operationResult.status === 'running' ||
      operationResult.status === 'notstarted'
    ) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      response = await axios.get(operationUrl, { headers })
      operationResult = response.data
    }

    if (operationResult.status === 'succeeded') {
      const result = operationResult.analyzeResult.readResults[0].lines
      let extractedText = ''
      result.map(line => {
        extractedText += line.text
        extractedText += '\n'
      })

      return extractedText
    } else {
      throw new Error(`OCR operation failed. Status: ${operationResult.status}`)
    }
  } catch (error) {
    console.log('Error retrieving OCR result:', error)
    throw error
  }
}

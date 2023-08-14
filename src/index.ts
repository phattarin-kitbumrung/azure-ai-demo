import express from 'express'
import { readOCR, performOCR } from './ocr'
import { detectFaces, analyzeFace } from './face'
import { analyzeSentiment, extractKeyPhrases } from './language'
import { translateText } from './translator'

const app = express()
const port = 3000

app.listen(port, async () => {       
  console.log( `server started at http://localhost:${port}`)

  // Optical Character Recognition
  // const extractedText = await readOCR('https://minimalistquotes.com/wp-content/uploads/2021/04/i-am-a-slow-walker-but-i-never-walk-back.jpg')
  // console.log(extractedText)
  // const extractedText2 = await performOCR('https://minimalistquotes.com/wp-content/uploads/2021/04/i-am-a-slow-walker-but-i-never-walk-back.jpg')
  // console.log(extractedText2)

  // Detect faces in the image
  // const detectedFaces = await detectFaces('https://www.matichon.co.th/wp-content/uploads/2017/09/image003.jpg')
  // const firstDetectedFace = detectedFaces[0]
  // const recognitionResult = await recognizeFaceAttributes(firstDetectedFace.faceId)
  // console.log('Emotion:', recognitionResult.faceAttributes.emotion)

  // Natural Language Processing
  // const sentiment = await analyzeSentiment('อาหารไม่อร่อย', 'th')
  // console.log(sentiment)
  // const keyPhrases = await extractKeyPhrases(`In this article, we will utilize Nginx as the API gateway to manage and direct incoming requests to three different microservices: user-service, product-service, and order-service. 
  // The primary role of the API gateway (Nginx) is to act as an intermediary between clients (e.g., web or mobile applications) and these microservices. 
  // Instead of the clients directly accessing each microservice, they will send their requests to the API gateway, 
  // which will then intelligently route them to the appropriate microservice based on the request’s content and destination.`, 'en')
  // console.log(keyPhrases) 

  // Translator
  // let translatedText = await translateText('The primary role of the API gateway (Nginx) is to act as an intermediary between clients', 'th')
  // console.log(translatedText)
  // translatedText = await translateText('The primary role of the API gateway (Nginx) is to act as an intermediary between clients', 'fr')
  // console.log(translatedText)
})

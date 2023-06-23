import fetch from 'node-fetch';
import fs from 'fs';
import dotenv from 'dotenv';

import CONST from "./config/chatGpt.js"
const {chatGptSubHeaderRequest, chatGptSubtitleRequest} = CONST

dotenv.config();

const topic = process.argv[2] || 'Meltwater'; // Processing argument with default being meltwater
console.log("Topic used for chat gpt : ", topic)

const generateImage = (process.argv[3] === "yes" || process.argv[3] === '"yes"'  || process.argv[3] === "'yes'") 
console.log("Generating image ? ", generateImage)


const requestCategories = chatGptSubHeaderRequest(topic)
const requestSubtitle = chatGptSubtitleRequest(topic)


async function fetchDataAndWriteAsJson(requestCategories, requestSubtitle) {
  const { postData: postDataSubHeader , filePath, url } =  requestCategories
  const { postData: postDataSubtitle } =  requestSubtitle
  try {
    // Request subHeader
    const responseSubHeader = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      method: "POST",
      body: JSON.stringify(postDataSubHeader)
    }).then((response) => response.json())
    console.log("\nsubheader list : ", responseSubHeader.choices[0].message.content.split("\n"))
    const subHeaderList =  responseSubHeader.choices[0].message.content.split("\n").map((e) => e.substring(2).trim())

    const responseSubtitle = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      method: "POST",
      body: JSON.stringify(postDataSubtitle)
    }).then((response) => response.json())
    console.log("\nsubheader list : ", responseSubtitle.choices[0].message.content.split("\n"))
    const subtitle =  responseSubtitle.choices[0].message.content.split("\n").map((e) => e.trim().replace(".",""))

    const dataToStringify = {topic, subtitle, subHeaderList, image: generateImage}
    console.log("\n")
    console.log("\ndata to stringifty :", dataToStringify)
    const jsonData = JSON.stringify(dataToStringify);

    fs.writeFileSync(filePath, jsonData);
    console.log(`Data written to ${filePath} successfully.`);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

if(!process.env.OPENAI_API_KEY)
throw "process.env.OPENAI_API_KEY is undefined. Please specify OPENAPI_API_KEY in your env file"

fetchDataAndWriteAsJson(requestCategories, requestSubtitle);

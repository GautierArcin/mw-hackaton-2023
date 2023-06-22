import fetch from 'node-fetch';
import fs from 'fs';
import dotenv from 'dotenv';

import CONST from "./config/chatGpt.js"
const {chatGptSubHeaderRequest} = CONST

dotenv.config();

const topic = process.argv[2] || 'Meltwater'; // Processing argument with default being meltwater
console.log("Topic used for chat gpt : ", topic)

const request = chatGptSubHeaderRequest(topic)



async function fetchDataAndWriteAsJson(request) {
  // console.log(`Bearer ${process.env.OPENAI_API_KEY}`);
  const { postData, filePath, url } =  request
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      method: "POST",
      body: JSON.stringify(postData)
    }).then((response) => response.json())
    console.log("\n")
    console.log("subheader list : ", response.choices[0].message.content.split("\n"))
    const subHeaderList =  response.choices[0].message.content.split("\n").map((e) => e.substring(2).trim())
    const dataToStringify = {topic, subHeaderList}
    console.log("\n")
    console.log("data to stringifty :", dataToStringify)
    const jsonData = JSON.stringify(dataToStringify);

    fs.writeFileSync(filePath, jsonData);
    console.log(`Data written to ${filePath} successfully.`);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

if(!process.env.OPENAI_API_KEY)
throw "process.env.OPENAI_API_KEY is undefined. Please specify OPENAPI_API_KEY in your env file"

fetchDataAndWriteAsJson(request);

import fetch from 'node-fetch';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const topic = process.argv[2] || 'Meltwater'; // Processing argument with default being meltwater
console.log("Topic used for chat gpt : ", topic)

const messages = [
  {
    role: 'user',
    content: `Generate what a static, text-only website navigation bar about the topic ${topic} would look like`,
  },
  {
    role: 'system',
    content: `Give only an unordered list of navigation bar item, without media nor contact nor contact us`,
  },
];

const postData = {
  model: 'gpt-3.5-turbo',
  messages: messages
}


// const url = 'https://random-data-api.com/api/v2/users?size=10'; // Replace with your URL
const url = 'https://api.openai.com/v1/chat/completions'; // Replace with your URL
const filePath = 'data/subHeaderList.json'; // Replace with the desired file path


async function fetchDataAndWriteAsJson(url, filePath, postData) {
  console.log(`Bearer ${process.env.OPENAI_API_KEY}`);
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      method: "POST",
      body: JSON.stringify(postData)
    }).then((response) => response.json())
    const data =  response.choices[0].message.content.split("\n").map((e) => e.substring(2).trim())
    const jsonData = JSON.stringify(data, null, 2);

    fs.writeFileSync(filePath, jsonData);
    console.log(`Data written to ${filePath} successfully.`);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

if(!process.env.OPENAI_API_KEY)
throw "process.env.OPENAI_API_KEY is undefined. Please specify OPENAPI_API_KEY in your env file"

fetchDataAndWriteAsJson(url, filePath, postData);

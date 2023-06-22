/* eslint-disable simple-import-sort/imports */
/* eslint-disable import/extensions */
import axios from 'axios';

import subHeaderFile from '@/public/chatGpt/siteInfo.json';
import * as CONST_CHAT_GPT from '@/config/chatGpt';

const { chatGptArticleRequest } = CONST_CHAT_GPT;

export const getBodyFromChatGpt = (article: string) => {
  const { topic } = subHeaderFile;
  const { postData, url } = chatGptArticleRequest(topic, article);
  return axios
    .post(url, postData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    })
    .then((response) => {
      return response.data.choices[0].message.content;
    })
    .catch((e) => console.error(e));
};

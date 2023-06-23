/* eslint-disable simple-import-sort/imports */
/* eslint-disable import/extensions */
import axios from 'axios';

import siteInfo from '@/public/chatGpt/siteInfo.json';
import * as CONST_CHAT_GPT from '@/config/chatGpt';

const { dalleRequest } = CONST_CHAT_GPT;

// console.log("env ; ", process.env)

export const getImageFromDallE = (article: string) => {
  const { topic } = siteInfo;
  const { url, postData } = dalleRequest(topic, article);
  return axios
    .post(url, postData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((e) => console.error(e));
};

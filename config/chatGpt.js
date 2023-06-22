const model = 'gpt-3.5-turbo';
const urlAPICompletion = 'https://api.openai.com/v1/chat/completions';

// Config for the call of the script, calling the subheader call

const filePathToExportSubHeader = 'public/chatGpt/subHeaderList.json';

const chatGptSubHeaderPrompt = (topic) => [
  {
    role: 'user',
    content: `Generate what a static, text-only website navigation bar about the topic ${topic} would look like`,
  },
  {
    role: 'system',
    content: `Give only an unordered list of navigation bar item, without media nor contact nor contact us nor blog`,
  },
  {
    role: 'system',
    content: `Give at most 8 items and make each items concise`,
  },
];

const chatGptSubHeaderRequest = (topic) => ({
  postData: {
    messages: chatGptSubHeaderPrompt(topic),
    model,
  },
  filePath: filePathToExportSubHeader,
  url: urlAPICompletion,
});

// Config for the call for the differents pages

const filePathToExportArticle = (article) => `data/subHeader${article}.json`;

const chatGptArticlePrompt = (topic, article) => [
  {
    role: 'user',
    content: `Generate an article about the ${article} of ${topic}`,
  },
  {
    role: 'system',
    content: `Generate it like it would be the content of a web-page`,
  },
  {
    role: 'system',
    content: `Gives only the article. Don't put the title.`,
  },
  {
    role: 'system',
    content: `Format it in markdown. Uses # and ## tags.`,
  },
  {
    role: 'system',
    content: `Don't put any introduction or conclusion.`,
  },
];

const chatGptArticleRequest = (topic, article) => ({
  postData: {
    messages: chatGptArticlePrompt(topic, article),
    model,
  },
  filePath: filePathToExportArticle(article),
  url: urlAPICompletion,
});

module.exports = {
  chatGptSubHeaderRequest,
  chatGptArticleRequest,
};

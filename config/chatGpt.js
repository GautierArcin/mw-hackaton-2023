// Global

const model = 'gpt-3.5-turbo';
const modelDallE = 'Dall·E 2';
const urlAPICompletion = 'https://api.openai.com/v1/chat/completions';
const urlAPIImage = 'https://api.openai.com/v1/images/generations';

const filePathToExport = 'public/chatGpt/siteInfo.json';

// SubHeader

const chatGptSubHeaderPrompt = (topic) => [
  {
    role: 'user',
    content: `Generate a static, text-only website navigation bar about the topic ${topic}`,
  },
  {
    role: 'system',
    content: `Respond only with the items, directly.`,
  },
  {
    role: 'system',
    content: `Give only an unordered list of navigation bar item, without media nor contact nor contact us nor blog nor references nor about`,
  },
  {
    role: 'system',
    content: `Give between 4 and 7 items and make each items 5 words at most`,
  },
];

const chatGptSubHeaderRequest = (topic) => ({
  postData: {
    messages: chatGptSubHeaderPrompt(topic),
    model,
  },
  filePath: filePathToExport,
  url: urlAPICompletion,
});

// Subtitle

const chatGptSubtitlePrompt = (topic) => [
  {
    role: 'user',
    content: `Generate a subtitle of website about the topic ${topic}, without including ${topic}`,
  },
  {
    role: 'system',
    content: `Make it 10 words at most.`,
  },
  {
    role: 'system',
    content: `Only alphabetic character or emoji, no quote`,
  },
];

const chatGptSubtitleRequest = (topic) => ({
  postData: {
    messages: chatGptSubtitlePrompt(topic),
    model,
  },
  filePath: filePathToExport,
  url: urlAPICompletion,
});

// Content

const filePathToExportArticle = (article) =>
  `public/chatGpt/articles/${article}.json`;

const chatGptArticlePrompt = (topic, article) => [
  {
    role: 'user',
    content: `Generate an article about the ${article} of ${topic} without introduction nor conclusion`,
  },
  {
    role: 'system',
    content: `Generate it like it would be the content of a web-page.`,
  },
  {
    role: 'system',
    content: `Format it in markdown. Uses # and ## tags.`,
  },
  {
    role: 'system',
    content: `No introduction, no conclusion..`,
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

// Images

// Should be 256, 512 or 1024
const imageResolution = 512;

const filePathToAcessImages = `/dalle/articles`;

const filePathToExportImages = (article) =>
  `public${filePathToAcessImages}/${article}.jpg`;

const dallePrompt = (topic, article) => ({
  prompt: `${article} of ${topic}`,
  n: 1,
  size: `${imageResolution}x${imageResolution}`,
});

const dalleRequest = (topic, article) => ({
  postData: dallePrompt(topic, article),
  filePath: filePathToExportImages(article),
  url: urlAPIImage,
});

module.exports = {
  model,
  modelDallE,
  chatGptSubHeaderRequest,
  chatGptArticleRequest,
  chatGptSubtitleRequest,
  filePathToExportImages,
  filePathToAcessImages,
  dalleRequest,
  imageResolution,
};

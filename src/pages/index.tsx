import { Accordion } from '@/component/accordion';
import * as CONST_CHAT_GPT from '@/config/chatGpt';
import { Meta } from '@/layouts/Meta';
import siteInfo from '@/public/chatGpt/siteInfo.json';
import { Main } from '@/templates/Main';

const { model, chatGptSubHeaderRequest, chatGptSubtitleRequest } =
  CONST_CHAT_GPT;

const Index = () => {
  const subHeaderRequest = chatGptSubHeaderRequest(siteInfo.topic).postData
    .messages;

  const subtitleReqquest = chatGptSubtitleRequest(siteInfo.topic).postData
    .messages;

  const { topic } = siteInfo;

  const accordionsContent = [
    {
      title: 'Website subtitle',
      code: subtitleReqquest,
    },
    {
      title: 'website categories',
      code: subHeaderRequest,
    },
  ];

  return (
    <Main
      meta={
        <Meta
          title={`AI generated website about ${topic} 🤖`}
          description={`This website was statically generated through ChatGPt, only with the prompt "${topic}".`}
        />
      }
    >
      <p className="my-3 text-base font-semibold">
        Except this page, all of this website has been generated with this
        prompt :{' '}
        <span
          className="animate-text bg-gradient-to-r 
            from-indigo-500 via-purple-500  to-indigo-500 
            bg-clip-text text-xl font-semibold
            text-transparent"
        >
          {siteInfo.topic}
        </span>
      </p>
      <p className="">
        That means that all of this website (including the <i>categories</i>,
        the <i>subtitle</i>, the <i>content</i> of each page) has been generated
        with only the prompt
        <span
          className="animate-text bg-gradient-to-r 
            from-indigo-500 via-purple-500  to-indigo-500 
            bg-clip-text font-semibold
            text-transparent"
        >
          {` "${siteInfo.topic}", `}
        </span>
        using multiple AI.
        <br />
      </p>

      <p>
        This particular site used <code>{model}</code> model from ChatGpt.
      </p>

      <p className="">
        This project has been done in three days as a part of the{' '}
        <a href="https://mwhack.com/about" rel="nofollow">
          Meltwater 2023 hackaton
        </a>{' '}
        in order to explore the combinaison of{' '}
        <a
          href="https://www.cloudflare.com/learning/performance/static-site-generator/"
          rel="nofollow"
        >
          Static Site generation
        </a>{' '}
        and AI.
      </p>

      <p className="">
        Wants to do deploy your own in minutes ? Just follow the readme
        <a
          href="https://github.com/GautierArcin/mw-hackaton-2023"
          rel="nofollow"
        >
          {' '}
          of this github repo.
        </a>
      </p>

      <h3 className="font-semibold">Technologies used :</h3>
      <ul>
        <li>
          <span role="img" aria-label="fire">
            🔥
          </span>{' '}
          <a href="https://nextjs.org" rel="nofollow">
            Next.js
          </a>{' '}
          for Static Site Generation
        </li>
        <li>
          <span role="img" aria-label="fire">
            🤖
          </span>{' '}
          <a
            href="https://platform.openai.com/docs/api-reference"
            rel="nofollow"
          >
            Chat-gpt
          </a>{' '}
          for content generation
        </li>
        <li>
          <span role="img" aria-label="fire">
            ☕
          </span>{' '}
          a lot of coffee
        </li>
      </ul>
      <h3 className="font-semibold">To-do</h3>
      <ul>
        <li>
          <span role="img" aria-label="fire">
            🔨
          </span>{' '}
          Refactor code
          <a
            href="https://github.com/GautierArcin/mw-hackaton-2023"
            rel="nofollow"
          >
            (which is available here)
          </a>{' '}
        </li>
        <li>
          <span role="img" aria-label="fire">
            🎨
          </span>{' '}
          Add AI-generated image with{' '}
          <a href="https://stablediffusionapi.com/playground" rel="nofollow">
            mid-journey
          </a>
        </li>
        <li>
          <span role="img" aria-label="fire">
            🌎
          </span>{' '}
          Add localization through{' '}
          <a href="https://www.deepl.com/fr/pro-api" rel="nofollow">
            DeepL
          </a>
        </li>
        <li>
          <span role="img" aria-label="fire">
            📄
          </span>{' '}
          For each pages, add the prompt(s) that generated it
        </li>
        <li>
          <span role="img" aria-label="fire">
            🔍
          </span>{' '}
          Boost SEO
        </li>
      </ul>
      <Accordion content={accordionsContent} />
    </Main>
  );
};

export default Index;

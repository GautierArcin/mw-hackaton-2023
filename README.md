# AI Generated static website

This project has been done in three days as a part of the Meltwater 2023 hackaton in order to explore the combinaison of Static Site generation and AI.

## Technologies used :
* 🔥 Next.js for Static Site Generation
  *  Based on [this boilerplate](https://github.com/ixartz/Next-js-Boilerplate).  
* 🤖 Chat-gpt and DALL-E for content generation

## Deploying one yourself

* Clone this repo 
* `yarn install`
* Create a .env file with an environnement variable named `OPENAI_API_KEY`
* `npm run chatgpt -- TOPIC_YOU_WANT_YOUR_SITE_TO_BE_ABOUT yes`
  * `TOPIC_YOU_WANT_YOUR_SITE_TO_BE_ABOUT` being the the topic of your website 
  * `yes`as a second argument indicate you want to generate images. Don't put it if you want the site to be only text based.
  * This command request chatGpt for the categories about the topic you choose.
  * It's necessary to do it before the `npm run build` because pages need to access the created json before the SSG build
  * Unfortunately, can't run it as a `prebuild` command in npm since it doesn't pass the argument. If you have any solutions, hit me up with a PR !
* `npm run build`
* `npm start`

##  Configurating it

You can configure all prompts adressed to generate content in the file `config/chatGpt.js`. 

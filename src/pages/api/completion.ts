import { OpenAIStream, StreamingTextResponse } from 'ai';
import { Configuration, OpenAIApi } from 'openai-edge';

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

// Set the runtime to edge for best performance
export const runtime = 'edge';

export default async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { prompt } = await req.json();
  console.log('topic used: ', prompt);

  const topic = prompt;
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

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: messages as any,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response, {
    onCompletion: async (completion: string) => {
      console.log(
        'complete  !!!!! ',
        completion.split('\n').map((e) => e.substring(2).trim())
      );
    },
  });
  // Respond with the stream
  return new StreamingTextResponse(stream);
}

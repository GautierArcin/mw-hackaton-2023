'use client';

import { useCompletion } from 'ai/react';

const Index = () => {
  // const router = useRouter();
  const { completion, input, handleInputChange, handleSubmit } =
    useCompletion();

  console.log('completion : ', completion);

  return (
    <div className="stretch mx-auto flex w-full max-w-md flex-col py-24">
      {completion !== '' ? (
        <div className="my-6 whitespace-pre-wrap">{completion || ' '}</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            className="fixed bottom-0 mb-8 w-full max-w-md rounded border border-gray-300 p-2 shadow-xl"
            value={input}
            placeholder="Describe your business..."
            onChange={handleInputChange}
          />
        </form>
      )}
    </div>
  );
};

export default Index;

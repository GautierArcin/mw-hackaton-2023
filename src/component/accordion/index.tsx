import { Accordion as AccordionFlowbite } from 'flowbite-react';

import type { ContentType } from '@/types';

interface IProps {
  content: ContentType[];
}

const PrettyPrintJson = ({ data }: { data: any }) => (
  <div className="whitespace-break-spaces">{JSON.stringify(data, null, 2)}</div>
);

export const Accordion = ({ content }: IProps) => {
  return (
    <AccordionFlowbite className="mb-4">
      <AccordionFlowbite.Panel className="">
        <AccordionFlowbite.Title className="py-0 text-base text-gray-700">
          AI requests used for this page
        </AccordionFlowbite.Title>
        <AccordionFlowbite.Content className="py-4 text-base text-gray-700">
          {content.map(({ title, code }) => (
            <AccordionFlowbite key={title} className="mb-4">
              <AccordionFlowbite.Panel className="">
                <AccordionFlowbite.Title className="py-0 text-base text-gray-700">
                  {title}
                </AccordionFlowbite.Title>
                <AccordionFlowbite.Content className="py-4 text-base text-gray-700">
                  <code className=" w-100 bg-amber-300 bg-opacity-50">
                    {PrettyPrintJson({ data: code })}
                  </code>
                </AccordionFlowbite.Content>
              </AccordionFlowbite.Panel>
            </AccordionFlowbite>
          ))}
        </AccordionFlowbite.Content>
      </AccordionFlowbite.Panel>
    </AccordionFlowbite>
  );
};

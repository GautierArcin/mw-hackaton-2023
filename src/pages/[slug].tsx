/* eslint-disable react/no-children-prop */
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
import React from 'react';
import ReactMarkdown from 'react-markdown';

import { getBodyFromChatGpt } from '@/api/chatGpt';
import { Accordion } from '@/component/accordion';
import * as CONST_CHAT_GPT from '@/config/chatGpt';
import { Meta } from '@/layouts/Meta';
import siteInfo from '@/public/chatGpt/siteInfo.json';
import { Main } from '@/templates/Main';
import type { ContentType } from '@/types';

const { chatGptArticleRequest } = CONST_CHAT_GPT;

type IBlogUrl = {
  slug: string;
};

type IBlogProps = {
  title: string;
  data: string;
  request: ContentType[];
};

export const getStaticPaths: GetStaticPaths<IBlogUrl> = async () => {
  const { subHeaderList } = siteInfo;
  return {
    paths: subHeaderList.map((subHeader: string) => ({
      params: { slug: `${subHeader}` },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<IBlogProps, IBlogUrl> = async ({
  params,
}) => {
  const data = await getBodyFromChatGpt(params!.slug);
  const { topic } = siteInfo;
  const { postData } = chatGptArticleRequest(topic, params!.slug);

  const accordionContent: ContentType[] = [
    {
      title: 'Page content',
      code: postData.messages,
    },
  ];

  return {
    props: {
      title: params!.slug,
      data,
      request: accordionContent,
    },
  };
};

const Blog = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Main meta={<Meta title={props.title} description="Lorem ipsum" />}>
      <ReactMarkdown children={props.data} />
      <Accordion content={props.request} />
    </Main>
  );
};

export default Blog;

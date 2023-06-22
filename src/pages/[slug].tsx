/* eslint-disable react/no-children-prop */
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
import React from 'react';
import ReactMarkdown from 'react-markdown';

import { getBodyFromChatGpt } from '@/api/chatGpt';
import { Meta } from '@/layouts/Meta';
import siteInfo from '@/public/chatGpt/siteInfo.json';
import { Main } from '@/templates/Main';

type IBlogUrl = {
  slug: string;
};

type IBlogProps = IBlogUrl & {
  data: string;
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

export const getStaticProps: GetStaticProps<IBlogProps, IBlogProps> = async ({
  params,
}) => {
  const data = await getBodyFromChatGpt(params!.slug);
  return {
    props: {
      slug: params!.slug,
      data,
    },
  };
};

const Blog = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  console.log('props : ', props);
  console.log('typeof data ', typeof props.data);
  return (
    <Main meta={<Meta title={props.slug} description="Lorem ipsum" />}>
      <ReactMarkdown children={props.data} />
    </Main>
  );
};

export default Blog;

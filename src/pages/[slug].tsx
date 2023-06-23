/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-children-prop */
import { promises as fs } from 'fs';
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
import Image from 'next/image';
import React from 'react';
import ReactMarkdown from 'react-markdown';

import { getBodyFromChatGpt } from '@/api/chatGpt';
import { getImageFromDallE } from '@/api/dallE';
import { Accordion } from '@/component/accordion';
import * as CONST_CHAT_GPT from '@/config/chatGpt';
import { Meta } from '@/layouts/Meta';
import siteInfo from '@/public/chatGpt/siteInfo.json';
import { Main } from '@/templates/Main';
import type { ContentType } from '@/types';

type IBlogUrl = {
  slug: string;
};

type IBlogProps = {
  title: string;
  data: string;
  request: ContentType[];
  alignementImage: 'left' | 'right' | false;
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

// const loremIpsum =
//   ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id mauris maximus, vehicula velit vitae, volutpat quam. Sed efficitur eros urna, quis sollicitudin urna varius vitae. Donec at consectetur magna, at faucibus sapien. Curabitur faucibus nunc vitae justo aliquet laoreet. Sed sit amet aliquam augue. Vivamus ex tellus, aliquet sed nunc nec, rutrum consequat velit. Donec hendrerit vel ligula sed hendrerit. Phasellus et consectetur lectus. Integer pellentesque gravida nunc, eget feugiat ipsum elementum nec. Donec nulla risus, mollis nec purus vel, interdum hendrerit mauris.\nVestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vivamus laoreet elit nisi, vel porttitor diam pellentesque id. Ut id tincidunt velit. Nullam ac velit mattis, luctus massa laoreet, viverra erat. Praesent a eros commodo urna mollis porta. Integer laoreet semper quam, quis faucibus leo. Fusce egestas nunc eget ex porta, at dignissim magna consectetur. Integer et ante eros. Donec eu faucibus turpis. Fusce vel sodales orci. Aenean ultricies, velit non ullamcorper maximus, augue ante tincidunt odio, sed eleifend lectus orci ac nisl. Phasellus et maximus felis.\nVivamus egestas aliquet dolor et lobortis. Nullam maximus posuere augue, eu luctus metus ornare vel. Vivamus nec luctus arcu, sit amet varius mi. Nulla egestas elit urna, vitae pulvinar metus posuere quis. Nunc maximus tortor eget consectetur interdum. Sed risus purus, aliquam ut justo quis, aliquet congue lectus. Nunc nulla arcu, sollicitudin ut dolor et, mattis malesuada urna. In porttitor congue nisi quis pulvinar. Nulla tincidunt nisi erat, ac vehicula enim sollicitudin id. Phasellus varius, ipsum eu egestas dapibus, ex diam finibus dui, quis molestie ligula sapien in ligula. Suspendisse tristique mauris in turpis blandit blandit. Vestibulum semper nisl tellus, quis ultricies metus tristique id. Ut a accumsan massa, at pulvinar nibh. Praesent laoreet in ex vel posuere. Vivamus sollicitudin orci justo, dictum iaculis libero laoreet quis. Nulla posuere ante eu consequat rutrum. ';

export const getStaticProps: GetStaticProps<IBlogProps, IBlogUrl> = async ({
  params,
}) => {
  const generateImage = siteInfo?.image === 'yes';

  const data = await getBodyFromChatGpt(params!.slug);
  // const data = loremIpsum;

  const { topic } = siteInfo;
  const { postData } = CONST_CHAT_GPT.chatGptArticleRequest(
    topic,
    params!.slug
  );

  const accordionContent: ContentType[] = [
    {
      title: 'Page content',
      code: postData.messages,
    },
  ];

  if (generateImage) {
    const data2 = await getImageFromDallE(params!.slug);
    const imagesListe = data2.data.map((e: any) => e.url);
    const url = imagesListe[0]; // Only keeping one image at the moment
    const response = await fetch(url);
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    await fs.writeFile(
      `${CONST_CHAT_GPT.filePathToExportImages(params!.slug)}`,
      buffer
    );

    const { postData: postDataImage } = CONST_CHAT_GPT.dalleRequest(
      topic,
      params!.slug
    );

    accordionContent.push({ code: postDataImage as any, title: 'Image' });
  }

  return {
    props: {
      title: params!.slug,
      data,
      request: accordionContent,
      alignementImage: generateImage
        ? Math.random() > 0.5
          ? 'left'
          : 'right'
        : false,
    },
  };
};

const Blog = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { topic } = siteInfo;
  const giveImageAlignement = (alignement: 'left' | 'right') => {
    if (alignement === 'left') return 'float-left mx-6';
    if (alignement === 'right') return 'float-right mx-6';
    return '';
  };
  const { imageResolution } = CONST_CHAT_GPT;
  return (
    <Main
      meta={
        <Meta
          title={props.title}
          description={`${props.title} about ${topic}`}
        />
      }
    >
      {props.alignementImage && (
        <div
          style={{ width: imageResolution }}
          className={`mb-4 mt-8 inline-block ${giveImageAlignement(
            props.alignementImage
          )}`}
        >
          <Image
            src={`${CONST_CHAT_GPT.filePathToAcessImages}/${props.title}.jpg`}
            width={imageResolution}
            height={imageResolution}
            alt={`Generated image about ${props.title}`}
          />
          <div className="mt-4 text-center text-sm">{`AI generated image about ${props.title} of ${topic}`}</div>
        </div>
      )}
      <ReactMarkdown children={props.data} />
      <Accordion content={props.request} />
    </Main>
  );
};

export default Blog;

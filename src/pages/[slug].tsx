import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

type IBlogUrl = {
  slug: string;
};

type IBlogProps = IBlogUrl & {
  data: string;
};

export const getStaticPaths: GetStaticPaths<IBlogUrl> = async () => {
  const pathsData = await fetch(
    'https://random-data-api.com/api/v2/users?size=10'
  ).then((response) => response.json());
  const indexList: string[] = pathsData.map((e: any) => `${e.id}`);
  console.log('index liste : ', indexList);
  return {
    paths: indexList.map((_, i) => ({
      params: { slug: `${i}` },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<IBlogProps, IBlogProps> = async ({
  params,
}) => {
  const dataRequest = await fetch(
    'https://jsonplaceholder.typicode.com/posts/1'
  ).then((response) => response.json());
  // console.log('data request : ', dataRequest);
  return {
    props: {
      slug: params!.slug,
      data: dataRequest.body,
    },
  };
};

const Blog = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  console.log('props : ', props);
  return (
    <Main meta={<Meta title={props.slug} description="Lorem ipsum" />}>
      <h1 className="capitalize">{props.slug}</h1>
      {[props?.data].map((e) => (
        <p key={e}>{e}</p>
      ))}
    </Main>
  );
};

export default Blog;

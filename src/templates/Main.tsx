import Link from 'next/link';
import { useRouter } from 'next/router';
import type { ReactNode } from 'react';

import siteInfo from '@/public/chatGpt/siteInfo.json';
import { AppConfig } from '@/utils/AppConfig';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => {
  const router = useRouter();
  return (
    <div className="w-full px-1 text-gray-700 antialiased">
      {props.meta}

      <div className="mx-auto max-w-screen-md">
        <header className="border-b border-gray-300">
          <div className="pb-6 pt-16">
            <h1 className="my-0 text-3xl font-bold text-gray-900">
              {AppConfig.title}
            </h1>
            <h2 className="my-1 text-xl">{AppConfig.description}</h2>
          </div>
          <nav>
            <ul className="flex flex-wrap text-xl">
              <li className="mr-6 list-none">
                <Link
                  href="/"
                  className={`animate-text 
         border-none bg-gradient-to-r 
           ${
             router.asPath === `/`
               ? 'from-gray-700 to-gray-900'
               : 'from-purple-500 to-indigo-500'
           }
            bg-clip-text font-semibold
            text-transparent`}
                >
                  About
                </Link>
              </li>
              {siteInfo.subHeaderList.map((subHeader) => (
                <li key={subHeader} className="mr-6 list-none">
                  <Link
                    href={`/${subHeader}/`}
                    className={`border-none text-gray-700 ${
                      `/${subHeader}/` === router.asPath
                        ? 'font-bold'
                        : 'font-normal'
                    } hover:text-gray-900`}
                  >
                    {subHeader}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        <main className="content pb-5 pt-3 text-xl">{props.children}</main>

        <footer className="border-t border-gray-300 py-8 text-center text-sm">
          Made with ❤️ by{' '}
          <a href="https://github.com/GautierArcin">Gautier Arcin</a>. <br />{' '}
          Based on{' '}
          <a href="https://github.com/ixartz/Next-js-Boilerplate">this</a> Next
          Js Boilerplate.
        </footer>
      </div>
    </div>
  );
};

export { Main };

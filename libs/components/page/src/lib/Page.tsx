import { forwardRef } from 'react';

import Head from 'next/head';

import RouteProgress from './progress';

// ----------------------------------------------------------------------
type Props = {
  title: string;
  className?: string;
  id?: string;
  children?: React.ReactNode;
};
const Page = forwardRef<HTMLDivElement, Props>(
  ({ children, title = '', ...other }, ref) => {
    return (
      <div ref={ref} {...other}>
        <Head>
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon/favicon-16x16.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicon/apple-touch-icon.png"
          />
          <link rel="manifest" href="/favicon/site.webmanifest" />
          <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" />

          <title>{title}</title>
        </Head>
        <RouteProgress>{children}</RouteProgress>
      </div>
    );
  }
);

export default Page;

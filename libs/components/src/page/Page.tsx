import { forwardRef } from 'react';

import { styled } from '@mui/material/styles';

import Head from 'next/head';
import Image from 'next/image';
import styles from './Snow.module.scss';

// ---------------------------------------------------------------------

const StyledImage = styled(Image)({
  top: 250,
  right: 0,
  bottom: 0,
  zIndex: -99,
  margin: 'auto',
  position: 'relative',
  filter: 'blur(6px)',
  left: '5%',
  height: '125vh',
});

// ----------------------------------------------------------------------
type Props = {
  title: string;
  className?: string;
  id?: string;
  children?: React.ReactNode;
};
const Page = forwardRef<HTMLDivElement, Props>(
  ({ children, title = '', ...other }, ref) => {
    const renderSnow = () => {
      const numberOfSnowflakes = 200;
      const rows = [];
      for (let i = 0; i < numberOfSnowflakes; i++) {
        rows.push(<div className={styles.snow}></div>);
      }
      return <div className={styles.snowflakes}>{rows}</div>;
    };

    return (
      <div ref={ref} {...other}>
        <Head>
          <link rel="shortcut icon" href="/favicon/favicon.ico" />
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
        <StyledImage src="/static/images/hero.svg" layout="fill" />
        {renderSnow()}
        {children}
      </div>
    );
  }
);

export default Page;

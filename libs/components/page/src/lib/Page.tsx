import { forwardRef } from 'react';

import { experimentalStyled as styled } from '@material-ui/core/styles';
import Head from 'next/head';
import {
  varFadeIn,
  varWrapEnter,
  varFadeInRight,
  varFadeInUp,
} from '@orca/components/animate';
import { motion } from 'framer-motion';
import RouteProgress from './progress';
// ---------------------------------------------------------------------

const HeroImgStyle = styled(motion.img)(({ theme }) => ({
  top: 250,
  right: 0,
  bottom: 0,
  zIndex: -99,
  width: '150%',
  margin: 'auto',
  position: 'fixed',
  filter: 'blur(6px)',
  [theme.breakpoints.up('md')]: {
    left: '5%',
    width: 'auto',
    height: '125vh',
  },
}));

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
        <RouteProgress>
          <motion.div
            initial="initial"
            animate="animate"
            variants={varWrapEnter}
          >
            <HeroImgStyle
              alt="hero"
              src="/static/images/hero.svg"
              variants={varFadeInUp}
            />
          </motion.div>
          {children}
        </RouteProgress>
      </div>
    );
  }
);

export default Page;

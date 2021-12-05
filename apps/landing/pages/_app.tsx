import type {
  ExternalProvider,
  JsonRpcFetchFunc,
} from '@ethersproject/providers';
import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';
import type { AppProps } from 'next/app';

import React from 'react';

import Head from 'next/head';

import { ThemeProviderWrapper as ThemeProvider } from '@orca/theme';

import 'simplebar-react/dist/simplebar.min.css';
import 'react-toastify/dist/ReactToastify.css';

// slick-carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// NProgress
import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import { Settings } from '@orca/components';

// emotion
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from '../emotion';

//Binding events for nprogress
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function getLibrary(provider: ExternalProvider | JsonRpcFetchFunc) {
  return new Web3Provider(provider);
}

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

export default function NextWeb3App(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <ThemeProvider>
          <Head>
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width"
            />
          </Head>
          <Settings />

          <Component {...pageProps} />
        </ThemeProvider>
      </Web3ReactProvider>
    </CacheProvider>
  );
}

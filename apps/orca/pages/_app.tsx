import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

import type {
  ExternalProvider,
  JsonRpcFetchFunc,
} from '@ethersproject/providers';
import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';

import { RecoilRoot } from 'recoil';
import Head from 'next/head';

// css
import 'simplebar-react/dist/simplebar.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// notistack
import { SnackbarProvider } from 'notistack';

// NProgress
import Router from 'next/router';
import nProgress from 'nprogress';
import 'nprogress/nprogress.css';

// Custom
import {
  Settings,
  BalanceInfoOrca,
  AccountInfo,
  BalanceInfoAVAI,
} from '@orca/components';
import { useScrollTop } from '@orca/hooks';
import { ThemeProviderWrapper as ThemeProvider } from '@orca/theme';

// Localization stuff
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

// emotion
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from '../emotion';

//apollo
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '@orca/graphql';

function getLibrary(provider: ExternalProvider | JsonRpcFetchFunc) {
  return new Web3Provider(provider);
}

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
}

const clientSideEmotionCache = createEmotionCache();

export default function NextWeb3App(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  useScrollTop();
  Router.events.on('routeChangeStart', nProgress.start);
  Router.events.on('routeChangeError', nProgress.done);
  Router.events.on('routeChangeComplete', nProgress.done);

  // For graphql
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <RecoilRoot>
        <ApolloProvider client={apolloClient}>
          <Web3ReactProvider getLibrary={getLibrary}>
            <ThemeProvider>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <SnackbarProvider
                  maxSnack={6}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                >
                  <Settings />
                  <AccountInfo />
                  <BalanceInfoAVAI />
                  <BalanceInfoOrca />
                  <Component {...pageProps} />
                </SnackbarProvider>
              </LocalizationProvider>
            </ThemeProvider>
          </Web3ReactProvider>
        </ApolloProvider>
      </RecoilRoot>
    </CacheProvider>
  );
}

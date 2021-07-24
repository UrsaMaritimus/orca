import type {
  ExternalProvider,
  JsonRpcFetchFunc,
} from '@ethersproject/providers';
import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';
import type { AppProps } from 'next/app';

import React, { useEffect } from 'react';

import Head from 'next/head';

import { ThemeProvider as NextThemeProvider } from 'next-themes';

import 'simplebar-react/dist/simplebar.min.css';
import 'react-toastify/dist/ReactToastify.css';

// NProgress
import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import { ThemeProvider as CustomThemeProvider } from '@ursa/components/theme';
import { CustomToaster } from '@ursa/components/toast';
import { Settings } from '@ursa/components/settings';
import { CollapseDrawerProvider } from '@ursa/hooks';

//Binding events for nprogress
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function getLibrary(provider: ExternalProvider | JsonRpcFetchFunc) {
  return new Web3Provider(provider);
}

export default function NextWeb3App({ Component, pageProps }: AppProps) {
  // For material-UI
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <NextThemeProvider defaultTheme="system" enableSystem>
        <CustomThemeProvider>
          <CollapseDrawerProvider>
            <Head>
              <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width"
              />
            </Head>
            <Settings />

            <Component {...pageProps} />
            <CustomToaster />
          </CollapseDrawerProvider>
        </CustomThemeProvider>
      </NextThemeProvider>
    </Web3ReactProvider>
  );
}

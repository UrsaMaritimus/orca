import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { NextPageContext } from 'next';

import { useMemo } from 'react';
import merge from 'ts-deepmerge';

import { terminatingLink } from './links';
import cache from './cache';

// We make our graphql backend
export default function createApolloClient(
  ctx: NextPageContext
): ApolloClient<NormalizedCacheObject> {
  const ssrMode = typeof window === 'undefined';
  // get cookies for token, can't use localstorage due to ssr
  const link = terminatingLink(ssrMode, ctx);

  return new ApolloClient<NormalizedCacheObject>({
    ssrMode,
    link,
    cache,
    assumeImmutableResults: true,
  });
}

let apolloClient: ApolloClient<NormalizedCacheObject>;

// Initializes the apollo client
export const initializeApollo = (
  initialState = null,
  ctx: NextPageContext = null
): ApolloClient<NormalizedCacheObject> => {
  // eslint-disable-next-line no-underscore-dangle
  const _apolloClient = apolloClient ?? createApolloClient(ctx);

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache);

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
};

export function useApollo(
  initialState: unknown
): ApolloClient<NormalizedCacheObject> {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}

import {
  HttpLink,
  ApolloLink,
  split,
  from,
  createHttpLink,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { onError } from '@apollo/client/link/error';
import { getMainDefinition } from '@apollo/client/utilities';
import { MultiAPILink } from '@habx/apollo-multi-endpoint-link';

// For when just using http protocols
export const httpLink = (): MultiAPILink => {
  return new MultiAPILink({
    endpoints: {
      orca: process.env.NEXT_PUBLIC_GRAPH_HTTP,
      png: 'https://api.thegraph.com/subgraphs/name/pangolindex/exchange',
    },
    createHttpLink: () => createHttpLink(),
    wsSuffix: '',
    httpSuffix: '',
  });
};

// For when using socket protocols
export const wsLink = (): MultiAPILink => {
  // Return out link with the headers
  return new MultiAPILink({
    endpoints: {
      orca: process.env.NEXT_PUBLIC_GRAPH_WS,
      png: 'wss://api.thegraph.com/subgraphs/name/pangolindex/exchange',
    },
    createHttpLink: () => createHttpLink(),
    createWsLink: (endpoint: string) =>
      new WebSocketLink({
        uri: endpoint,
        options: {
          reconnect: true,
        },
      }),
    wsSuffix: '',
    httpSuffix: '',
  });
};
// Good way to log any errors
export const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

// Chooses whether to use websockets or http
export const terminatingLink = (ssrMode: boolean): ApolloLink =>
  ssrMode
    ? from([errorLink, httpLink()])
    : from([
        errorLink,
        split(
          ({ query }) => {
            const definition = getMainDefinition(query);
            return (
              definition.kind === 'OperationDefinition' &&
              definition.operation === 'subscription'
            );
          },
          wsLink(),
          httpLink()
        ),
      ]);

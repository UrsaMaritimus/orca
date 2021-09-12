import { HttpLink, ApolloLink, split, from } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { onError } from '@apollo/client/link/error';
import { getMainDefinition } from '@apollo/client/utilities';
import { NextPageContext } from 'next';

// For when just using http protocols
export const httpLink = (ctx?: NextPageContext): HttpLink => {
  return new HttpLink({
    uri: 'https://api.thegraph.com/subgraphs/name/ursamaritimus/orcadao', // must be absolute for SSR to work
    fetch,
  });
};

// For when using socket protocols
export const wsLink = (): WebSocketLink => {
  // Return out link with the headers
  return new WebSocketLink({
    uri: 'wss://api.thegraph.com/subgraphs/name/ursamaritimus/orcadao',
    options: {
      reconnect: true,
    },
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
export const terminatingLink = (
  ssrMode: boolean,
  ctx?: NextPageContext
): ApolloLink =>
  ssrMode
    ? from([errorLink, httpLink(ctx)])
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
          httpLink(ctx)
        ),
      ]);

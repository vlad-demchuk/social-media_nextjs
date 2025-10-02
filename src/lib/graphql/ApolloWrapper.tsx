'use client';

import { ApolloLink, HttpLink } from '@apollo/client';
import { ApolloClient, ApolloNextAppProvider, InMemoryCache } from '@apollo/client-integration-nextjs';
import config from '@/lib/config';
import { createClient } from 'graphql-ws';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { authClient } from '@/lib/auth/auth-client';

function makeClient() {
  const httpLink = new HttpLink({
    uri: config.graphql.url,
    credentials: 'include',
  });

  const wsLink = new GraphQLWsLink(
    createClient({
      url: config.graphqlWs.url,
      connectionParams: async () => {
        // TODO: Implement token verification for websockets
        // At the moment it's kinda challenge since NextJs rewrites don't work for ws/wss protocol,
        // and the server placed on another domain, that is the issue for cookie. As a possible workaround - JWT token.
        // For now just skipping this passing the session object from client. NOT SECURE!!!

        const session = await authClient.getSession();
        if (!session) {
          return {};
        }

        return { session };
      },
      shouldRetry: (errOrCloseEvent) => {
        console.log('WebSocket retry check:', errOrCloseEvent);
        return true; // Retry on all errors for debugging
      },
      on: {
        connecting: () => {
          console.log('🔄 WebSocket connecting...');
        },
        opened: (socket) => {
          console.log('✅ WebSocket connection opened');
        },
        connected: (socket, payload) => {
          console.log('🎯 WebSocket connected with payload:', payload);
        },
        ping: (received, payload) => {
          console.log('🏓 WebSocket ping received:', payload);
        },
        pong: (sent, payload) => {
          console.log('🏓 WebSocket pong sent:', payload);
        },
        message: (message) => {
          console.log('📨 WebSocket message:', message);
        },
        closed: (event) => {
          console.log('🔒 WebSocket connection closed:', event);
        },
        error: (error) => {
          console.error('❌ WebSocket error:', error);
        },
      },
      // connectionParams: () => {
      //   // Get auth token from localStorage, cookies, or your auth system
      //   const token = typeof window !== 'undefined' ? localStorage.getItem('auth-token') : null;
      //   return {
      //     authorization: token ? `Bearer ${token}` : '',
      //     // You can also pass cookies if needed
      //     // cookie: document.cookie,
      //   };
      // },
      // shouldRetry: (errOrCloseEvent) => {
      //   // Retry on connection errors but not on auth errors
      //   return typeof errOrCloseEvent === 'object' && errOrCloseEvent.code !== 4401;
      // },
    }),
  );

  const splitLink = typeof window !== 'undefined' && wsLink != null ? ApolloLink.split(
    ({ query }) => {
      const def = getMainDefinition(query);
      return def.kind === 'OperationDefinition' && def.operation === 'subscription';
    },
    wsLink,
    httpLink,
  ) : httpLink;

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: splitLink,
    defaultOptions: {
      query: {
        errorPolicy: 'all',
      },
      watchQuery: {
        errorPolicy: 'all',
      },
    },
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}

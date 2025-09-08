import { HttpLink } from '@apollo/client';
import { SetContextLink } from '@apollo/client/link/context';
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from '@apollo/client-integration-nextjs';
import { cookies } from 'next/headers';

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  credentials: 'include',
});

const authLink = new SetContextLink(async (prevContext) => {
  const cookieStore = await cookies();

  return {
    headers: {
      ...prevContext.headers,
      Cookie: cookieStore.toString(),
    },
  };
});

export const { getClient, query } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  });
});

import { HttpLink } from '@apollo/client';
import { SetContextLink } from '@apollo/client/link/context';
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from '@apollo/client-integration-nextjs';
import { cookies } from 'next/headers';

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
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

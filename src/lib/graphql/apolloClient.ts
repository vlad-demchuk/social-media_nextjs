import { HttpLink } from '@apollo/client';
import { SetContextLink } from '@apollo/client/link/context';
import { ApolloClient, InMemoryCache, registerApolloClient } from '@apollo/client-integration-nextjs';
import { cookies } from 'next/headers';
import config from '@/lib/config';

if (!config.graphql.url) {
  throw new Error('GraphQL URL is not configured. Please check your environment variables.');
}

const httpLink = new HttpLink({
  uri: config.graphql.url,
  credentials: 'include',
});

const authLink = new SetContextLink(async (prevContext) => {
  try {
    const cookieStore = await cookies();
    return {
      headers: {
        ...prevContext.headers,
        Cookie: cookieStore.toString(),
      },
    };
  } catch (error) {
    console.error('Error setting auth context:', error);
    return { headers: prevContext.headers };
  }
});

export const { getClient, query } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
    defaultOptions: {
      query: {
        errorPolicy: 'all',
      },
      watchQuery: {
        errorPolicy: 'all',
      },
    },
  });
});

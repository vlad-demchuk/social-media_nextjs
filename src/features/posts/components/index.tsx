'use client';
import { query } from '@/lib/graphql/apolloClient';
import { GET_POSTS } from '@/graphql/queries/post';
import { List } from '@/features/posts/components/list';
import { useQuery } from '@apollo/client/react';

export default function Posts() {
  // const { data: postsData, error } = await query({
  //   query: GET_POSTS,
  // });

  const { data: postsData, error, loading } = useQuery(GET_POSTS);

  if (loading) return 'Loading';

  if (error || !postsData?.posts) return <>Something went wrong</>;

  return <List posts={postsData.posts} />;
};

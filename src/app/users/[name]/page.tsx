import Posts from '@/features/posts/components';
import { query } from '@/lib/graphql/apolloClient';
import { GET_USER_POSTS } from '@/graphql/queries/post';

export default async function UserPage({
  params,
}: {
  params: Promise<{ name: string }>
}) {
  const { name } = await params;

  const { data: postsData, error } = await query({
    query: GET_USER_POSTS,
    variables: { userName: name },
  });

  if (error || !postsData) return <>Something went wrong</>;

  return (
    <>
      <header className="flex justify-center items-center gap-4">
        <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
          {(name?.[0] || '?').toUpperCase()}
        </div>

        {name}
      </header>

      <Posts posts={postsData.userPosts} />
    </>
  );
}

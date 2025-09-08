import { Suspense } from 'react';
import Posts from '@/features/posts/components';
import { CreateForm } from '@/features/posts/components/create-form';
import { PostsSkeleton } from '@/features/posts/components/skeleton-list';

export default async function FeedPage() {
  return (
    <>
      {/* Create Post */}
      <CreateForm />

      {/* Posts Feed */}
      {/*<Suspense fallback={<PostsSkeleton count={3} />}>*/}
        <Posts />
      {/*</Suspense>*/}
    </>
  );
}

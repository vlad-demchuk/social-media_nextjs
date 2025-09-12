import { PostsSkeleton } from '@/features/posts/components/skeleton-list';

export default function UserLoader() {
  return (
    <PostsSkeleton count={1} />
  );
}

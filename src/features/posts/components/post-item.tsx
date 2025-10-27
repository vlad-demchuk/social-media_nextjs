import { Card, CardContent } from '@/components/ui/card';
import { ThreeDotMenu } from '@/features/posts/components/three-dot-menu';
import { deletePostById, likePostById, unlikePostById } from '@/features/posts/actions';
import { Button } from '@/components/ui/button';
import { MessageCircle, MoreHorizontal, Share } from 'lucide-react';
import { Post } from '@/graphql/generated/graphql';
import { Like } from '@/features/posts/components/like';
import { ReactNode } from 'react';
import Link from 'next/link';
import { PostDate } from '@/features/posts/components/post-date';

interface Props {
  post: Post;
  children?: ReactNode;
}

export const PostItem = ({ post, children }: Props) => {
  const deletePost = deletePostById.bind(null, post.id);
  const likePost = likePostById.bind(null, post.id);
  const unlikePost = unlikePostById.bind(null, post.id);

  return (
    <article key={post.id}>
      <Card className="hover:shadow-lg transition-all duration-200 p-6">
        <CardContent className="p-0">
          <div className="flex items-start space-x-4">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-muted-foreground text-sm">
                  {`@${post.owner.username}`}
                </span>
                <span className="text-muted-foreground text-sm">·</span>
                <span className="text-muted-foreground text-sm">
                  <PostDate createdAt={post.createdAt} />
                </span>

                <ThreeDotMenu
                  postUserName={post.owner.username}
                  onDelete={deletePost}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-auto h-8 w-8"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </ThreeDotMenu>

              </div>

              <p className="text-foreground mb-4 leading-relaxed">
                {post.content}
              </p>

              <div className="flex items-center justify-between max-w-md">
                <Link href={`/feed/${post.id}`}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-social-comment"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    {post.commentsCount}
                  </Button>
                </Link>

                <Like
                  postId={post.id}
                  isLiked={post.isLiked}
                  likesCount={post.likesCount}
                  onLike={likePost}
                  onUnlike={unlikePost}
                />


                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Share className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>

        {children}
      </Card>
    </article>
  );
};

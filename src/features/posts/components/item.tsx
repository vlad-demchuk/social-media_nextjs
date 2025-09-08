import { Card, CardContent } from '@/components/ui/card';
import { ThreeDotMenu } from '@/features/posts/components/three-dot-menu';
import { deletePostById, likePostById, unlikePostById } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { MessageCircle, MoreHorizontal, Share } from 'lucide-react';
import { Post } from '@/graphql/generated/graphql';
import { Like } from '@/features/posts/components/like';
import { ReactNode } from 'react';
import Link from 'next/link';

interface Props {
  post: Post;
  children?: ReactNode;
}

export const Item = ({ post, children }: Props) => {
  const deletePost = deletePostById.bind(null, post.id);
  const likePost = likePostById.bind(null, post.id);
  const unlikePost = unlikePostById.bind(null, post.id);

  return (
    <article key={post.id}>
      <Card className="hover:shadow-lg transition-all duration-200 p-6">
        <CardContent className="p-0">
          <div className="flex items-start space-x-4">
            {/*<Avatar>*/}
            {/*  <AvatarImage src={post.author.avatar} />*/}
            {/*  <AvatarFallback>{post.author.name[0]}</AvatarFallback>*/}
            {/*</Avatar>*/}

            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                {/*<h3 className="font-semibold">{post.author.name}</h3>*/}
                <span className="text-muted-foreground text-sm">
                      {`@${post.username}`}
                    </span>
                <span className="text-muted-foreground text-sm">
                      ·
                    </span>
                <span className="text-muted-foreground text-sm">
                      {post.createdAt}
                    </span>

                <ThreeDotMenu onDelete={deletePost}>
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

                {/*<Button*/}
                {/*  variant="ghost"*/}
                {/*  size="sm"*/}
                {/*  onClick={() => handleRepost(post.id)}*/}
                {/*  className={`text-muted-foreground hover:text-social-repost ${*/}
                {/*    post.reposted ? 'text-social-repost' : ''*/}
                {/*  }`}*/}
                {/*>*/}
                {/*  <Repeat2 className="h-4 w-4 mr-2" />*/}
                {/*  {post.reposts}*/}
                {/*</Button>*/}

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

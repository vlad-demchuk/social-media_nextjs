import { query } from '@/lib/graphql/apolloClient';
import { GET_NOTIFICATIONS } from '@/graphql/queries/notification';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { PostDate } from '@/features/posts/components/post-date';
import { Notification, NotificationType } from '@/graphql/generated/graphql';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function NotificationText({ n }: { n: Notification }) {
  const action = n.type === NotificationType.Like ? 'liked' : 'commented on';
  const target = n.entityType.toLowerCase();
  return (
    <>
      <span className="font-medium">@{n.actor.username}</span> {action} your {target}
    </>
  );
}

export default async function NotificationsPage() {
  const { data, error } = await query({
    query: GET_NOTIFICATIONS,
    context: { fetchOptions: { cache: 'no-store' } },
  });

  if (error || !data) {
    throw new Error('Failed to fetch notifications');
  }

  const notifications = data.notifications;

  return (
    <section className="space-y-4">
      {notifications.length === 0 && (
        <div className="text-muted-foreground">No notifications yet.</div>
      )}

      {notifications.map((n) => {
        const isPost = n.entityType.toUpperCase() === 'POST';
        const href = isPost ? `/feed/${n.entityId}` : undefined;

        return (
          <article key={n.id}>
            <Card className="hover:shadow-lg transition-all duration-200 p-4">
              <CardContent className="p-0">
                <div className="flex items-start space-x-3">
                  <Avatar className="h-8 w-8 mt-1">
                    <AvatarImage src={n.actor.image || undefined} />
                    <AvatarFallback>{n.actor.username[0]}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <NotificationText n={n} />
                      <span>·</span>
                      <PostDate createdAt={n.createdAt} />
                    </div>

                    {n.preview && (
                      <div className="text-foreground text-sm">
                        {href ? (
                          <Link href={href} className="hover:underline">
                            {n.preview}
                          </Link>
                        ) : (
                          <span>{n.preview}</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </article>
        );
      })}
    </section>
  );
}

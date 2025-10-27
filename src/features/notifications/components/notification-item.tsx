import { Notification, NotificationType } from '@/graphql/generated/graphql';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { PostDate } from '@/features/posts/components';
import { NotificationText } from './notification-text';
import { NotificationIcon } from './notification-icon';

interface NotificationItemProps {
  notification: Notification;
}

export function NotificationItem({ notification }: NotificationItemProps) {
  const isPost = notification.entityType.toUpperCase() === 'POST';
  const href = isPost ? `/feed/${notification.entityId}` : undefined;
  const showPreview = notification.type === NotificationType.Comment && notification.preview;

  return (
    <article>
      <Link href={href ?? ''}>
        <Card className="hover:shadow-lg transition-all duration-200 p-4">
          <CardContent className="p-0">
            <div className={`flex ${showPreview ? 'items-start' : 'items-center'} space-x-3`}>
              <div className="relative">
                <Avatar className={`h-8 w-8 ${showPreview ? 'mt-1' : ''}`}>
                  <AvatarImage src={notification.actor.image || undefined} />
                  <AvatarFallback>{notification.actor.username[0]}</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1">
                  <NotificationIcon type={notification.type} />
                </div>
              </div>

              <div className="flex-1">
                <div className={`flex items-center gap-2 text-sm text-muted-foreground ${showPreview ? 'mb-1' : ''}`}>
                  <NotificationText notification={notification} />
                  <span>·</span>
                  <PostDate createdAt={notification.createdAt} />
                </div>

                {showPreview && (
                  <div className="text-foreground text-sm">
                    <span>{notification.preview}</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </article>
  );
}

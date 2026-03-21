'use client';

import { useState } from 'react';
import { Bell } from 'lucide-react';
import { useLazyQuery } from '@apollo/client/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { GET_NOTIFICATIONS } from '@/graphql/queries/notification';
import { Notification } from '@/graphql/generated/graphql';
import { NotificationIcon } from './notification-icon';
import { NotificationText } from './notification-text';
import { PostDate } from '@/features/posts/components';

interface NotificationPopoverProps {
  notificationCount: number;
  onOpen: () => void;
}

function NotificationPopoverItem({
  notification,
  onClick,
}: {
  notification: Notification;
  onClick: (href: string) => void;
}) {
  const isPost = notification.entityType.toUpperCase() === 'POST';
  const href = isPost ? `/feed/${notification.entityId}` : undefined;

  return (
    <button
      onClick={() => href && onClick(href)}
      className="flex items-start gap-3 w-full p-3 text-left hover:bg-accent rounded-md transition-colors"
    >
      <div className="relative shrink-0">
        <Avatar className="h-8 w-8">
          <AvatarImage src={notification.actor.image || undefined} />
          <AvatarFallback>{notification.actor.username[0]}</AvatarFallback>
        </Avatar>
        <div className="absolute -bottom-1 -right-1">
          <NotificationIcon type={notification.type} />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm text-muted-foreground">
          <NotificationText notification={notification} />
        </div>
        <div className="text-xs text-muted-foreground/60 mt-0.5">
          <PostDate createdAt={notification.createdAt} />
        </div>
      </div>
    </button>
  );
}

export function NotificationPopover({
  notificationCount,
  onOpen,
}: NotificationPopoverProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [fetchNotifications, { data, loading, error }] =
    useLazyQuery(GET_NOTIFICATIONS, { fetchPolicy: 'network-only' });

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (nextOpen) {
      onOpen();
      fetchNotifications();
    }
  };

  const notifications = data?.notifications?.slice(0, 5) ?? [];

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" aria-label="Open notifications">
          <Bell className="h-5 w-5" />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground">
              {notificationCount > 99 ? '99+' : notificationCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0">
        <div className="p-3 border-b">
          <h3 className="font-semibold text-sm">Notifications</h3>
        </div>

        <div className="max-h-80 overflow-y-auto">
          {loading && (
            <div className="p-3 text-sm text-muted-foreground text-center">
              Loading...
            </div>
          )}

          {error && (
            <div className="p-3 text-sm text-destructive text-center">
              Failed to load notifications
            </div>
          )}

          {!loading && !error && data && notifications.length === 0 && (
            <div className="p-3 text-sm text-muted-foreground text-center">
              No notifications yet
            </div>
          )}

          {!loading &&
            !error &&
            notifications.map((notification) => (
              <NotificationPopoverItem
                key={notification.id}
                notification={notification}
                onClick={(href) => {
                  setOpen(false);
                  router.push(href);
                }}
              />
            ))}
        </div>

        <div className="p-2 border-t">
          <Link
            href="/notifications"
            onClick={() => setOpen(false)}
            className="block text-center text-sm text-primary hover:underline py-1"
          >
            View all
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
}

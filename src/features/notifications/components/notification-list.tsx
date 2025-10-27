import { Notification } from '@/graphql/generated/graphql';
import { NotificationItem } from './notification-item';

interface NotificationListProps {
  notifications: Notification[];
}

export function NotificationList({ notifications }: NotificationListProps) {
  if (notifications.length === 0) {
    return <div className="text-muted-foreground">No notifications yet.</div>;
  }

  return (
    <section className="space-y-4">
      {notifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </section>
  );
}

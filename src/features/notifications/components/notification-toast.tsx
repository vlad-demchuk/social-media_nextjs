import { NotificationText } from '@/features/notifications/components/notification-text';
import { Notification, NotificationType } from '@/graphql/generated/graphql';
import Link from 'next/link';

interface Props {
  notification: Notification;
}

export const NotificationToast = ({ notification }: Props) => {
  const showPreview = notification.type === NotificationType.Comment && notification.preview;
  const isPost = notification.entityType.toUpperCase() === 'POST';
  const href = isPost ? `/feed/${notification.entityId}` : undefined;

  return (
    <Link href={href ?? ''} className="block ">
      <NotificationText notification={notification} />

      {showPreview && (<div className="mt-2">{notification.preview}</div>)}
    </Link>
  );
};

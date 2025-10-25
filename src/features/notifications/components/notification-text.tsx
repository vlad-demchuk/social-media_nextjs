import { Notification, NotificationType } from '@/graphql/generated/graphql';

interface NotificationTextProps {
  notification: Notification;
}

export function NotificationText({ notification }: NotificationTextProps) {
  const action = notification.type === NotificationType.Like ? 'liked' : 'commented on';
  const target = notification.entityType.toLowerCase();
  
  return (
    <>
      <span className="font-medium">@{notification.actor.username}</span> {action} your {target}
    </>
  );
}

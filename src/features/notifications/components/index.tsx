import { Notification } from '@/graphql/generated/graphql';
import { NotificationList } from './list';

interface NotificationsProps {
  notifications: Notification[];
}

export default function Notifications({ notifications }: NotificationsProps) {
  return <NotificationList notifications={notifications} />;
}

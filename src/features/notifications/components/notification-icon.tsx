import { Heart, MessageCircle } from 'lucide-react';
import { NotificationType } from '@/graphql/generated/graphql';

interface NotificationIconProps {
  type: NotificationType;
}

export function NotificationIcon({ type }: NotificationIconProps) {
  if (type === NotificationType.Like) {
    return (
      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/20">
        <Heart className="w-3.5 h-3.5 text-red-600 dark:text-red-400 fill-current" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/20">
      <MessageCircle className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
    </div>
  );
}

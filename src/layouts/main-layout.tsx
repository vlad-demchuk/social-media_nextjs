'use client';

import { AppHeader } from '@/components/app-header';
import { Navigation } from '@/components/navigation';
import { cn } from '@/lib/utils';
import { useSubscription } from '@apollo/client/react';
import { toast } from 'sonner';
import { NOTIFICATION_ADDED_SUBSCRIPTION } from '@/graphql/queries/notification';
import { GET_CONVERSATION_MESSAGES, MESSAGE_ADDED_SUBSCRIPTION } from '@/graphql/queries/message';
import { authClient } from '@/lib/auth/auth-client';
import { NotificationToast } from '@/features/notifications/components/notification-toast';
import { MessageToast } from '@/features/messages/components/message-toast';

export default function MainLayout({
  containerClassNames,
  children,
}: Readonly<{
  children: React.ReactNode;
  containerClassNames?: string;
}>) {
  const { data: session } = authClient.useSession();
  const userId = session?.user.id ? Number(session?.user.id) : null;

  const notificationSubscription = useSubscription(NOTIFICATION_ADDED_SUBSCRIPTION, {
    onData: ({ data }) => {
      if (data?.data?.notificationAdded) {
        const notification = data.data.notificationAdded;

        toast.message(<NotificationToast notification={notification} />);
      }
    },
  });

  const messageSubscription = useSubscription(MESSAGE_ADDED_SUBSCRIPTION, {
    // skip: pathname === '/messages',
    onData: ({ data, client }) => {
      console.log('New message received:', data?.data?.messageAdded);

      const newMessage = data?.data?.messageAdded;
      if (!newMessage) return;

      if (newMessage.sender.id !== userId) {
        toast(<MessageToast message={newMessage} />);
      }

      client.cache.updateQuery(
        {
          query: GET_CONVERSATION_MESSAGES,
          variables: { conversationId: newMessage.conversationId },
        },
        (prev) => {
          if (!prev?.conversationMessages) return prev;

          if (prev.conversationMessages.some(m => m.id === newMessage.id)) return prev;

          return {
            ...prev,
            conversationMessages: [...prev.conversationMessages, newMessage],
          };
        },
      );
    },
  });

  return (
    <div
      className={cn(
        'h-screen lg:min-h-screen lg:h-auto grid grid-rows-[auto_1fr_auto] lg:grid-rows-[auto_1fr] bg-gradient-hero',
        containerClassNames,
      )}
    >
      {/* Top Navigation */}
      <AppHeader />

      {/* Middle Zone */}
      <div className="max-w-7xl row w-full mx-auto lg:px-8 overflow-y-auto lg:overflow-y-visible">
        <div className="h-full flex">
          {/* Left Navigation */}
          <Navigation placement="left" />

          {/* Scrollable Feed */}
          <main className="grow space-y-6 p-6">
            {children}
          </main>
        </div>
      </div>

      {/* Bottom Navigation (mobile) */}
      <Navigation placement="bottom" />
    </div>
  );
}

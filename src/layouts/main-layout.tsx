'use client';

import { AppHeader } from '@/components/app-header';
import { Navigation } from '@/components/navigation';
import { cn } from '@/lib/utils';
import { useSubscription } from '@apollo/client/react';
import { toast } from 'sonner';
import { NOTIFICATION_ADDED_SUBSCRIPTION } from '@/graphql/queries/notification';

export default function MainLayout({
  containerClassNames,
  children,
}: Readonly<{
  children: React.ReactNode;
  containerClassNames?: string;
}>) {
    const subscription = useSubscription(NOTIFICATION_ADDED_SUBSCRIPTION, {
    onData: ({ data }) => {
      console.log('New notification received:', data?.data?.notificationAdded);
      data?.data?.notificationAdded && toast(data?.data?.notificationAdded?.preview)
    },
  });

  return (
    <div className={cn("h-screen lg:min-h-screen lg:h-auto grid grid-rows-[auto_1fr_auto] lg:grid-rows-[auto_1fr] bg-gradient-hero", containerClassNames)}>
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

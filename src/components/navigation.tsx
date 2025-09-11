'use client';

import { SideNav } from '@/components/side-nav';
import { BottomNav } from '@/components/bottom-nav';
import { authClient } from '@/lib/auth/auth-client';
import { Bell, MessageCircle, Newspaper, User } from 'lucide-react';

export const Navigation = () => {
  const { data: session, isPending } = authClient.useSession();

  const navItems = [
    { id: 'profile', icon: User, label: 'Profile', href: `/users/${session?.user?.name}` },
    { id: 'explore', icon: Newspaper, label: 'Feed', href: '/feed' },
    { id: 'notifications', icon: Bell, label: 'Notifications', href: '/notifications' },
    { id: 'messages', icon: MessageCircle, label: 'Messages', href: '/messages' },
  ];

  return (
    <>
      <SideNav
        navItems={navItems}
        isLoading={isPending}
      />
      <BottomNav
        navItems={navItems}
        isLoading={isPending}
      />
    </>
  );
};

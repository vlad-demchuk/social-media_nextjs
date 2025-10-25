import { query } from '@/lib/graphql/apolloClient';
import { GET_NOTIFICATIONS } from '@/graphql/queries/notification';
import Notifications from '@/features/notifications/components';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function NotificationsPage() {
  const { data, error } = await query({
    query: GET_NOTIFICATIONS,
    context: { fetchOptions: { cache: 'no-store' } },
  });

  if (error || !data) {
    throw new Error('Failed to fetch notifications');
  }

  const notifications = data.notifications;

  return <Notifications notifications={notifications} />;
}

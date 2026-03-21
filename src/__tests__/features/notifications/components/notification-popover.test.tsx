import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NotificationPopover } from '@/features/notifications/components/notification-popover';
import { NotificationType } from '@/graphql/generated/graphql';

const mockPush = jest.fn();
const mockFetchNotifications = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    refresh: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

jest.mock('@apollo/client/react', () => ({
  useLazyQuery: () => [
    mockFetchNotifications,
    { data: null, loading: false, error: undefined },
  ],
}));

jest.mock('@/features/notifications/components/notification-icon', () => ({
  NotificationIcon: () => <span data-testid="notification-icon" />,
}));

jest.mock('@/features/notifications/components/notification-text', () => ({
  NotificationText: ({ notification }: { notification: { actor: { username: string } } }) => (
    <span>@{notification.actor.username} liked your post</span>
  ),
}));

jest.mock('@/features/posts/components', () => ({
  PostDate: () => <span>just now</span>,
}));

const mockNotification = {
  id: 1,
  recipientId: 2,
  actor: {
    id: 3,
    username: 'testuser',
    email: 'test@test.com',
    image: null,
    createdAt: '2026-03-20T00:00:00Z',
    emailVerified: true,
    updatedAt: '2026-03-20T00:00:00Z',
  },
  type: NotificationType.Like,
  entityId: 10,
  entityType: 'POST',
  preview: null,
  read: false,
  createdAt: '2026-03-20T00:00:00Z',
};

describe('NotificationPopover', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders bell button with aria-label', () => {
    render(<NotificationPopover notificationCount={0} onOpen={jest.fn()} />);

    expect(screen.getByRole('button', { name: /open notifications/i })).toBeInTheDocument();
  });

  test('hides badge when notification count is 0', () => {
    render(<NotificationPopover notificationCount={0} onOpen={jest.fn()} />);

    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });

  test('shows badge with count when notifications exist', () => {
    render(<NotificationPopover notificationCount={5} onOpen={jest.fn()} />);

    expect(screen.getByText('5')).toBeInTheDocument();
  });

  test('shows 99+ when count exceeds 99', () => {
    render(<NotificationPopover notificationCount={150} onOpen={jest.fn()} />);

    expect(screen.getByText('99+')).toBeInTheDocument();
  });

  test('calls onOpen when popover is opened', async () => {
    const user = userEvent.setup();
    const onOpen = jest.fn();

    render(<NotificationPopover notificationCount={3} onOpen={onOpen} />);

    await user.click(screen.getByRole('button', { name: /open notifications/i }));

    expect(onOpen).toHaveBeenCalledTimes(1);
  });

  test('fetches notifications when popover is opened', async () => {
    const user = userEvent.setup();

    render(<NotificationPopover notificationCount={0} onOpen={jest.fn()} />);

    await user.click(screen.getByRole('button', { name: /open notifications/i }));

    expect(mockFetchNotifications).toHaveBeenCalledTimes(1);
  });

  test('shows "View all" link to /notifications', async () => {
    const user = userEvent.setup();

    render(<NotificationPopover notificationCount={0} onOpen={jest.fn()} />);

    await user.click(screen.getByRole('button', { name: /open notifications/i }));

    const viewAllLink = screen.getByRole('link', { name: /view all/i });
    expect(viewAllLink).toBeInTheDocument();
    expect(viewAllLink).toHaveAttribute('href', '/notifications');
  });
});

describe('NotificationPopover with notifications', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    jest.spyOn(require('@apollo/client/react'), 'useLazyQuery').mockReturnValue([
      mockFetchNotifications,
      {
        data: { notifications: [mockNotification] },
        loading: false,
        error: undefined,
      },
    ]);
  });

  test('renders notification items when data is loaded', async () => {
    const user = userEvent.setup();

    render(<NotificationPopover notificationCount={0} onOpen={jest.fn()} />);

    await user.click(screen.getByRole('button', { name: /open notifications/i }));

    expect(screen.getByText(/@testuser liked your post/)).toBeInTheDocument();
  });

  test('navigates to /feed/{entityId} when notification is clicked', async () => {
    const user = userEvent.setup();

    render(<NotificationPopover notificationCount={0} onOpen={jest.fn()} />);

    await user.click(screen.getByRole('button', { name: /open notifications/i }));
    await user.click(screen.getByText(/@testuser liked your post/));

    expect(mockPush).toHaveBeenCalledWith('/feed/10');
  });
});

describe('NotificationPopover loading and error states', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('shows loading state', async () => {
    jest.spyOn(require('@apollo/client/react'), 'useLazyQuery').mockReturnValue([
      mockFetchNotifications,
      { data: null, loading: true, error: undefined },
    ]);

    const user = userEvent.setup();

    render(<NotificationPopover notificationCount={0} onOpen={jest.fn()} />);

    await user.click(screen.getByRole('button', { name: /open notifications/i }));

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('shows error state', async () => {
    jest.spyOn(require('@apollo/client/react'), 'useLazyQuery').mockReturnValue([
      mockFetchNotifications,
      { data: null, loading: false, error: new Error('Network error') },
    ]);

    const user = userEvent.setup();

    render(<NotificationPopover notificationCount={0} onOpen={jest.fn()} />);

    await user.click(screen.getByRole('button', { name: /open notifications/i }));

    expect(screen.getByText('Failed to load notifications')).toBeInTheDocument();
  });

  test('shows empty state when data is loaded but empty', async () => {
    jest.spyOn(require('@apollo/client/react'), 'useLazyQuery').mockReturnValue([
      mockFetchNotifications,
      { data: { notifications: [] }, loading: false, error: undefined },
    ]);

    const user = userEvent.setup();

    render(<NotificationPopover notificationCount={0} onOpen={jest.fn()} />);

    await user.click(screen.getByRole('button', { name: /open notifications/i }));

    expect(screen.getByText('No notifications yet')).toBeInTheDocument();
  });
});

describe('NotificationPopover limits to 5 notifications', () => {
  test('renders only 5 items when more are available', async () => {
    const notifications = Array.from({ length: 8 }, (_, i) => ({
      ...mockNotification,
      id: i + 1,
      actor: { ...mockNotification.actor, username: `user${i + 1}` },
    }));

    jest.spyOn(require('@apollo/client/react'), 'useLazyQuery').mockReturnValue([
      mockFetchNotifications,
      { data: { notifications }, loading: false, error: undefined },
    ]);

    const user = userEvent.setup();

    render(<NotificationPopover notificationCount={0} onOpen={jest.fn()} />);

    await user.click(screen.getByRole('button', { name: /open notifications/i }));

    const items = screen.getAllByText(/@user\d+ liked your post/);
    expect(items).toHaveLength(5);
  });
});

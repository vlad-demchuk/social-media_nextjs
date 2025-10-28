import { Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserSearchPopover } from '@/components/user-search-popover';

export const AppHeader = () => {
  return (
    <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-sm shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-primary">SocialFlow</h1>
          </div>

          <div className="flex-1 max-w-lg mx-8">
            <UserSearchPopover />
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
            >
              <Bell className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
            >
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

'use client';

import { Search } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { UserSearch } from '@/components/user-search';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const UserSearchPopover = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleUserSelect = (username: string) => {
    router.push(`/users/${username}`);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative cursor-pointer">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search users..."
            className="w-full pl-10 pr-4 py-2 bg-muted rounded-full border-0 focus:ring-2 focus:ring-primary focus:outline-none cursor-pointer"
            readOnly
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-3">
        <UserSearch
          onUserSelect={handleUserSelect}
          placeholder="Search users..."
        />
      </PopoverContent>
    </Popover>
  );
};

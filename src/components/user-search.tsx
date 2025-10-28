'use client';

import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useState } from 'react';
import { useLazyQuery } from '@apollo/client/react';
import { SEARCH_USER } from '@/graphql/queries/user';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SearchUserQuery } from '@/graphql/generated/graphql';

type User = SearchUserQuery['searchUser'][0];

interface Props {
  onUserSelect: (username: string) => void;
  placeholder?: string;
}

export const UserSearch = ({ onUserSelect, placeholder = 'Search users...' }: Props) => {
  const [search, setSearch] = useState('');
  const [searchUsers, { data, loading }] = useLazyQuery<SearchUserQuery>(SEARCH_USER);

  const handleSearch = (value: string) => {
    setSearch(value);
    if (value.length > 1) {
      searchUsers({ variables: { query: value } });
    }
  };

  return (
    <div className="space-y-2">
      <Input
        placeholder={placeholder}
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
      />

      <ScrollArea className="h-64">
        {loading ? (
          <p className="text-sm text-muted-foreground px-2">Searching...</p>
        ) : data?.searchUser.length ? (
          <ul className="divide-y divide-muted">
            {data.searchUser.map((user: User) => (
              <li
                key={user.id}
                className="flex items-center gap-2 py-2 px-2 hover:bg-accent rounded-lg cursor-pointer"
                onClick={() => onUserSelect(user.username)}
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.image || undefined} />
                  <AvatarFallback>{user.username[0]}</AvatarFallback>
                </Avatar>
                <span className="text-sm">{user.username}</span>
              </li>
            ))}
          </ul>
        ) : search.length > 1 ? (
          <p className="text-sm text-muted-foreground px-2">No users found.</p>
        ) : (
          <p className="text-sm text-muted-foreground px-2">Type to search...</p>
        )}
      </ScrollArea>
    </div>
  );
};

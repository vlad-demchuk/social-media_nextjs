import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { MessageSquarePlus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client/react';
import { CREATE_CONVERSATION } from '@/graphql/queries/conversation';
import { SEARCH_USER } from '@/graphql/queries/user';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Conversation } from '@/graphql/generated/graphql';

interface Props {
  onConversationSelect: (conversation: Conversation) => void
}

export const NewConversation = ({ onConversationSelect }: Props) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [searchUsers, { data, loading }] = useLazyQuery(SEARCH_USER);
  const [createConversation, { loading: creating }] = useMutation(CREATE_CONVERSATION);

  const handleSearch = (value: string) => {
    setSearch(value);
    if (value.length > 1) {
      searchUsers({ variables: { query: value } });
    }
  };

  const handleCreate = async (userId: number) => {
    const response = await createConversation({ variables: { userId } });
    console.log('>>>>> response:', response);
    if (response?.data?.createConversation.success) {
      // TODO: Change response to return conversation in proper format
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      onConversationSelect({ id: response?.data?.createConversation?.conversationId });
      setOpen(false)
      setSearch('');
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-auto"
        >
          <MessageSquarePlus className="size-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-72 p-3">
        <div className="space-y-2">
          <Input
            placeholder="Search users..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />

          <ScrollArea className="h-64">
            {loading ? (
              <p className="text-sm text-muted-foreground px-2">Searching...</p>
            ) : data?.searchUser.length ? (
              <ul className="divide-y divide-muted">
                {data.searchUser.map((user) => (
                  <li
                    key={user.id}
                    className="flex items-center justify-between py-2 px-2 hover:bg-accent rounded-lg cursor-pointer"
                    onClick={() => handleCreate(user.id)}
                  >
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.image || undefined} />
                        <AvatarFallback>{user.username[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{user.username}</span>
                    </div>
                    <Button
                      size="sm"
                      disabled={creating}
                    >
                      Chat
                    </Button>
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
      </PopoverContent>
    </Popover>
  );
};

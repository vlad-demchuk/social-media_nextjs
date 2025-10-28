import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { MessageSquarePlus } from 'lucide-react';
import { useState } from 'react';
import { useMutation } from '@apollo/client/react';
import { CREATE_CONVERSATION } from '@/graphql/queries/conversation';
import { Conversation, CreateConversationMutation } from '@/graphql/generated/graphql';
import { UserSearchWithAction } from '@/components/user-search-with-action';

interface Props {
  onConversationSelect: (conversation: Conversation) => void;
}

export const NewConversation = ({ onConversationSelect }: Props) => {
  const [open, setOpen] = useState(false);
  const [createConversation, { loading: creating }] = useMutation<CreateConversationMutation>(CREATE_CONVERSATION);

  const handleCreate = async (userId: number) => {
    const response = await createConversation({ variables: { userId } });
    const conversation = response?.data?.createConversation?.conversation;
    
    if (response?.data?.createConversation.success && conversation) {
      onConversationSelect(conversation);
      setOpen(false);
    }
  };

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
    >
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
        <UserSearchWithAction
          onUserSelect={handleCreate}
          placeholder="Search users..."
          actionLabel="Chat"
          actionLoading={creating}
        />
      </PopoverContent>
    </Popover>
  );
};

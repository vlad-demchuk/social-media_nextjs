import { Conversation as IConversation } from '@/graphql/generated/graphql';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SendHorizonal } from 'lucide-react';
import { MessageList } from '@/features/messages/components/message-list';

interface Props {
  conversation: IConversation | null;
}

export const Conversation = ({ conversation }: Props) => {
  const { type, participants } = conversation || {};
  const isDirect = type === 'direct';
  const participant = isDirect ? participants?.[0] : null;

  if (!conversation) {
    return (<div className="flex items-center justify-center">Select a chat to start messaging</div>);
  }

  return (
    <section className="h-full grid grid-rows-[auto_1fr_auto]">
      <header className="p-3 border-b">
        <h3>{participant?.username}</h3>
      </header>

      <MessageList conversationId={conversation.id} />

      <footer className="flex justify-center items-center">
        <Input
          className="size-full border-none focus-visible:ring-0 bg-transparent! ring-0 shadow-none outline-none rounded-none"
          placeholder="Write a message..."
        />

        <Button
          variant="secondary"
          size="icon"
          className="size-8 m-1"
        >
          <SendHorizonal />
        </Button>
      </footer>
    </section>
  );
};

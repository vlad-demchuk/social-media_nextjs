import { Conversation as IConversation } from '@/graphql/generated/graphql';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SendHorizonal } from 'lucide-react';
import { MessageList } from '@/features/messages/components/message-list';
import { useMutation } from '@apollo/client/react';
import { CREATE_CONVERSATION_MESSAGE, GET_CONVERSATION_MESSAGES } from '@/graphql/queries/message';
import { FormEvent, useState } from 'react';

interface Props {
  conversation: IConversation | null;
}

export const Conversation = ({ conversation }: Props) => {
  const [message, setMessage] = useState('');

  // TODO: Implement optimistic update to avoid delay
  const [sendMessage, { data, loading, error }] = useMutation(CREATE_CONVERSATION_MESSAGE, {
    refetchQueries: [GET_CONVERSATION_MESSAGES],
  });

  const { type, participants } = conversation || {};
  const isDirect = type === 'direct';
  const participant = isDirect ? participants?.[0] : null;

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();

    if (!conversation?.id) return;

    try {
      await sendMessage({ variables: { conversationId: conversation?.id, content: message } });
      setMessage('');
    } catch (e) {
      console.error(e);
    }
  };

  if (!conversation) {
    return (<div className="h-full flex items-center justify-center">Select a chat to start messaging</div>);
  }

  return (
    <section className="h-full grid grid-rows-[auto_1fr_auto]">
      <header className="p-3 border-b">
        <h3>{participant?.username}</h3>
      </header>

      <MessageList conversationId={conversation.id} />

      <footer className="flex justify-center items-center">
        <form
          className="flex size-full"
          onSubmit={handleSendMessage}
        >
          <Input
            type="text"
            className="size-full border-none focus-visible:ring-0 bg-transparent! ring-0 shadow-none outline-none rounded-none"
            placeholder="Write a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <Button
            variant="secondary"
            size="icon"
            className="size-8 m-1"
            type="submit"
          >
            <SendHorizonal />
          </Button>
        </form>
      </footer>
    </section>
  );
};

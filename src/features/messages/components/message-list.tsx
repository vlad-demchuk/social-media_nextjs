import { useQuery } from '@apollo/client/react';
import { GET_CONVERSATION_MESSAGES } from '@/graphql/queries/message';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { authClient } from '@/lib/auth/auth-client';
import { MessageListSkeleton } from './skeletons';

interface Props {
  conversationId: number;
}

export const MessageList = ({ conversationId }: Props) => {
  const { data: messagesData, loading } = useQuery(GET_CONVERSATION_MESSAGES, { variables: { conversationId } });
  const { data: session } = authClient.useSession();

  const checkIsMyMessage = (messageUserId: number) => {
    if (!session?.user?.id) return false;

    return Number(session.user.id) === messageUserId;
  };


  if (loading) {
    return <MessageListSkeleton />;
  }

  return (
    <ScrollArea className="border-b p-2 overflow-y-hidden">
      <section className="flex flex-col gap-2">
        {messagesData?.conversationMessages.map((message) => (
          // <div key={message.id}>{message.content} - {new Date(message.createdAt).toLocaleString()}</div>

          <article
            key={message.id}
            className={`flex items-start gap-3 ${checkIsMyMessage(message.sender.id)
              ? 'justify-start'
              : 'flex-row-reverse'}`}
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src={message.sender.image || undefined} />
              <AvatarFallback>{message.sender.username[0]}</AvatarFallback>
            </Avatar>
            <div
              className={`rounded-2xl px-4 py-2 max-w-[70%] text-sm ${
                checkIsMyMessage(message.sender.id)
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {message.content}
            </div>
          </article>

        ))}
      </section>
    </ScrollArea>
  );
};

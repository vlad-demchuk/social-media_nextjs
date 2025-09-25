import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Conversation } from '@/graphql/generated/graphql';
import { NewConversation } from '@/features/messages/components/new-conversation';

interface Props {
  conversations: Conversation[],
  isLoading: boolean,
  selectedConversation: Conversation | null,
  onConversationSelect: (conversation: Conversation) => void
}

export const SidebarList = ({ conversations, isLoading, selectedConversation, onConversationSelect }: Props) => {
  if (isLoading) return 'Loading...';

  return (
    <section className="h-full">
      <header className="border-b px-3 py-2 flex items-center justify-between">
        <h3 className="text-sm font-semibold">Inbox</h3>
        <div className="flex gap-1">
          {/*<Archive className="h-4 w-4 text-muted-foreground" />*/}
          {/*<Trash2 className="h-4 w-4 text-muted-foreground" />*/}
          <NewConversation onConversationSelect={onConversationSelect} />
        </div>
      </header>

      <ScrollArea className="h-[calc(100%-40px)]">
        <div className="divide-y">
          {conversations.map((conversation) => (
            <button
              key={conversation.id}
              onClick={() => onConversationSelect(conversation)}
              className={`cursor-pointer w-full px-3 py-3 text-left hover:bg-accent/50 transition-colors ${
                selectedConversation?.id === conversation.id ? 'bg-accent/50' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={conversation.participants[0].image || undefined} />
                  <AvatarFallback className="text-xs">
                    {conversation.participants[0].username[0]}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-sm">
                      {conversation.participants[0].username}
                    </span>
                    <span className="text-xs text-muted-foreground truncate">
                      {new Date(conversation.lastMessage?.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground truncate">
                    {conversation.lastMessage?.content}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </section>
  );
};

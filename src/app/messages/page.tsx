'use client';

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { SidebarList } from '@/features/messages/components/sidebar-list';
import { Conversation } from '@/features/messages/components/conversation';
import { useState } from 'react';
import { useQuery, useSubscription } from '@apollo/client/react';
import { CONVERSATIONS_UPDATED_SUBSCRIPTION, GET_CONVERSATIONS } from '@/graphql/queries/conversation';
import { Conversation as IConversation, GetConversationsQuery } from '@/graphql/generated/graphql';
import { toast } from 'sonner';
import { authClient } from '@/lib/auth/auth-client';

export default function MessagesPage() {
  const { data: session } = authClient.useSession();
  const userId = session?.user.id ? Number(session?.user.id) : null;

  const [selectedConversation, setSelectedConversation] = useState<IConversation | null>(null);

  const { data: conversationsData, loading } = useQuery(GET_CONVERSATIONS, {
    fetchPolicy: 'network-only',
  });

  const conversationsSubscription = useSubscription(CONVERSATIONS_UPDATED_SUBSCRIPTION, {
    onData: ({ data, client }) => {
      console.log('Updated conversation:', data?.data?.conversationsUpdated);
      const updatedConversation = data?.data?.conversationsUpdated;

      if (!updatedConversation) return;

      if (data?.data?.conversationsUpdated) {
        const updated = data.data.conversationsUpdated;

        client.cache.updateQuery<GetConversationsQuery>({ query: GET_CONVERSATIONS }, (existing) => {
          if (!existing) return;
          const filtered = existing.conversations.filter(c => c.id !== updated.id);
          return {
            ...existing,
            conversations: [updated, ...filtered],
          } as GetConversationsQuery;
        });
      }
    },
  });

  const handleSelectConversation = (conversation: IConversation) => {
    setSelectedConversation(conversation);
  };

  return (
    <>
      <ResizablePanelGroup
        className="h-full max-h-[calc(100vh-theme(spacing.16)-(theme(spacing.8)*2))] rounded-lg border overflow-y-hidden"
        direction="horizontal"
        autoSaveId="socialMediaConversationDimensions"
      >
        <ResizablePanel
          defaultSize={30}
          minSize={20}
          maxSize={60}
        >
          <SidebarList
            conversations={conversationsData?.conversations || []}
            isLoading={loading}
            selectedConversation={selectedConversation}
            onConversationSelect={handleSelectConversation}
          />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={70}>
          <Conversation conversation={selectedConversation} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
}

'use client';

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { SidebarList } from '@/features/messages/components/sidebar-list';
import { Conversation } from '@/features/messages/components/conversation';
import { useState } from 'react';
import { useQuery, useSubscription } from '@apollo/client/react';
import { GET_CONVERSATIONS } from '@/graphql/queries/conversation';
import { Conversation as IConversation } from '@/graphql/generated/graphql';
import { MESSAGE_ADDED_SUBSCRIPTION } from '@/graphql/queries/message';
import { toast } from 'sonner';

export default function MessagesPage() {
  const subscription = useSubscription(MESSAGE_ADDED_SUBSCRIPTION, {
    onData: ({ data }) => {
      console.log('New message received:', data?.data?.messageAdded);
      data?.data?.messageAdded && toast(data?.data?.messageAdded.content)
    },
  });


  const [selectedConversation, setSelectedConversation] = useState<IConversation | null>(null);

  const { data: conversationsData, loading } = useQuery(GET_CONVERSATIONS);

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

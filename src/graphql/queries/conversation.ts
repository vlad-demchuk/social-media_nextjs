import { gql } from '@/graphql/generated';

export const GET_CONVERSATIONS = gql(`
  query GetConversations {
    conversations {
      id
      type
      name
      createdAt
      lastMessage {
        id
        content
        createdAt
        sender {
          id
          username
          image
        }
      }
      participants {
        id
        username
        image
      }
    }
  }
`);

export const GET_CONVERSATION_MESSAGES = gql(`
  query ConversationMessages($conversationId: Int!) {
    conversationMessages(conversationId: $conversationId) {
      id
      content
      createdAt
      updatedAt
      sender {
        id
        username
        image
      }
    }
  }
`)

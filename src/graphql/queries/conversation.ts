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
        updatedAt
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

export const CREATE_CONVERSATION = gql(`
  mutation CreateConversation($userId: Int!) {
    createConversation(userId: $userId) {
      code
      success
      message
      conversationId
    }
  }
`)

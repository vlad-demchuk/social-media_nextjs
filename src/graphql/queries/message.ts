import { gql } from '@/graphql/generated';

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
`);

export const CREATE_CONVERSATION_MESSAGE = gql(`
  mutation CreateMessage($conversationId: Int!, $content: String!) {
    createMessage(conversationId: $conversationId, content: $content) {
      code
      success
      message
      createdMessage {
        id
        content
        createdAt
        updatedAt
      }
    }
  }
`)

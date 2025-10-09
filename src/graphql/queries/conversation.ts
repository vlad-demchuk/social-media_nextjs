import { gql } from '@/graphql/generated';

export const GET_CONVERSATIONS = gql(`
  query GetConversations {
    conversations {
      id
      type
      name
      createdAt
      creator {
        id
        username
        email
        createdAt
        emailVerified
        image
        updatedAt
      }
      participants {
        id
        username
        email
        createdAt
        emailVerified
        image
        updatedAt
      }
      lastMessage {
        id
        conversationId
        content
        createdAt
        updatedAt
        sender {
          id
          username
          email
          createdAt
          emailVerified
          image
          updatedAt
        }
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
      conversation {
        id
        type
        name
        createdAt
        creator {
          id
          username
          email
          createdAt
          emailVerified
          image
          updatedAt
        }
        participants {
          id
          username
          email
          createdAt
          emailVerified
          image
          updatedAt
        }
        lastMessage {
          id
          conversationId
          content
          createdAt
          updatedAt
          sender {
            id
            username
            email
            createdAt
            emailVerified
            image
            updatedAt
          }
        }
      }
    }
  }
`);

export const CONVERSATIONS_UPDATED_SUBSCRIPTION = gql(`
  subscription ConversationsUpdated {
    conversationsUpdated {
      id
      type
      name
      createdAt
      creator {
        id
        username
        email
        createdAt
        emailVerified
        image
        updatedAt
      }
      participants {
        id
        username
        email
        createdAt
        emailVerified
        image
        updatedAt
      }
      lastMessage {
        id
        conversationId
        content
        createdAt
        updatedAt
        sender {
          id
          username
          email
          createdAt
          emailVerified
          image
          updatedAt
        }
      }
    }
  }
`)

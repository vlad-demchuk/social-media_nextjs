import { gql } from '@/graphql/generated';

export const GET_CONVERSATIONS = gql(`
  query GetConversations {
    conversations {
      id
      type
      name
      createdAt
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
`)

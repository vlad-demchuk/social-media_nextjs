import { gql } from '@/graphql/generated';

export const NOTIFICATION_ADDED_SUBSCRIPTION = gql(`
  subscription NotificationAdded {
    notificationAdded {
      recipientId
      actor {
        id
        username
        email
        createdAt
        emailVerified
        image
        updatedAt
      }
      type
      entityId
      entityType
      preview
    }
  }
`)

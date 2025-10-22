import { gql } from '@/graphql/generated';

export const GET_NOTIFICATIONS = gql(`
  query Notifications {
    notifications {
      id
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
      read
      createdAt
    }
  }
`)

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

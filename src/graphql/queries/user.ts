import { gql } from '@/graphql/generated';

export const SEARCH_USER = gql(`
  query SearchUser($query: String!) {
    searchUser(query: $query) {
      id
      username
      email
      createdAt
      emailVerified
      image
      updatedAt
    }
  }
`)

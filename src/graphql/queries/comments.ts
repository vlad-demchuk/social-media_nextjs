import { gql } from '@/graphql/generated';

export const GET_POST_COMMENTS = gql(`
  query GetPostComments($postId: Int!) {
    comments(postId: $postId) {
      id
      content
      createdAt
      username
    }
  }
`)

export const CREATE_COMMENT = gql(`
  mutation CreateComment($input: CreateCommentInput!) {
    createComment(input: $input) {
      code
      success
      message
      comment {
        id
        content
        createdAt
        username
      }
    }
  }
`)

export const DELETE_COMMENT = gql(`
  mutation DeleteComment($commentId: Int!) {
    deleteComment(commentId: $commentId) {
      code
      success
      message
      commentId
    }
  }
`)

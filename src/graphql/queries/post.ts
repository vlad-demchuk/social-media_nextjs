import { gql } from '@/graphql/generated';

export const GET_POSTS = gql(`
  query GetPosts {
    posts {
      id
      content
      createdAt
      username
      likesCount
      commentsCount
    }
  }
`);

export const CREATE_POST = gql(`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      code
      success
      message
      post {
        id
        content
        createdAt
        username
        likesCount
        commentsCount
      }
    }
  }
`);

export const DELETE_POST = gql(`
  mutation DeletePost($postId: Int!) {
    deletePost(postId: $postId) {
      code
      success
      message
      postId
    }
  }
`);

export const LIKE_POST = gql(`
  mutation LikePost($postId: Int!) {
    likePost(postId: $postId) {
      code
      success
      message
      post {
        id
        content
        createdAt
        username
        likesCount
        commentsCount
      }
    }
  }
`)

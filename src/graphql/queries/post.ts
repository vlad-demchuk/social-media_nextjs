import { gql } from '@/graphql/generated';

export const GET_POSTS = gql(`
  query GetPosts {
    posts {
      id
      content
      createdAt
      owner {
        id
        username
        email
        image
        createdAt
        updatedAt
        emailVerified
      }
      likesCount
      commentsCount
      isLiked
    }
  }
`);

export const GET_USER_POSTS = gql(`
  query GetUserPosts($userName: String!) {
    userPosts(userName: $userName) {
      id
      content
      createdAt
      owner {
        id
        username
        email
        image
        createdAt
        updatedAt
        emailVerified
      }
      likesCount
      commentsCount
      isLiked
    }
  }
`);

export const GET_POST = gql(`
  query GetPostById($postId: Int!) {
    post(postId: $postId) {
      id
      content
      createdAt
      owner {
        id
        username
        email
        image
        createdAt
        emailVerified
        updatedAt
      }
      likesCount
      commentsCount
      isLiked
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
        owner {
          id
          username
          email
          image
          createdAt
          updatedAt
          emailVerified
        }
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
        owner {
          id
          username
          email
          image
        }
        likesCount
        commentsCount
      }
    }
  }
`);

export const UNLIKE_POST = gql(`
  mutation UnlikePost($postId: Int!) {
    unlikePost(postId: $postId) {
      code
      success
      message
      post {
        id
        content
        createdAt
        owner {
          id
          username
          email
          image
        }
        likesCount
        commentsCount
      }
    }
  }
`);

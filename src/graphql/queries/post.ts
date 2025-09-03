import { gql } from '@/graphql/generated';

// TODO: Pass more data

// interface Post {
//   id: string;
//   author: {
//     name: string;
//     username: string;
//     avatar: string;
//   };
//   content: string;
//   timestamp: string;
//   likes: number;
//   comments: number;
//   reposts: number;
//   liked: boolean;
//   reposted: boolean;
// }

//     {
//       id: "1",
//       author: {
//         name: "Sarah Chen",
//         username: "@sarahchen",
//         avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
//       },
//       content:
//         "Just shipped a new feature that I'm really excited about! The team worked incredibly hard on this one. 🚀",
//       timestamp: "2h",
//       likes: 24,
//       comments: 5,
//       reposts: 3,
//       liked: false,
//       reposted: false,
//     },

export const GET_POSTS = gql(`
  query GetPosts {
    posts {
      id
      content
      createdAt
      username
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
      username
      likesCount
      commentsCount
      isLiked
    }
  }
`)

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
        username
        likesCount
        commentsCount
      }
    }
  }
`);

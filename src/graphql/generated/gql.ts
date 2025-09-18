/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query GetPostComments($postId: Int!) {\n    comments(postId: $postId) {\n      id\n      content\n      createdAt\n      username\n    }\n  }\n": typeof types.GetPostCommentsDocument,
    "\n  mutation CreateComment($input: CreateCommentInput!) {\n    createComment(input: $input) {\n      code\n      success\n      message\n      comment {\n        id\n        content\n        createdAt\n        username\n      }\n    }\n  }\n": typeof types.CreateCommentDocument,
    "\n  mutation DeleteComment($commentId: Int!) {\n    deleteComment(commentId: $commentId) {\n      code\n      success\n      message\n      commentId\n    }\n  }\n": typeof types.DeleteCommentDocument,
    "\n  query GetConversations {\n    conversations {\n      id\n      type\n      name\n      createdAt\n      lastMessage {\n        id\n        content\n        createdAt\n        updatedAt\n        sender {\n          id\n          username\n          image\n        }\n      }\n      participants {\n        id\n        username\n        image\n      }\n    }\n  }\n": typeof types.GetConversationsDocument,
    "\n  mutation CreateConversation($userId: Int!) {\n    createConversation(userId: $userId) {\n      code\n      success\n      message\n      conversationId\n    }\n  }\n": typeof types.CreateConversationDocument,
    "\n  query ConversationMessages($conversationId: Int!) {\n    conversationMessages(conversationId: $conversationId) {\n      id\n      content\n      createdAt\n      updatedAt\n      sender {\n        id\n        username\n        image\n      }\n    }\n  }\n": typeof types.ConversationMessagesDocument,
    "\n  mutation CreateMessage($conversationId: Int!, $content: String!) {\n    createMessage(conversationId: $conversationId, content: $content) {\n      code\n      success\n      message\n      createdMessage {\n        id\n        content\n        createdAt\n        updatedAt\n      }\n    }\n  }\n": typeof types.CreateMessageDocument,
    "\n  query GetPosts {\n    posts {\n      id\n      content\n      createdAt\n      username\n      likesCount\n      commentsCount\n      isLiked\n    }\n  }\n": typeof types.GetPostsDocument,
    "\n  query GetUserPosts($userName: String!) {\n    userPosts(userName: $userName) {\n      id\n      content\n      createdAt\n      username\n      likesCount\n      commentsCount\n      isLiked\n    }\n  }\n": typeof types.GetUserPostsDocument,
    "\n  query GetPostById($postId: Int!) {\n    post(postId: $postId) {\n      id\n      content\n      createdAt\n      username\n      likesCount\n      commentsCount\n      isLiked\n    }\n  }\n": typeof types.GetPostByIdDocument,
    "\n  mutation CreatePost($input: CreatePostInput!) {\n    createPost(input: $input) {\n      code\n      success\n      message\n      post {\n        id\n        content\n        createdAt\n        username\n        likesCount\n        commentsCount\n      }\n    }\n  }\n": typeof types.CreatePostDocument,
    "\n  mutation DeletePost($postId: Int!) {\n    deletePost(postId: $postId) {\n      code\n      success\n      message\n      postId\n    }\n  }\n": typeof types.DeletePostDocument,
    "\n  mutation LikePost($postId: Int!) {\n    likePost(postId: $postId) {\n      code\n      success\n      message\n      post {\n        id\n        content\n        createdAt\n        username\n        likesCount\n        commentsCount\n      }\n    }\n  }\n": typeof types.LikePostDocument,
    "\n  mutation UnlikePost($postId: Int!) {\n    unlikePost(postId: $postId) {\n      code\n      success\n      message\n      post {\n        id\n        content\n        createdAt\n        username\n        likesCount\n        commentsCount\n      }\n    }\n  }\n": typeof types.UnlikePostDocument,
};
const documents: Documents = {
    "\n  query GetPostComments($postId: Int!) {\n    comments(postId: $postId) {\n      id\n      content\n      createdAt\n      username\n    }\n  }\n": types.GetPostCommentsDocument,
    "\n  mutation CreateComment($input: CreateCommentInput!) {\n    createComment(input: $input) {\n      code\n      success\n      message\n      comment {\n        id\n        content\n        createdAt\n        username\n      }\n    }\n  }\n": types.CreateCommentDocument,
    "\n  mutation DeleteComment($commentId: Int!) {\n    deleteComment(commentId: $commentId) {\n      code\n      success\n      message\n      commentId\n    }\n  }\n": types.DeleteCommentDocument,
    "\n  query GetConversations {\n    conversations {\n      id\n      type\n      name\n      createdAt\n      lastMessage {\n        id\n        content\n        createdAt\n        updatedAt\n        sender {\n          id\n          username\n          image\n        }\n      }\n      participants {\n        id\n        username\n        image\n      }\n    }\n  }\n": types.GetConversationsDocument,
    "\n  mutation CreateConversation($userId: Int!) {\n    createConversation(userId: $userId) {\n      code\n      success\n      message\n      conversationId\n    }\n  }\n": types.CreateConversationDocument,
    "\n  query ConversationMessages($conversationId: Int!) {\n    conversationMessages(conversationId: $conversationId) {\n      id\n      content\n      createdAt\n      updatedAt\n      sender {\n        id\n        username\n        image\n      }\n    }\n  }\n": types.ConversationMessagesDocument,
    "\n  mutation CreateMessage($conversationId: Int!, $content: String!) {\n    createMessage(conversationId: $conversationId, content: $content) {\n      code\n      success\n      message\n      createdMessage {\n        id\n        content\n        createdAt\n        updatedAt\n      }\n    }\n  }\n": types.CreateMessageDocument,
    "\n  query GetPosts {\n    posts {\n      id\n      content\n      createdAt\n      username\n      likesCount\n      commentsCount\n      isLiked\n    }\n  }\n": types.GetPostsDocument,
    "\n  query GetUserPosts($userName: String!) {\n    userPosts(userName: $userName) {\n      id\n      content\n      createdAt\n      username\n      likesCount\n      commentsCount\n      isLiked\n    }\n  }\n": types.GetUserPostsDocument,
    "\n  query GetPostById($postId: Int!) {\n    post(postId: $postId) {\n      id\n      content\n      createdAt\n      username\n      likesCount\n      commentsCount\n      isLiked\n    }\n  }\n": types.GetPostByIdDocument,
    "\n  mutation CreatePost($input: CreatePostInput!) {\n    createPost(input: $input) {\n      code\n      success\n      message\n      post {\n        id\n        content\n        createdAt\n        username\n        likesCount\n        commentsCount\n      }\n    }\n  }\n": types.CreatePostDocument,
    "\n  mutation DeletePost($postId: Int!) {\n    deletePost(postId: $postId) {\n      code\n      success\n      message\n      postId\n    }\n  }\n": types.DeletePostDocument,
    "\n  mutation LikePost($postId: Int!) {\n    likePost(postId: $postId) {\n      code\n      success\n      message\n      post {\n        id\n        content\n        createdAt\n        username\n        likesCount\n        commentsCount\n      }\n    }\n  }\n": types.LikePostDocument,
    "\n  mutation UnlikePost($postId: Int!) {\n    unlikePost(postId: $postId) {\n      code\n      success\n      message\n      post {\n        id\n        content\n        createdAt\n        username\n        likesCount\n        commentsCount\n      }\n    }\n  }\n": types.UnlikePostDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetPostComments($postId: Int!) {\n    comments(postId: $postId) {\n      id\n      content\n      createdAt\n      username\n    }\n  }\n"): (typeof documents)["\n  query GetPostComments($postId: Int!) {\n    comments(postId: $postId) {\n      id\n      content\n      createdAt\n      username\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateComment($input: CreateCommentInput!) {\n    createComment(input: $input) {\n      code\n      success\n      message\n      comment {\n        id\n        content\n        createdAt\n        username\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateComment($input: CreateCommentInput!) {\n    createComment(input: $input) {\n      code\n      success\n      message\n      comment {\n        id\n        content\n        createdAt\n        username\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteComment($commentId: Int!) {\n    deleteComment(commentId: $commentId) {\n      code\n      success\n      message\n      commentId\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteComment($commentId: Int!) {\n    deleteComment(commentId: $commentId) {\n      code\n      success\n      message\n      commentId\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetConversations {\n    conversations {\n      id\n      type\n      name\n      createdAt\n      lastMessage {\n        id\n        content\n        createdAt\n        updatedAt\n        sender {\n          id\n          username\n          image\n        }\n      }\n      participants {\n        id\n        username\n        image\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetConversations {\n    conversations {\n      id\n      type\n      name\n      createdAt\n      lastMessage {\n        id\n        content\n        createdAt\n        updatedAt\n        sender {\n          id\n          username\n          image\n        }\n      }\n      participants {\n        id\n        username\n        image\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateConversation($userId: Int!) {\n    createConversation(userId: $userId) {\n      code\n      success\n      message\n      conversationId\n    }\n  }\n"): (typeof documents)["\n  mutation CreateConversation($userId: Int!) {\n    createConversation(userId: $userId) {\n      code\n      success\n      message\n      conversationId\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ConversationMessages($conversationId: Int!) {\n    conversationMessages(conversationId: $conversationId) {\n      id\n      content\n      createdAt\n      updatedAt\n      sender {\n        id\n        username\n        image\n      }\n    }\n  }\n"): (typeof documents)["\n  query ConversationMessages($conversationId: Int!) {\n    conversationMessages(conversationId: $conversationId) {\n      id\n      content\n      createdAt\n      updatedAt\n      sender {\n        id\n        username\n        image\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateMessage($conversationId: Int!, $content: String!) {\n    createMessage(conversationId: $conversationId, content: $content) {\n      code\n      success\n      message\n      createdMessage {\n        id\n        content\n        createdAt\n        updatedAt\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateMessage($conversationId: Int!, $content: String!) {\n    createMessage(conversationId: $conversationId, content: $content) {\n      code\n      success\n      message\n      createdMessage {\n        id\n        content\n        createdAt\n        updatedAt\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetPosts {\n    posts {\n      id\n      content\n      createdAt\n      username\n      likesCount\n      commentsCount\n      isLiked\n    }\n  }\n"): (typeof documents)["\n  query GetPosts {\n    posts {\n      id\n      content\n      createdAt\n      username\n      likesCount\n      commentsCount\n      isLiked\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetUserPosts($userName: String!) {\n    userPosts(userName: $userName) {\n      id\n      content\n      createdAt\n      username\n      likesCount\n      commentsCount\n      isLiked\n    }\n  }\n"): (typeof documents)["\n  query GetUserPosts($userName: String!) {\n    userPosts(userName: $userName) {\n      id\n      content\n      createdAt\n      username\n      likesCount\n      commentsCount\n      isLiked\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetPostById($postId: Int!) {\n    post(postId: $postId) {\n      id\n      content\n      createdAt\n      username\n      likesCount\n      commentsCount\n      isLiked\n    }\n  }\n"): (typeof documents)["\n  query GetPostById($postId: Int!) {\n    post(postId: $postId) {\n      id\n      content\n      createdAt\n      username\n      likesCount\n      commentsCount\n      isLiked\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreatePost($input: CreatePostInput!) {\n    createPost(input: $input) {\n      code\n      success\n      message\n      post {\n        id\n        content\n        createdAt\n        username\n        likesCount\n        commentsCount\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreatePost($input: CreatePostInput!) {\n    createPost(input: $input) {\n      code\n      success\n      message\n      post {\n        id\n        content\n        createdAt\n        username\n        likesCount\n        commentsCount\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeletePost($postId: Int!) {\n    deletePost(postId: $postId) {\n      code\n      success\n      message\n      postId\n    }\n  }\n"): (typeof documents)["\n  mutation DeletePost($postId: Int!) {\n    deletePost(postId: $postId) {\n      code\n      success\n      message\n      postId\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation LikePost($postId: Int!) {\n    likePost(postId: $postId) {\n      code\n      success\n      message\n      post {\n        id\n        content\n        createdAt\n        username\n        likesCount\n        commentsCount\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation LikePost($postId: Int!) {\n    likePost(postId: $postId) {\n      code\n      success\n      message\n      post {\n        id\n        content\n        createdAt\n        username\n        likesCount\n        commentsCount\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UnlikePost($postId: Int!) {\n    unlikePost(postId: $postId) {\n      code\n      success\n      message\n      post {\n        id\n        content\n        createdAt\n        username\n        likesCount\n        commentsCount\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UnlikePost($postId: Int!) {\n    unlikePost(postId: $postId) {\n      code\n      success\n      message\n      post {\n        id\n        content\n        createdAt\n        username\n        likesCount\n        commentsCount\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
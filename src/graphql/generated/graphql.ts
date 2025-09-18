/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

/** Comments */
export type Comment = {
  __typename?: 'Comment';
  /** Text content of the comment */
  content: Scalars['String']['output'];
  /** Creation timestamp */
  createdAt: Scalars['DateTime']['output'];
  /** Unique comment identifier */
  id: Scalars['Int']['output'];
  /** Author's username */
  username: Scalars['String']['output'];
};

export type Conversation = {
  __typename?: 'Conversation';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  lastMessage?: Maybe<Message>;
  name?: Maybe<Scalars['String']['output']>;
  participants: Array<ConversationParticipant>;
  type: Scalars['String']['output'];
};

/** Conversations */
export type ConversationParticipant = {
  __typename?: 'ConversationParticipant';
  id: Scalars['Int']['output'];
  image?: Maybe<Scalars['String']['output']>;
  username: Scalars['String']['output'];
};

export type CreateCommentInput = {
  /** Text body of the comment */
  content: Scalars['String']['input'];
  /** Identifier of the post to comment on */
  postId: Scalars['Int']['input'];
};

export type CreateCommentResponse = {
  __typename?: 'CreateCommentResponse';
  /** HTTP-like status code */
  code: Scalars['Int']['output'];
  /** The created comment, if successful */
  comment?: Maybe<Comment>;
  /** Human-readable status message */
  message: Scalars['String']['output'];
  /** Indicates whether the operation succeeded */
  success: Scalars['Boolean']['output'];
};

export type CreateConversationResponse = {
  __typename?: 'CreateConversationResponse';
  /** HTTP-like status code */
  code: Scalars['Int']['output'];
  /** The created conversation id, if successful */
  conversationId?: Maybe<Scalars['Int']['output']>;
  /** Human-readable status message */
  message: Scalars['String']['output'];
  /** Indicates whether the operation succeeded */
  success: Scalars['Boolean']['output'];
};

export type CreateMessageResponse = {
  __typename?: 'CreateMessageResponse';
  /** HTTP-like status code */
  code: Scalars['Int']['output'];
  /** The created message, if successful */
  createdMessage?: Maybe<CreatedMessage>;
  /** Human-readable status message */
  message: Scalars['String']['output'];
  /** Indicates whether the operation succeeded */
  success: Scalars['Boolean']['output'];
};

export type CreatePostInput = {
  /** Text body for the new post */
  content: Scalars['String']['input'];
};

export type CreatePostResponse = {
  __typename?: 'CreatePostResponse';
  /** HTTP-like status code */
  code: Scalars['Int']['output'];
  /** Human-readable status message */
  message: Scalars['String']['output'];
  /** The created post, if successful */
  post?: Maybe<Post>;
  /** Indicates whether the operation succeeded */
  success: Scalars['Boolean']['output'];
};

export type CreatedMessage = {
  __typename?: 'CreatedMessage';
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type DeleteCommentResponse = {
  __typename?: 'DeleteCommentResponse';
  /** HTTP-like status code */
  code: Scalars['Int']['output'];
  /** Identifier of the deleted comment */
  commentId?: Maybe<Scalars['Int']['output']>;
  /** Human-readable status message */
  message: Scalars['String']['output'];
  /** Indicates whether the operation succeeded */
  success: Scalars['Boolean']['output'];
};

export type DeletePostResponse = {
  __typename?: 'DeletePostResponse';
  /** HTTP-like status code */
  code: Scalars['Int']['output'];
  /** Human-readable status message */
  message: Scalars['String']['output'];
  /** Identifier of the deleted post */
  postId?: Maybe<Scalars['Int']['output']>;
  /** Indicates whether the operation succeeded */
  success: Scalars['Boolean']['output'];
};

/** Likes */
export type LikePostResponse = {
  __typename?: 'LikePostResponse';
  /** HTTP-like status code */
  code: Scalars['Int']['output'];
  /** Human-readable status message */
  message: Scalars['String']['output'];
  /** Post with updated like counts */
  post?: Maybe<Post>;
  /** Indicates whether the operation succeeded */
  success: Scalars['Boolean']['output'];
};

/** Messages */
export type Message = {
  __typename?: 'Message';
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  sender: ConversationParticipant;
  updatedAt: Scalars['DateTime']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Create a new comment on a post */
  createComment: CreateCommentResponse;
  /** Create a new conversation */
  createConversation: CreateConversationResponse;
  /** Create a new conversation message */
  createMessage: CreateMessageResponse;
  /** Create a new post */
  createPost: CreatePostResponse;
  /** Delete a comment by its identifier */
  deleteComment: DeleteCommentResponse;
  /** Delete a post by its identifier */
  deletePost: DeletePostResponse;
  /** Add a like to a post */
  likePost: LikePostResponse;
  /** Remove a like from a post */
  unlikePost: LikePostResponse;
};


export type MutationCreateCommentArgs = {
  input: CreateCommentInput;
};


export type MutationCreateConversationArgs = {
  userId: Scalars['Int']['input'];
};


export type MutationCreateMessageArgs = {
  content: Scalars['String']['input'];
  conversationId: Scalars['Int']['input'];
};


export type MutationCreatePostArgs = {
  input: CreatePostInput;
};


export type MutationDeleteCommentArgs = {
  commentId: Scalars['Int']['input'];
};


export type MutationDeletePostArgs = {
  postId: Scalars['Int']['input'];
};


export type MutationLikePostArgs = {
  postId: Scalars['Int']['input'];
};


export type MutationUnlikePostArgs = {
  postId: Scalars['Int']['input'];
};

/** Posts */
export type Post = {
  __typename?: 'Post';
  /** Number of comments on this post */
  commentsCount: Scalars['Int']['output'];
  /** Text content of the post */
  content: Scalars['String']['output'];
  /** Creation timestamp */
  createdAt: Scalars['DateTime']['output'];
  /** Unique post identifier */
  id: Scalars['Int']['output'];
  /** Whether the current user liked this post */
  isLiked: Scalars['Boolean']['output'];
  /** Number of likes on this post */
  likesCount: Scalars['Int']['output'];
  /** Author's username */
  username: Scalars['String']['output'];
};

/** Queries */
export type Query = {
  __typename?: 'Query';
  /** List comments for a specific post */
  comments: Array<Comment>;
  /** List all conversation messages */
  conversationMessages: Array<Message>;
  /** List all user conversations */
  conversations: Array<Conversation>;
  /** Single post */
  post: Post;
  /** List all posts */
  posts: Array<Post>;
  /** List user posts */
  userPosts: Array<Post>;
};


/** Queries */
export type QueryCommentsArgs = {
  postId: Scalars['Int']['input'];
};


/** Queries */
export type QueryConversationMessagesArgs = {
  conversationId: Scalars['Int']['input'];
};


/** Queries */
export type QueryPostArgs = {
  postId: Scalars['Int']['input'];
};


/** Queries */
export type QueryUserPostsArgs = {
  userName: Scalars['String']['input'];
};

export type GetPostCommentsQueryVariables = Exact<{
  postId: Scalars['Int']['input'];
}>;


export type GetPostCommentsQuery = { __typename?: 'Query', comments: Array<{ __typename?: 'Comment', id: number, content: string, createdAt: any, username: string }> };

export type CreateCommentMutationVariables = Exact<{
  input: CreateCommentInput;
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'CreateCommentResponse', code: number, success: boolean, message: string, comment?: { __typename?: 'Comment', id: number, content: string, createdAt: any, username: string } | null } };

export type DeleteCommentMutationVariables = Exact<{
  commentId: Scalars['Int']['input'];
}>;


export type DeleteCommentMutation = { __typename?: 'Mutation', deleteComment: { __typename?: 'DeleteCommentResponse', code: number, success: boolean, message: string, commentId?: number | null } };

export type GetConversationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetConversationsQuery = { __typename?: 'Query', conversations: Array<{ __typename?: 'Conversation', id: number, type: string, name?: string | null, createdAt: any, lastMessage?: { __typename?: 'Message', id: number, content: string, createdAt: any, updatedAt: any, sender: { __typename?: 'ConversationParticipant', id: number, username: string, image?: string | null } } | null, participants: Array<{ __typename?: 'ConversationParticipant', id: number, username: string, image?: string | null }> }> };

export type CreateConversationMutationVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type CreateConversationMutation = { __typename?: 'Mutation', createConversation: { __typename?: 'CreateConversationResponse', code: number, success: boolean, message: string, conversationId?: number | null } };

export type ConversationMessagesQueryVariables = Exact<{
  conversationId: Scalars['Int']['input'];
}>;


export type ConversationMessagesQuery = { __typename?: 'Query', conversationMessages: Array<{ __typename?: 'Message', id: number, content: string, createdAt: any, updatedAt: any, sender: { __typename?: 'ConversationParticipant', id: number, username: string, image?: string | null } }> };

export type CreateMessageMutationVariables = Exact<{
  conversationId: Scalars['Int']['input'];
  content: Scalars['String']['input'];
}>;


export type CreateMessageMutation = { __typename?: 'Mutation', createMessage: { __typename?: 'CreateMessageResponse', code: number, success: boolean, message: string, createdMessage?: { __typename?: 'CreatedMessage', id: number, content: string, createdAt: any, updatedAt: any } | null } };

export type GetPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPostsQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'Post', id: number, content: string, createdAt: any, username: string, likesCount: number, commentsCount: number, isLiked: boolean }> };

export type GetUserPostsQueryVariables = Exact<{
  userName: Scalars['String']['input'];
}>;


export type GetUserPostsQuery = { __typename?: 'Query', userPosts: Array<{ __typename?: 'Post', id: number, content: string, createdAt: any, username: string, likesCount: number, commentsCount: number, isLiked: boolean }> };

export type GetPostByIdQueryVariables = Exact<{
  postId: Scalars['Int']['input'];
}>;


export type GetPostByIdQuery = { __typename?: 'Query', post: { __typename?: 'Post', id: number, content: string, createdAt: any, username: string, likesCount: number, commentsCount: number, isLiked: boolean } };

export type CreatePostMutationVariables = Exact<{
  input: CreatePostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'CreatePostResponse', code: number, success: boolean, message: string, post?: { __typename?: 'Post', id: number, content: string, createdAt: any, username: string, likesCount: number, commentsCount: number } | null } };

export type DeletePostMutationVariables = Exact<{
  postId: Scalars['Int']['input'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: { __typename?: 'DeletePostResponse', code: number, success: boolean, message: string, postId?: number | null } };

export type LikePostMutationVariables = Exact<{
  postId: Scalars['Int']['input'];
}>;


export type LikePostMutation = { __typename?: 'Mutation', likePost: { __typename?: 'LikePostResponse', code: number, success: boolean, message: string, post?: { __typename?: 'Post', id: number, content: string, createdAt: any, username: string, likesCount: number, commentsCount: number } | null } };

export type UnlikePostMutationVariables = Exact<{
  postId: Scalars['Int']['input'];
}>;


export type UnlikePostMutation = { __typename?: 'Mutation', unlikePost: { __typename?: 'LikePostResponse', code: number, success: boolean, message: string, post?: { __typename?: 'Post', id: number, content: string, createdAt: any, username: string, likesCount: number, commentsCount: number } | null } };


export const GetPostCommentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPostComments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]} as unknown as DocumentNode<GetPostCommentsQuery, GetPostCommentsQueryVariables>;
export const CreateCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCommentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"comment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]} as unknown as DocumentNode<CreateCommentMutation, CreateCommentMutationVariables>;
export const DeleteCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"commentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"commentId"}}]}}]}}]} as unknown as DocumentNode<DeleteCommentMutation, DeleteCommentMutationVariables>;
export const GetConversationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetConversations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"conversations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"lastMessage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"participants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]}}]} as unknown as DocumentNode<GetConversationsQuery, GetConversationsQueryVariables>;
export const CreateConversationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateConversation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createConversation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"conversationId"}}]}}]}}]} as unknown as DocumentNode<CreateConversationMutation, CreateConversationMutationVariables>;
export const ConversationMessagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ConversationMessages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"conversationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"conversationMessages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"conversationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"conversationId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]}}]} as unknown as DocumentNode<ConversationMessagesQuery, ConversationMessagesQueryVariables>;
export const CreateMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"conversationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"conversationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"conversationId"}}},{"kind":"Argument","name":{"kind":"Name","value":"content"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"createdMessage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<CreateMessageMutation, CreateMessageMutationVariables>;
export const GetPostsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPosts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"commentsCount"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}}]}}]}}]} as unknown as DocumentNode<GetPostsQuery, GetPostsQueryVariables>;
export const GetUserPostsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserPosts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userPosts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userName"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"commentsCount"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}}]}}]}}]} as unknown as DocumentNode<GetUserPostsQuery, GetUserPostsQueryVariables>;
export const GetPostByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPostById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"post"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"commentsCount"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}}]}}]}}]} as unknown as DocumentNode<GetPostByIdQuery, GetPostByIdQueryVariables>;
export const CreatePostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreatePostInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"post"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"commentsCount"}}]}}]}}]}}]} as unknown as DocumentNode<CreatePostMutation, CreatePostMutationVariables>;
export const DeletePostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeletePost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletePost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"postId"}}]}}]}}]} as unknown as DocumentNode<DeletePostMutation, DeletePostMutationVariables>;
export const LikePostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LikePost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likePost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"post"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"commentsCount"}}]}}]}}]}}]} as unknown as DocumentNode<LikePostMutation, LikePostMutationVariables>;
export const UnlikePostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UnlikePost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unlikePost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"post"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"commentsCount"}}]}}]}}]}}]} as unknown as DocumentNode<UnlikePostMutation, UnlikePostMutationVariables>;
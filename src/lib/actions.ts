'use server';

import { revalidatePath } from 'next/cache';
import request from 'graphql-request';
import { CREATE_POST, DELETE_POST, LIKE_POST, UNLIKE_POST } from '@/graphql/queries/post';
import { z } from 'zod';

export interface PostFormState {
  errors?: {
    content?: string[];
  };
  message?: string | null;
}

type LikeFormAction = 'like' | 'unlike'

export interface LikeFormState {
  action: LikeFormAction | null;
  errorMessage: string | null;
}

const PostFormSchema = z.object({
  content: z
  .string({ invalid_type_error: 'Please fill in the post content.' })
  .trim()
  .min(1, { message: 'Please fill in the post content.' }),
});

export const createPost = async (
  prevState: PostFormState | undefined,
  formData: FormData,
) => {
  // Validate form using Zod
  const validatedFields = PostFormSchema.safeParse({
    content: formData.get('content'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Post.',
    };
  }

  // Insert data into the database
  const { content } = validatedFields.data;

  try {
    await request({ url: 'http://localhost:4000/graphql', document: CREATE_POST, variables: { input: { content } } });
    // Revalidate the cache for the invoices page and redirect the user.
    revalidatePath('/feed');
  } catch (e) {
    // If a database error occurs, return a more specific error.
    console.error(e);
    return {
      message: 'Database Error: Failed to Create Post.',
    };
  }
};

export const deletePostById = async (id: number) => {
  await request({ url: 'http://localhost:4000/graphql', document: DELETE_POST, variables: { postId: id } });
  revalidatePath('/feed');
};

export const likePostById = async (postId: number) => {
  console.log('like action');
  await request({ url: 'http://localhost:4000/graphql', document: LIKE_POST, variables: { postId } });
};

export const unlikePostById = async (postId: number) => {
  console.log('unlike action');
  await request({ url: 'http://localhost:4000/graphql', document: UNLIKE_POST, variables: { postId } });
};

export const toggleLike = async (postId: number, action: LikeFormAction) => {
  try {
    switch (action) {
      case 'like':
        await likePostById(postId);
        break;
      case 'unlike':
        await unlikePostById(postId);
        break;
    }
  } catch (e) {
    console.error(e);
    return {
      action,
      errorMessage: `Failed to ${action}`,
    };
  }
};

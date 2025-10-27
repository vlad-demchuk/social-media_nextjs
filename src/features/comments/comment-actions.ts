'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { CREATE_COMMENT, DELETE_COMMENT } from '@/graphql/queries/comment';
import { getClient } from '@/lib/graphql/apolloClient';

export interface CommentFormState {
  errors?: {
    content?: string[];
  };
  message?: string | null;
}

const CreateCommentFormSchema = z.object({
  content: z
    .string({ invalid_type_error: 'Please fill in the comment content.' })
    .trim()
    .min(1, { message: 'Please fill in the comment content.' }),
});

export const createComment = async (
  postId: number,
  _prevState: CommentFormState | undefined,
  formData: FormData,
) => {
  // Validate form using Zod
  const validatedFields = CreateCommentFormSchema.safeParse({
    content: formData.get('content'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Comment.',
    };
  }

  // Insert data into the database
  const { content } = validatedFields.data;

  try {
    await getClient().mutate({
      mutation: CREATE_COMMENT,
      variables: { input: { content, postId } },
    });
  } catch (e) {
    // If a database error occurs, return a more specific error.
    console.error(e);
    return {
      message: 'Database Error: Failed to Create Comment.',
    };
  }

  // Revalidate the cache for the post page.
  revalidatePath(`/feed/${postId}`);
};

export const deleteCommentById = async (_prevState: null | void, formData: FormData) => {
  const commentIdStr = formData.get('commentId')?.toString();
  const postIdStr = formData.get('postId')?.toString();
  const commentId = Number(commentIdStr);
  const postIdNum = Number(postIdStr);
  if (!commentId || !postIdNum) return;

  await getClient().mutate({
    mutation: DELETE_COMMENT,
    variables: { commentId },
  });

  revalidatePath(`/feed/${postIdNum}`);
};

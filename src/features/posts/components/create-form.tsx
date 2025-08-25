'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useActionState } from 'react';
import { createPost, PostFormState } from '@/lib/actions';

export const CreateForm = () => {
  const initialState: PostFormState = { message: null, errors: {} };

  const [state, formAction] = useActionState(createPost, initialState)

  return (
    <Card className="shadow-soft bg-gradient-card border-0">
      <form action={formAction}>
        <CardHeader>
          <div className="flex items-start space-x-4">
            <Avatar>
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=you" />
              <AvatarFallback>You</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                placeholder="What's happening?"
                required
                className="border-0 resize-none focus:ring-0 text-lg"
                rows={3}
                name="content"
              />
              {state?.errors?.content && 'This field is required'}
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex justify-end pt-0">
          <Button
            type="submit"
            className="rounded-full px-8"
          >
            Post
          </Button>
        </CardContent>
      </form>
    </Card>
  );
};

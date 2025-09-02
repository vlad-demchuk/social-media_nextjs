'use client';

import { ReactNode, useActionState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Loader } from 'lucide-react';

interface Props {
  children: ReactNode,
  onDelete: () => void | Promise<void>
}

export const ThreeDotMenu = ({ children, onDelete }: Props) => {
  const [, formAction, isPending] = useActionState(onDelete, null);

  const items = [
    {
      title: 'Delete Post',
      action: formAction,
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>

      <DropdownMenuContent>
        {items.map((item) => (
          <form
            key={item.title}
            action={item.action}
          >
            <DropdownMenuItem
              asChild
              onSelect={(e) => e.preventDefault()}
            >
              <button
                type="submit"
                className="w-full text-left disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={isPending}
                aria-disabled={isPending}
                aria-busy={isPending}
              >
                {isPending ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader className="h-4 w-4 animate-spin" />
                    <span>Deleting…</span>
                  </span>
                ) : (
                  item.title
                )}
              </button>
            </DropdownMenuItem>
          </form>
        ))}

      </DropdownMenuContent>
    </DropdownMenu>
  );
};

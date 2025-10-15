'use client';

import { ReactNode, useActionState, useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Loader } from 'lucide-react';
import { authClient } from '@/lib/auth/auth-client';

interface Props {
  postUserName: string,
  onDelete: () => void | Promise<void>,
  children: ReactNode,
}

export const ThreeDotMenu = ({ postUserName, onDelete, children }: Props) => {
  const [isClient, setIsClient] = useState(false);
  const { data: session } = authClient.useSession();
  const [, formAction, isPending] = useActionState(onDelete, null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const canDelete = session?.user.name === postUserName;

  const items = [
    ...(canDelete ? [{ title: 'Delete Post', action: formAction }] : []),
  ];

  const hasActions = items.length > 0;

  if (!isClient || !hasActions) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="hover:cursor-pointer"
      >
        {children}
      </DropdownMenuTrigger>

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

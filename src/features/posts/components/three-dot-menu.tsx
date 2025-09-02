'use client';

import { ReactNode, useActionState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Loader } from 'lucide-react';
import { useFormStatus } from 'react-dom';

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
                className="w-full text-left"
              >
                {isPending ? <Loader /> : item.title}
              </button>
            </DropdownMenuItem>
          </form>
        ))}

      </DropdownMenuContent>
    </DropdownMenu>
  );
};

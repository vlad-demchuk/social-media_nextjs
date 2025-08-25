'use client';

import { ReactNode } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Props {
  children: ReactNode,
  onDelete: () => void | Promise<void>
}

export const ThreeDotMenu = ({ children, onDelete }: Props) => {
  const items = [
    {
      title: 'Delete Post',
      action: onDelete,
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
                {item.title}
              </button>
            </DropdownMenuItem>
          </form>
        ))}

      </DropdownMenuContent>
    </DropdownMenu>
  );
};

'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { NavItem } from '@/types/nav';

interface Props {
  navItems: NavItem[],
  isLoading: boolean
}

export const BottomNav = ({ navItems, isLoading }: Props) => {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border shadow-soft">
      <div className="flex justify-around items-center py-2 px-1">
        {navItems.map(({ id, icon: Icon, label, href }) => {
          const isActive = pathname === href;
          const isDisabled = id === 'profile' && isLoading;

          return (
            <Link
              key={id}
              href={href}
              className={`flex flex-col items-center justify-center py-2 px-3 min-w-0 flex-1 text-xs transition-colors duration-200 ${
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-primary'
              } ${isDisabled && 'pointer-events-none text-muted-foreground'}`}
              aria-label={label}
            >
              <Icon
                className={`h-6 w-6 mb-1 ${
                  isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'
                }`}
              />
              <span className="sr-only">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

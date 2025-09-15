'use client';

import { Card, CardContent } from '@/components/ui/card';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { NavItem } from '@/types/nav';

interface Props {
  navItems: NavItem[],
  isLoading: boolean
}

export const SideNav = ({ navItems, isLoading }: Props) => {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:block w-1/3 py-6 sticky top-16 h-min">
      <Card className="shadow-soft bg-gradient-card border-0">
        <CardContent className="p-6">
          <nav className="space-y-2">
            {navItems.map(({ id, icon: Icon, label, href }) => {
              const isActive = pathname === href;
              const isDisabled = id === 'profile' && isLoading;

              return (
                <Link
                  key={id}
                  href={href}
                  className={`group flex items-center w-full px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                    isActive
                      ? 'bg-background text-primary border-border'
                      : 'text-muted-foreground hover:bg-secondary hover:text-primary'
                  } ${isDisabled && 'pointer-events-none text-muted-foreground'}`}
                >
                  <Icon
                    className={`mr-3 h-5 w-5  ${
                      isActive ? 'text-primary' : 'text-muted-foreground  group-hover:text-primary'
                    }`}
                  />
                  {label}
                </Link>
              );
            })}
          </nav>
        </CardContent>
      </Card>
    </aside>
  );
};

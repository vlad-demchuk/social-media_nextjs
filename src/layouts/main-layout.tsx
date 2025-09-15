import { AppHeader } from '@/components/app-header';
import { Navigation } from '@/components/navigation';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen lg:min-h-screen lg:h-auto grid grid-rows-[auto_1fr_auto] lg:grid-rows-[auto_1fr] bg-gradient-hero">
      {/* Top Navigation */}
      <AppHeader />

      {/* Middle Zone */}
      <div className="max-w-7xl row w-full mx-auto lg:px-8 overflow-y-auto lg:overflow-y-visible">
        <div className="flex">
          {/* Left Navigation */}
          <Navigation placement="left" />

          {/* Scrollable Feed */}
          <main className="grow space-y-6 p-6">
            {children}
          </main>
        </div>
      </div>

      {/* Bottom Navigation (mobile) */}
      <Navigation placement="bottom" />
    </div>
  );
}

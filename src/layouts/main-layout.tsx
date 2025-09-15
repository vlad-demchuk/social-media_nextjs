import { AppHeader } from '@/components/app-header';
import { Navigation } from '@/components/navigation';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen grid grid-rows-[auto_1fr_auto] lg:grid-rows-[auto_1fr] bg-gradient-hero">
      {/* Top Navigation */}
      <AppHeader />

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 overflow-y-auto">
        <div className="h-full grid grid-cols-1 lg:grid-cols-[30%_1fr] gap-6">
          <Navigation placement="left" />
          <main className="lg:mb-0 col-span-1 space-y-6">
            {children}
          </main>
        </div>
      </div>

      <Navigation placement="bottom" />
    </div>
  );
}

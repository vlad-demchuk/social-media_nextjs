import { AppHeader } from '@/components/app-header';
import { Navigation } from '@/components/navigation';

export default function FeedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Top Navigation */}
      <AppHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <Navigation />

          <main className="mb-12 lg:mb-0 lg:col-span-2 space-y-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

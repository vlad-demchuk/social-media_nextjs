import { Bell, MessageCircle, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function FeedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-sm shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-primary">SocialFlow</h1>
            </div>

            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search posts, people, and topics"
                  className="w-full pl-10 pr-4 py-2 bg-muted rounded-full border-0 focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
              >
                <Bell className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
              >
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar */}
          <aside className="hidden lg:block">
            <Card className="shadow-soft bg-gradient-card border-0">
              <CardContent className="p-6">
                <nav className="space-y-2">
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                  >
                    <User className="mr-3 h-5 w-5" />
                    Profile
                  </Button>
                  <Button
                    variant="secondary"
                    className="w-full justify-start"
                  >
                    <Search className="mr-3 h-5 w-5" />
                    Explore
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                  >
                    <Bell className="mr-3 h-5 w-5" />
                    Notifications
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                  >
                    <MessageCircle className="mr-3 h-5 w-5" />
                    Messages
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </aside>

          <main className="lg:col-span-2 space-y-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

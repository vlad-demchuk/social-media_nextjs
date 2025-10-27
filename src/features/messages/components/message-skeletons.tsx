import { ScrollArea } from '@/components/ui/scroll-area';

export const MessageListSkeleton = () => (
  <ScrollArea className="border-b p-2 overflow-y-hidden animate-pulse">
    <section className="flex flex-col gap-2">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className={`flex items-start gap-3 ${i % 2 === 0 ? 'justify-start' : 'flex-row-reverse'}`}>
          <div className="h-8 w-8 bg-muted rounded-full" />
          <div className="rounded-2xl px-4 py-3 max-w-[70%] bg-muted w-32" />
        </div>
      ))}
    </section>
  </ScrollArea>
);

export const SidebarListSkeleton = () => (
  <section className="h-full animate-pulse">
    <header className="border-b px-3 py-2 flex items-center justify-between">
      <div className="h-4 w-20 bg-muted rounded" />
      <div className="h-8 w-8 bg-muted rounded-full" />
    </header>
    <ScrollArea className="h-[calc(100%-40px)]">
      <div className="divide-y">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-start gap-3 px-3 py-3">
            <div className="h-8 w-8 bg-muted rounded-full" />
            <div className="flex-1 min-w-0 space-y-2">
              <div className="h-4 w-24 bg-muted rounded" />
              <div className="h-3 w-32 bg-muted rounded" />
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  </section>
);


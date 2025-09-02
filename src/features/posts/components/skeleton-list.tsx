import { Card, CardContent } from '@/components/ui/card';

export function PostsSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} className="shadow-soft border-0">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-32 bg-muted rounded animate-pulse" />
                <div className="h-3 w-24 bg-muted/70 rounded animate-pulse" />
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <div className="h-4 w-full bg-muted rounded animate-pulse" />
              <div className="h-4 w-11/12 bg-muted rounded animate-pulse" />
              <div className="h-4 w-10/12 bg-muted rounded animate-pulse" />
            </div>

            {/*<div className="mt-4 h-56 w-full bg-muted rounded-xl animate-pulse" />*/}

            <div className="mt-4 flex items-center gap-6">
              <div className="h-6 w-16 bg-muted rounded-full animate-pulse" />
              <div className="h-6 w-16 bg-muted rounded-full animate-pulse" />
              <div className="h-6 w-16 bg-muted rounded-full animate-pulse" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

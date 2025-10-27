export const CommentSkeleton = () => {
  return (
    <section className="mt-4 space-y-4">
      {/* Create form skeleton */}
      <div className="space-y-3">
        <div className="h-16 rounded-md bg-muted animate-pulse" />
        <div className="flex justify-end">
          <div className="h-9 w-28 rounded-md bg-muted animate-pulse" />
        </div>
      </div>

      {/* Comments list skeleton */}
      <ul className="space-y-3">
        {[0, 1, 2].map((i) => (
          <li
            key={i}
            className="rounded-md border p-3 flex items-start gap-3"
          >
            <div className="h-9 w-9 rounded-full bg-muted animate-pulse" />
            <div className="flex-1 min-w-0 space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-4 w-24 rounded bg-muted animate-pulse" />
                <div className="h-4 w-16 rounded bg-muted animate-pulse" />
              </div>
              <div className="h-4 w-3/4 rounded bg-muted animate-pulse" />
              <div className="h-4 w-2/4 rounded bg-muted animate-pulse" />
            </div>
            <div className="h-8 w-16 rounded bg-muted animate-pulse" />
          </li>
        ))}
      </ul>
    </section>
  );
};

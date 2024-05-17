export const ListEventsSkeleton = () => (
  <div className="grid gap-3 md:grid-cols-3">
    <CardSkeleton />
    <CardSkeleton />
    <CardSkeleton />
    <CardSkeleton />
    <CardSkeleton />
    <CardSkeleton />
  </div>
);

const CardSkeleton = () => (
  <div className="animate-pulse space-y-2 rounded-md border border-border/50 bg-card p-3 md:h-56">
    <div className="flex items-start justify-between">
      <div className="size-16  rounded-md bg-muted-foreground/20" />
      <div className="h-4 w-28 rounded-md bg-muted-foreground/10" />
    </div>
    <div className="space-y-2.5">
      <p className="h-4 w-36 rounded-md bg-muted-foreground/20" />
      <p className="h-3 w-full rounded-md bg-muted-foreground/10" />
      <p className="h-3 w-full rounded-md bg-muted-foreground/10" />
      <p className="h-3 w-full rounded-md bg-muted-foreground/10" />
      <p className="h-3 w-full rounded-md bg-muted-foreground/10" />
    </div>
  </div>
);

import { cn } from "cn";

export function Skeleton({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "animate-pulse bg-muted rounded h-[1.25em] w-full max-w-full inline-block align-bottom",
        className,
      )}
      style={{ width: "100%", height: "100%" }}
    />
  );
}

export function SkeletonButton({ className }: { className?: string }) {
  return <Skeleton className={cn("h-9", className)} />;
}

import { format } from "date-fns";

import { cn } from "@/lib/utils";

export const CalendarIcon = ({
  date,
  size = "base",
}: {
  date: Date;
  size?: "sm" | "base" | "lg";
}) => (
  <div
    className={cn(
      "rounded-md border",
      size === "sm" && "size-8",
      size === "base" && "size-11 ",
      size === "lg" && "size-14",
    )}
  >
    <div
      className={cn(
        "flex h-2/5 items-center justify-center rounded-t-md bg-muted text-[10px] font-medium uppercase tracking-widest text-muted-foreground",
        size === "lg" && "text-xs",
      )}
    >
      {format(date, "MMM")}
    </div>
    <div
      className={cn(
        "flex h-3/5 items-center justify-center text-sm font-medium",
        size === "lg" && "text-lg",
      )}
    >
      {date.getDate()}
    </div>
  </div>
);

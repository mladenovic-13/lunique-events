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
    )}
  >
    <div className="flex h-2/5 items-center justify-center rounded-t-md bg-muted text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
      {format(date, "MMM")}
    </div>
    <div className="flex h-3/5 items-center justify-center text-sm font-medium">
      {date.getDate()}
    </div>
  </div>
);

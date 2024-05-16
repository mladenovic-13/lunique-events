import React from "react";
import { format } from "date-fns";
import { CircleIcon } from "lucide-react";

import { useGuestSelectedEvent } from "@/hooks/use-guest-store";
import { cn } from "@/lib/utils";
import { type RouterOutputs } from "@/trpc/shared";

interface EventItemProprs {
  event: RouterOutputs["event"]["list"][number];
  onClick: () => void;
}
export const EventItem = ({ event, onClick }: EventItemProprs) => {
  const selectedEventName = useGuestSelectedEvent();
  const selected = selectedEventName === event?.name ?? "";
  return (
    <div
      className={cn(
        "flex w-[210px] flex-col rounded-lg p-1  px-2 transition-all hover:cursor-pointer hover:bg-accent-foreground/10",
        selected && "bg-accent-foreground/10",
      )}
      onClick={onClick}
    >
      <h1 className="line-clamp-1 text-base font-semibold text-accent-foreground">
        {event?.name ?? ""}
      </h1>
      <div className="flex w-full items-center justify-between gap-2 text-xs text-accent-foreground/50">
        <p className="line-clamp-1 w-full">
          {format(event?.date ?? new Date(), "PPP")}
        </p>
        <div className="flex w-full items-center justify-start gap-4">
          <CircleIcon size={5} />
          <p className="line-clamp-1 ">
            {(event?.guests.length > 0 && event?.guests.length) ?? -1}{" "}
            {event?.guests.length === 1
              ? "Guest"
              : event?.guests.length ?? -1 > 0
                ? "Guests"
                : "No Guests"}
          </p>
        </div>
      </div>
    </div>
  );
};

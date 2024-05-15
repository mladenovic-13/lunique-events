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
  const eventName: string = event?.name ?? "";
  const eventDate: Date = event?.date ?? new Date();
  const guestsCount: number = event?.guests.length ?? -1;
  const selectedEventName = useGuestSelectedEvent();
  const selected = selectedEventName === eventName;
  return (
    <div
      className={cn(
        "flex flex-col rounded-lg p-1 px-2  transition-all hover:cursor-pointer hover:bg-accent-foreground/10",
        selected && "bg-accent-foreground/10",
      )}
      onClick={onClick}
    >
      <h1 className="line-clamp-1 text-base font-semibold text-accent-foreground">
        {eventName}
      </h1>
      <div className="flex items-center gap-2 text-xs text-accent-foreground/50">
        <p>{format(eventDate, "PPP")}</p>
        <CircleIcon size={5} />
        <p>
          {guestsCount > 0 && guestsCount}{" "}
          {guestsCount === 1
            ? "Guest"
            : guestsCount > 0
              ? "Guests"
              : "No Guests"}
        </p>
      </div>
    </div>
  );
};

import React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useInviteGuestActions } from "@/hooks/use-guest-store";
import { cn } from "@/lib/utils";
import { api, type RouterOutputs } from "@/trpc/react";

import { EventItem } from "./event-item";

interface EventListProps {
  className?: string;
}
export const EventList = ({ className }: EventListProps) => {
  const { data: userEvents, isLoading } = api.event.list.useQuery({});
  const { setStep, setSelectedEventId, setEventGuests } =
    useInviteGuestActions();
  const onEventClick = (event: RouterOutputs["event"]["list"][number]) => {
    setStep("search-guests");
    setSelectedEventId(event.id);
    setEventGuests(event.guests.map((guest) => guest.email));
  };
  return (
    <div
      className={cn(
        "flex h-full flex-col gap-2  md:pt-6",
        className && className,
      )}
    >
      <h1 className="text-sm font-medium text-accent-foreground/50">EVENTS</h1>
      <ScrollArea className="flex h-full flex-col px-0 ">
        {isLoading && (
          <div className="flex flex-col gap-2">
            <Skeleton className="h-8 w-full bg-accent-foreground/20" />
            <Skeleton className="h-8 w-full bg-accent-foreground/20" />
            <Skeleton className="h-8 w-full bg-accent-foreground/20" />
          </div>
        )}
        {userEvents?.map((ev, idx) => (
          <EventItem key={idx} event={ev} onClick={() => onEventClick(ev)} />
        ))}
      </ScrollArea>
    </div>
  );
};

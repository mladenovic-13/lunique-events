import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useInviteGuestActions } from "@/hooks/use-guest-store";
import { api, type RouterOutputs } from "@/trpc/react";

import { EventItem } from "./event-item";

export const EventList = () => {
  const { data: userEvents, isLoading } = api.event.list.useQuery({});
  const { setStep, setSelectedEventName, setEventGuests } =
    useInviteGuestActions();
  const onEventClick = (event: RouterOutputs["event"]["list"][number]) => {
    setStep("search-guests");
    setSelectedEventName(event.name);
    setEventGuests(event.guests.map((guest) => guest.email));
  };
  return (
    <div className="flex size-full flex-col gap-2 px-1">
      {isLoading &&
        Array(3)
          .fill(0)
          .map((_, index) => index + 1)
          .map((idx) => (
            <Skeleton
              key={idx}
              className="h-12 w-full animate-pulse bg-accent-foreground/10"
            />
          ))}
      <ScrollArea className="h-[90%]">
        {userEvents?.map((event, idx) => (
          <EventItem
            event={event}
            key={idx}
            onClick={() => onEventClick(event)}
          />
        ))}
      </ScrollArea>
    </div>
  );
};

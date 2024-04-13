import React from "react";
import { type Event } from "@prisma/client";
import { format, isToday, isTomorrow, isYesterday } from "date-fns";
import { UserIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface EventListItemProps {
  date: Date;
  event?: Event | null;
  creator?: string | null;
  onClick: () => void;
}

export const EventListItem = ({
  date,
  event,
  creator,
  onClick,
}: EventListItemProps) => {
  return (
    <section className="flex max-h-28 flex-col space-y-1" onClick={onClick}>
      <EventDate date={date} />
      <Separator className="" />
      {event && (
        <div className="flex space-x-12 rounded-lg p-2 px-3 transition-all hover:cursor-pointer hover:bg-accent-foreground/10">
          <div className="flex ">
            <p className="pt-0.5 text-sm text-accent-foreground/50 md:text-base">
              14:00
            </p>
          </div>
          <div className="flex w-full flex-col gap-2">
            <div className="flex justify-between ">
              <div className="">
                <p className="font-bold">{event.name}</p>
              </div>
              <div>
                <Badge className="bg-fuchsia-400/20 text-fuchsia-400 hover:bg-fuchsia-400/20">
                  <p className="">Hosting</p>
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <UserIcon
                size={14}
                className="rounded-full border border-accent-foreground/50 text-accent-foreground/50"
              />
              {creator && (
                <p className="text-sm text-accent-foreground/50">
                  By: {creator}
                </p>
              )}
              {!creator && (
                <p className="text-sm text-red-500">Creator is missing!</p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
const EventDate = ({ date }: { date: Date }) => (
  <div className="flex items-center gap-2">
    {isYesterday(date) && (
      <p className="text-base font-semibold md:text-lg">Yesterday</p>
    )}
    {isToday(date) && (
      <p className="text-base font-semibold md:text-lg">Today</p>
    )}
    {isTomorrow(date) && (
      <p className="text-base font-semibold md:text-lg">Tomorrow</p>
    )}
    {!isYesterday(date) && !isToday(date) && !isTomorrow(date) && (
      <p className="text-base font-semibold md:text-lg">
        {format(date, "LLL d")}
      </p>
    )}
    <p className="text-base text-muted-foreground md:text-lg">
      {format(date, "EEEE")}
    </p>
  </div>
);

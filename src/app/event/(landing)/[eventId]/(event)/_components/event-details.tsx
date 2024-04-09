import { format } from "date-fns";
import { MapPinIcon } from "lucide-react";

import { CalendarIcon } from "@/components/icons/calendar-icon";

interface EventDetailsProps {
  name: string;
  host: string;
  startDate: Date;
  location: string;
}

export const EventDetails = ({
  name,
  host,
  startDate,
  location,
}: EventDetailsProps) => {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-3xl font-semibold">{name}</h1>
        <p className="text-xs text-muted-foreground">Hosted by {host}</p>
      </div>
      <div className="space-y-1.5 md:flex md:items-center md:gap-5 md:space-y-0">
        <div className="flex items-center gap-3">
          <CalendarIcon date={startDate} />
          <div className="flex flex-col">
            <p className="font-medium leading-5">
              {format(startDate, "eeee, MMM d")}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="rounded-md border border-muted-foreground/20 p-[11px]">
            <MapPinIcon className="size-5" />
          </div>
          <div className="font-medium leading-5">{location}</div>
        </div>
      </div>
    </div>
  );
};

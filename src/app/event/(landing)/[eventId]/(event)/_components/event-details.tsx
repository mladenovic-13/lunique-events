import { format } from "date-fns";
import { ClockIcon, MapPinIcon } from "lucide-react";

import { CalendarIcon } from "@/components/icons/calendar-icon";

interface EventDetailsProps {
  name: string;
  host: string;
  date: Date;
  timezone: string;
  location: string;
}

export const EventDetails = ({
  name,
  host,
  date,
  timezone,
  location,
}: EventDetailsProps) => {
  console.log({ date, timezone });

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-3xl font-semibold">{name}</h1>
        <p className="text-xs text-muted-foreground">Hosted by {host}</p>
      </div>
      <div className="space-y-1.5 md:flex md:items-center md:gap-5 md:space-y-0">
        <div className="flex items-center gap-3">
          <CalendarIcon date={date} />
          <div className="flex items-center gap-3">
            <p className="font-medium leading-5">
              {format(date, "eeee, MMM d")}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="rounded-md border border-muted-foreground/20 p-[11px]">
            <ClockIcon className="size-5" />
          </div>
          <div className="flex items-center gap-3">
            <p className="font-medium leading-5">
              {format(date, "kk:mm")}h
              {/* {formatInTimeZone(date, timezone, "kk mm")} */}
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

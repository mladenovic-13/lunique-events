import { format } from "date-fns";
import { MapPinIcon } from "lucide-react";

import { CalendarIcon } from "@/components/icons/calendar-icon";
import { api } from "@/trpc/server";
import { type RouterOutputs } from "@/trpc/shared";

interface EventDetailsProps {
  eventId: string;
}

export async function EventDetails({ eventId }: EventDetailsProps) {
  const data: RouterOutputs["event"]["getOverview"] =
    await api.event.getOverview.query({ id: eventId });

  return (
    <>
      <h2 className="text-xl font-semibold">When & Where</h2>

      <div className="flex items-center gap-3">
        <CalendarIcon date={data ? data.startDate : new Date()} />
        <div className="flex flex-col">
          <DisplayDate
            startDate={data ? data.startDate : new Date()}
            endDate={data ? data.endDate : new Date()}
          />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="rounded-md border border-muted-foreground/20 p-[11px]">
          <MapPinIcon className="size-5" />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-lg font-medium leading-5">
            {data?.location?.mainText}
          </p>
          <p className="text-sm text-muted-foreground">
            {data?.location?.secondaryText}
          </p>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">
        This address is shown publicly on the event page.
      </p>
    </>
  );
}

interface DisplayDateProps {
  startDate: Date;
  endDate: Date;
}

const DisplayDate = ({ startDate, endDate }: DisplayDateProps) => {
  return (
    <div className="flex flex-col">
      <p className="font-semibold">
        {format(startDate, "EEEE")}, {format(startDate, "LLL")}{" "}
        {format(startDate, "I")}
      </p>
      <p className="text-sm text-accent-foreground/50">
        {format(startDate, "p")} - {format(endDate, "LLL")}{" "}
        {format(endDate, "I")}, {format(endDate, "p")}
      </p>
    </div>
  );
};

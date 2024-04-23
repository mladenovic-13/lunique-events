"use client";

import { useState } from "react";
import { format } from "date-fns";
import { MapPinIcon } from "lucide-react";

import { CalendarIcon } from "@/components/icons/calendar-icon";
import { Button } from "@/components/ui/button";
import { type RouterOutputs } from "@/trpc/shared";

// import { EditEventForm } from "./edit-event-form";
import { NewEditEventForm } from "./new-edit-event-form";

interface EventDetailsProps {
  event: RouterOutputs["event"]["get"];
}

export const EventDetails = ({ event }: EventDetailsProps) => {
  const [isEditable, setIsEditable] = useState(false);

  return (
    <>
      {/* <EditEvent event={event} /> */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">When & Where</h2>
        <Button onClick={() => setIsEditable(!isEditable)}>
          {!isEditable && "Edit Event"}
          {isEditable && "Back to details"}
        </Button>
      </div>
      {!isEditable && (
        <div className="space-y-3 md:space-y-5">
          <div className="flex items-center gap-3">
            <CalendarIcon date={event ? event.startDate : new Date()} />
            <div className="flex flex-col">
              <DisplayDate
                startDate={event ? event.startDate : new Date()}
                endDate={event ? event.endDate : new Date()}
                startTime={event ? event?.startTime : ""}
                endTime={event ? event?.endTime : ""}
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-md border border-muted-foreground/20 p-[11px]">
              <MapPinIcon className="size-5" />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-lg font-medium leading-5">
                {event?.location
                  ? event.location.mainText
                  : "Location is missing"}
              </p>
              <p className="text-sm text-muted-foreground">
                {event?.location?.secondaryText}
              </p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            This address is shown publicly on the event page.
          </p>
        </div>
      )}
      {isEditable && (
        <NewEditEventForm
          event={event}
          onEventUpdate={() => setIsEditable(false)}
        />
      )}
    </>
  );
};

interface DisplayDateProps {
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
}

const DisplayDate = ({
  startDate,
  endDate,
  startTime,
  endTime,
}: DisplayDateProps) => {
  return (
    <div className="flex flex-col">
      <p className="font-semibold">
        {format(startDate, "EEEE")}, {format(startDate, "LLL")}{" "}
        {format(startDate, "do")} - {startTime}
      </p>
      <p className="text-sm text-accent-foreground/50">
        Ends: {format(endDate, "LLL")} {format(endDate, "d")}, {endTime}
      </p>
    </div>
  );
};

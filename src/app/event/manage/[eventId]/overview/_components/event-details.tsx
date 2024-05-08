"use client";

import { useState } from "react";
import { format } from "date-fns";
import { ChevronLeftIcon, CircleCheckBigIcon, MapPinIcon } from "lucide-react";
import Image from "next/image";

import { CalendarIcon } from "@/components/icons/calendar-icon";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import placeHolderImg from "@/public/images/you-are-invited.jpeg";
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
      <div className="flex items-center justify-between "></div>
      {isEditable && (
        <div className="flex flex-col justify-between gap-2 py-1 pb-10 md:flex-row md:px-4">
          <h1 className="pb-2 text-3xl font-semibold">Update Event</h1>

          <div className="flex justify-between gap-2 md:justify-normal">
            <Button
              variant={"secondary"}
              className="gap-2"
              onClick={() => setIsEditable(false)}
            >
              <ChevronLeftIcon size={16} />
              Discard
            </Button>
            <Button className="gap-2" form="edit-event-form">
              <CircleCheckBigIcon size={16} />
              Save Changes
            </Button>
          </div>
        </div>
      )}
      {!isEditable && (
        <div className="flex flex-col justify-center gap-4 md:flex-row">
          <div className="md:w-1/2">
            <AspectRatio ratio={5 / 4} className="">
              <Image
                src={event?.thumbnailUrl ?? placeHolderImg}
                width={400}
                height={400}
                alt=""
                className="size-full rounded-md object-cover"
              />
            </AspectRatio>
          </div>
          <div className="space-y-3 md:w-1/2 md:space-y-5">
            <h2 className="text-2xl font-semibold">When & Where</h2>

            <div className="flex items-center gap-3">
              <CalendarIcon
                date={event?.startDate ? event.startDate : new Date()}
              />
              <DisplayDate
                startDate={event?.startDate ? event.startDate : new Date()}
                endDate={event?.endDate ? event.endDate : new Date()}
              />
            </div>
            <div className="flex items-center gap-3">
              <MapPinIcon className="size-11 rounded-md border border-muted-foreground/20 p-2" />
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
            {!isEditable && (
              <div className="flex gap-2 md:pt-20">
                <Button
                  variant={"secondary"}
                  onClick={() => setIsEditable(true)}
                  className="w-full"
                >
                  Change Photo
                </Button>
                <Button onClick={() => setIsEditable(true)} className="w-full">
                  Edit Event
                </Button>
              </div>
            )}
          </div>
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
}

const DisplayDate = ({ startDate }: DisplayDateProps) => {
  return (
    <div className="flex flex-col">
      <p className="font-semibold">
        {format(startDate, "EEEE")}, {format(startDate, "LLL")}{" "}
        {/* TODO: fix */}
        {/* {format(startDate, "do")} - {startTime} */}
      </p>
      <p className="text-sm text-accent-foreground/50">
        {/* TODO: fix */}
        {/* Ends: {format(endDate, "LLL")} {format(endDate, "d")}, {endTime} */}
      </p>
    </div>
  );
};

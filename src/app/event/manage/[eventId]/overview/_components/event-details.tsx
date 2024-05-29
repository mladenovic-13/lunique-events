"use client";

import { useState } from "react";
import { format } from "date-fns";
import { AlarmClockIcon, ChevronLeftIcon, MapPinIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { CalendarIcon } from "@/components/icons/calendar-icon";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useImageUpload } from "@/hooks/use-image-upload";
import { getThumbnailImagePath } from "@/lib/get-path";
import { type UpdateEvent } from "@/lib/validation";
import placeHolderImg from "@/public/images/you-are-invited.jpeg";
import { api, type RouterOutputs } from "@/trpc/react";

import { NewEditEventForm } from "./new-edit-event-form";

interface EventDetailsProps {
  event: NonNullable<RouterOutputs["event"]["get"]>;
  registrationSettings: NonNullable<RouterOutputs["event"]["getRegistration"]>;
}

export const EventDetails = ({
  event,
  registrationSettings,
}: EventDetailsProps) => {
  const [isEditable, setIsEditable] = useState(false);
  const { mutate: updateThumbnail } = api.event.updateThumbnail.useMutation();
  const router = useRouter();

  const defaultValues: UpdateEvent = {
    public: event.isPublic,
    organization: event.organization.id,
    name: event.name,
    date: event.date.toISOString() ?? new Date().toISOString(),
    timezone: event.timezone,
    location: event.location
      ? {
          placeId: event.location.placeId,
          mainText: event.location.mainText,
          secondaryText: event.location.secondaryText,
          description: event.location.description,
          position: {
            lat: event.location.lat,
            lng: event.location.lng,
          },
        }
      : null,
    description: event.description,
    requireApproval: false,
    capacity: !!registrationSettings.capacity,
    capacityValue: registrationSettings.capacity ?? 100,
    capacityWaitlist: registrationSettings.waitlist,
    userName: registrationSettings.name,
    userEmail: true,
    userWebsite: registrationSettings.website,
    userLinkedIn: registrationSettings.linkedIn,
    questions: registrationSettings.questions.map((q) => q.question),
  };

  const defaultThumbnail = event.thumbnailUrl;

  // useEffect(() => {
  //   onChange(defaultValue);
  // }, [defaultValue, onChange]);

  const { getInputProps, getRootProps } = useImageUpload({
    pathFormatter: getThumbnailImagePath,
    onSuccess: (url) => {
      updateThumbnail(
        { eventId: event.id, thumbnailURL: url },
        {
          onSuccess: () => {
            toast({ title: "Thumbnail updated" });
            router.refresh();
          },
          onError: () => {
            toast({ title: "Update failed", variant: "destructive" });
          },
        },
      );
    },
    onError: () => {
      toast({ title: "Thumbnail error", variant: "destructive" });
    },
  });

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
          </div>
        </div>
      )}
      {!isEditable && (
        <div className="flex flex-col justify-center gap-4 md:flex-row">
          <div className="md:w-1/2">
            <AspectRatio ratio={5 / 4} className="">
              <Image
                src={defaultThumbnail ?? placeHolderImg}
                width={400}
                height={400}
                alt=""
                className="size-full rounded-md object-cover"
              />
            </AspectRatio>
          </div>
          <div className="space-y-3 text-lg font-medium md:w-1/2 md:space-y-5">
            <h2 className="text-2xl font-semibold">When & Where</h2>

            <div className="flex items-center gap-3">
              <CalendarIcon date={event.date} size="base" />
              <DisplayDate date={event.date} />
            </div>
            <div className="flex items-center gap-3 ">
              <MapPinIcon className="size-11 rounded-md border border-muted-foreground/20 p-2.5 text-muted-foreground" />
              <div className="flex flex-col gap-1">
                <p className="leading-5">
                  {event?.location
                    ? event.location.mainText
                    : "Location is missing"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {event?.location?.secondaryText}
                </p>
              </div>
            </div>
            <p className="text-sm font-normal text-muted-foreground">
              This address is shown publicly on the event page.
            </p>
            {!isEditable && (
              <div className="flex gap-2 md:pt-20">
                <Button variant={"secondary"} className="w-full">
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    Change Photo
                  </div>
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
          defaultValues={defaultValues}
          onEventUpdate={() => console.log("mrk")}
        />
      )}
    </>
  );
};
interface DisplayDateProps {
  date: Date;
}

const DisplayDate = ({ date }: DisplayDateProps) => {
  return (
    <div className="flex flex-col">
      <p className="">
        {format(date, "EEEE")}, {format(date, "LLL")} {/* TODO: fix */}
        {format(date, "do")}
      </p>
      <div className="flex items-center justify-start gap-2 text-accent-foreground/50">
        <AlarmClockIcon className="size-3" />
        <p className="text-sm ">{format(date, "H:mm")}</p>
      </div>
    </div>
  );
};

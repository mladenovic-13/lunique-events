"use client";

import { useState } from "react";
import { type Event } from "@prisma/client";
import {
  ArrowUpRightIcon,
  CalendarOff,
  ChevronsRightIcon,
  CircleIcon,
  CopyIcon,
  Users2Icon,
} from "lucide-react";
import { ArrowRight, MapPinIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { EventPageContent } from "@/app/event/(landing)/[eventId]/(event)/_components/event-page-content";
import { EventCard } from "@/app/organization/(landing)/[organizationId]/_components/event-card";
import { EventListItem } from "@/app/organization/(landing)/[organizationId]/_components/event-list-item";
import { Timeline } from "@/components/layout/timeline";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useConfig } from "@/hooks/use-config-store";
import { images } from "@/lib/data";
import { awsImageLoader } from "@/lib/image-loader";
import { cn } from "@/lib/utils";
import imagePlaceholder from "@/public/images/you-are-invited.jpeg";
import { paths } from "@/routes/paths";
import { api } from "@/trpc/react";

import { type Timeframe } from "./events";

type RenderTimeframeProps = {
  timeframe: Timeframe;
};

export const RenderTimeframe = ({ timeframe }: RenderTimeframeProps) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const { organization } = useConfig();

  const { data, isLoading } = api.event.list.useQuery(
    { eventTimeFrame: timeframe, organizationId: organization },
    { enabled: !!timeframe && !!organization },
  );

  const handleSheetOpen = (event: Event) => {
    setIsSheetOpen(true);
    setCurrentEvent(event);
  };

  const handleSheetClose = () => {
    setIsSheetOpen(false);
    setCurrentEvent(null);
  };
  const searchParams = useSearchParams();
  const viewMode = searchParams.get("viewMode");

  if (isLoading) return <Skeleton />;

  if (data?.length === 0) return <NoEvents timeframe={timeframe} />;

  if (data && data?.length !== 0)
    return (
      <div className="flex flex-col gap-6 md:gap-6">
        <div
          className={cn(
            "flex flex-1 flex-col",
            viewMode === "list" && "space-y-14",
            viewMode === "card" && "space-y-4",
          )}
        >
          {data.map((event, idx) =>
            viewMode === "card" ? (
              <Timeline
                idx={idx}
                dataLength={data.length}
                key={idx}
                date={event.startDate}
              >
                <EventCard
                  event={event}
                  location={null}
                  guests={4}
                  onClick={() => handleSheetOpen(event)}
                />
              </Timeline>
            ) : (
              <EventListItem
                key={idx}
                date={event.startDate}
                event={event}
                creator={null}
                onClick={() => handleSheetOpen(event)}
              />
            ),
          )}
        </div>

        <Sheet open={isSheetOpen} onOpenChange={handleSheetClose}>
          <SheetContent
            side="right"
            close={false}
            className="overflow-hidden p-0 outline-none"
          >
            <div className="sticky -top-0.5 z-50 -mt-0.5 flex items-center justify-between rounded-t-md border-y bg-background px-1.5 py-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSheetOpen(false)}
              >
                <ChevronsRightIcon />
              </Button>
              <div className="flex items-center gap-1.5">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => alert("TODO: Copy link to clipboard")}
                >
                  <CopyIcon className="mr-1.5 size-4" />
                  Copy Link
                </Button>
                <Link
                  href={paths.event.landing.root(currentEvent?.id ?? "")}
                  className={buttonVariants({
                    variant: "secondary",
                    size: "sm",
                  })}
                >
                  Open Event Page
                  <ArrowUpRightIcon className="ml-1.5 size-4" />
                </Link>
              </div>
            </div>
            <ScrollArea className="h-full">
              <EventPageContent isMobile />
              <ScrollBar orientation="vertical" />
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>
    );

  return null;
};

interface EventCardProps {
  event: Event;
  onClick: () => void;
}

export const EventCardOld = ({ event, onClick }: EventCardProps) => {
  const { name, locationId: location } = event;

  return (
    <Card
      onClick={onClick}
      className="flex cursor-pointer flex-col-reverse rounded-lg transition duration-200 hover:border-muted-foreground/30 hover:bg-muted/70 md:flex-row"
    >
      <CardHeader className="flex flex-1 flex-col justify-around gap-3 py-3">
        <CardDescription className="hidden md:block">
          {event.startTime}
        </CardDescription>
        <CardTitle className="cursor-pointer text-lg font-semibold">
          {name}
        </CardTitle>
        <div className="space-y-1.5 text-muted-foreground">
          <p className="flex items-center gap-1.5 text-sm">
            <MapPinIcon className="size-4" />
            {location ? location : "Missing location "}
          </p>
          <p className="flex items-center gap-1.5 text-sm">
            <Users2Icon className="size-4" />
            {/* TODO: add real guests number */}
            {/* No Guests */}
            15 Guests
          </p>
        </div>
        <Link
          href={paths.event.manage.overview(event.id)}
          className={buttonVariants({
            size: "sm",
            variant: "default",
            className: "md:w-44",
          })}
          onClick={(e) => e.stopPropagation()}
        >
          <p>Manage Event</p>
          <ArrowRight className="ml-1.5 size-3.5" />
        </Link>
      </CardHeader>
      {images[0] && (
        <CardContent className="p-3 pb-0 md:p-5">
          <Image
            loader={awsImageLoader}
            width={500}
            height={281}
            src={imagePlaceholder}
            // src={images[0].url ?? ""}
            alt={name}
            className="rounded-lg object-cover md:size-[180px] "
          />
        </CardContent>
      )}
    </Card>
  );
};

const NoEvents = ({ timeframe: timeFrame }: { timeframe: Timeframe }) => {
  return (
    <div className="flex h-96 w-full flex-col items-center justify-center gap-8 rounded-lg border border-dashed text-center">
      <div className="size-fit rounded-full bg-primary/40 p-5">
        <CalendarOff className="size-16 text-primary-foreground" />
      </div>
      {timeFrame === "upcoming" && (
        <div className="space-y-1">
          <p className="text-xl font-semibold">No Upcoming Events</p>
          <p className="text-sm text-zinc-500">
            You have no upcoming events. Why not host one?
          </p>
        </div>
      )}
      {timeFrame === "past" && (
        <div className="space-y-1">
          <p className="text-xl font-semibold">No Past Events</p>
          <p className="text-sm text-zinc-500">
            You have not hosted or attended any event.
          </p>
        </div>
      )}
      {timeFrame === "upcoming" && <Button>Create Event</Button>}
    </div>
  );
};

const Skeleton = () => (
  <div className="flex animate-pulse flex-col gap-6 md:gap-0">
    {Array(3)
      .fill(0)
      .map((_, index) => index + 1)
      .map((idx) => (
        <div key={idx} className="flex w-full gap-4 md:h-[250px] md:gap-0">
          <div className="flex w-1/12 flex-col justify-between md:w-1/3 md:flex-row">
            <div className="hidden space-y-1.5 px-1.5 md:block">
              <div className="h-5 w-24 rounded-md bg-muted/80" />
              <div className="h-5 w-20 rounded-md bg-muted/60" />
            </div>
            <div className="flex h-full flex-col items-center md:px-10  ">
              <CircleIcon className="size-4 text-border" />
              <div
                className={cn(
                  " -mb-6 h-[105%] w-[1px] border-l-2 border-dashed border-border/80 md:mb-0",
                )}
              />
            </div>
          </div>
          <div className="-mt-2 flex-1 space-y-3">
            <div className="flex items-center gap-3 px-3 md:hidden">
              <div className="h-5 w-36 rounded-md bg-muted/60" />
            </div>
            <Card className="flex flex-col-reverse rounded-lg md:flex-row ">
              <CardHeader className="flex flex-1 flex-col justify-around gap-3 py-3">
                <CardDescription className="hidden h-4 w-16 rounded-md bg-muted/60 md:block" />

                <CardTitle className="h-5 w-36 rounded-md bg-muted/80" />

                <div className="space-y-2">
                  <p className="h-4 w-40 rounded-md bg-muted/60" />
                  <p className="h-4 w-32 rounded-md bg-muted/60" />
                </div>
                <div className="h-8 w-full rounded-md bg-muted/80 md:w-44" />
              </CardHeader>
              <div className="p-3 md:p-5">
                <div className="h-[180px] w-full rounded-md bg-muted/60 md:w-[180px]" />
              </div>
            </Card>
          </div>
        </div>
      ))}
  </div>
);

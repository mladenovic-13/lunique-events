"use client";

import { CalendarOff, CircleIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { Timeline } from "@/components/layout/timeline";
import { EventCard } from "@/components/partials/event/event-card";
import { EventListItem } from "@/components/partials/event/event-list-item";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useOrganizationId } from "@/hooks/use-config-store";
import { cn } from "@/lib/utils";
import { paths } from "@/routes/paths";
import { api } from "@/trpc/react";
import { type Timeframe } from "@/types";

export const Events = () => {
  const searchParams = useSearchParams();
  const timeframe = searchParams.get("timeframe") ?? "upcoming";
  const view = searchParams.get("view") ?? "card";

  const organizationId = useOrganizationId();

  const router = useRouter();

  const { data, isLoading } = api.event.list.useQuery(
    { timeframe: timeframe, organizationId: organizationId },
    { enabled: !!timeframe && !!organizationId },
  );

  if (isLoading) return <Skeleton />;

  if (data?.length === 0)
    return <NoEvents timeframe={timeframe as Timeframe} />;

  if (data && data?.length !== 0)
    return (
      <div
        className={cn(
          "flex flex-1 flex-col",
          view === "list" && "gap-10",
          view === "card" && "gap-5",
        )}
      >
        {view === "card" &&
          data.map((event, idx) => (
            <Timeline
              idx={idx}
              dataLength={data.length}
              key={idx}
              date={event.startDate}
            >
              <EventCard
                onClick={() => router.push(paths.event.landing.root(event.id))}
                event={event}
                location={null}
                guests={4}
              />
            </Timeline>
          ))}
        {view === "list" &&
          data.map((event, idx) => (
            <EventListItem
              key={idx}
              date={event.startDate}
              event={event}
              creator={null}
              onClick={() => router.push(paths.event.landing.root(event.id))}
            />
          ))}
      </div>
    );

  return null;
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

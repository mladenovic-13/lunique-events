"use client";

import { useCallback } from "react";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import { Timeline } from "@/components/layout/timeline";
import { EventCard } from "@/components/partials/event/event-card";
import { EventTimeframeTabs } from "@/components/partials/event/event-date-tabs";
import { EventListItem } from "@/components/partials/event/event-list-item";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { paths } from "@/routes/paths";
import { api } from "@/trpc/react";

import { CalendarSubscriptionButton } from "./_components/callendar-subscription-button";
import { Clock } from "./_components/clock";
import { CoverImage } from "./_components/cover-image";
import { OrganizationHeader } from "./_components/organization-header";
import { OrganizationSkeleton } from "./_components/organization-skeleton";
import { ScrollSectionButtons } from "./_components/scroll-section-buttons";
import { ViewTabs } from "./_components/view-tabs";

export default function CalendarPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const timeframe = searchParams.get("timeframe") ?? "upcoming";
  const view = searchParams.get("view") ?? "card";

  const { organizationId } = useParams<{ organizationId: string }>();
  const { data: organization, isLoading } = api.organization.get.useQuery({
    id: organizationId,
    timeframe: timeframe,
  });

  const selectedCalendarDays: Date[] = [];
  // TODO: fix ???
  // if (organization) {
  //   organization.events.forEach((event) =>
  //     // TODO: fix
  //     selectedCalendarDays.push(event.date ?? new Date()),
  //   );
  // }

  const selectedDaysStyle = {
    border: "1px solid currentColor",
    borderRadius: "20px",
    fontWeight: "bolder",
  };

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const query = new URLSearchParams(searchParams.toString());
      query.set(name, value);

      return query.toString();
    },
    [searchParams],
  );

  const onViewChange = (value: string) => {
    router.push(pathname + "?" + createQueryString("view", value), {
      scroll: false,
    });
  };
  const onTimeframeChange = (value: string) => {
    router.push(pathname + "?" + createQueryString("timeframe", value), {
      scroll: false,
    });
  };

  if (isLoading) return <OrganizationSkeleton />;

  return (
    <section>
      {organization && <CoverImage src={organization?.coverUrl} />}
      <div className="mx-auto min-h-96  space-y-5 p-3 md:space-y-8 md:px-0">
        <div className="mx-auto max-w-4xl">
          {organization && (
            <OrganizationHeader
              imageSrc={organization?.thumbnailUrl}
              organizationName={organization?.name}
              organizationId={organization.id}
            />
          )}
        </div>
        <Separator className="hidden w-full md:block" />
        <ScrollSectionButtons className="md:hidden" />
        <div className="mx-auto max-w-4xl">
          <div className="flex md:justify-between md:space-x-4">
            <div className="flex flex-1 flex-col space-y-4">
              <section className="flex justify-between pb-6">
                <div>
                  <h1 className="text-2xl font-semibold">Events</h1>
                </div>
                <div className="flex  space-x-2">
                  <Link href={paths.event.create}>
                    <Button
                      variant={"secondary"}
                      className="h-8 space-x-2 pl-2"
                    >
                      <PlusIcon size={14} />
                      <p className="text-sm font-normal">Add Event</p>
                    </Button>
                  </Link>
                  <div className="">
                    <ViewTabs value={view} onValueChange={onViewChange} />
                  </div>
                </div>
              </section>
              {view === "card" && (
                <div className="flex flex-col gap-10">
                  {/* {organization?.events.map((event, idx) => (
                    <Timeline
                      mode={"compact"}
                      idx={idx}
                      dataLength={organization.events.length}
                      key={idx}
                      // TODO: fix
                      date={event.startDate ?? new Date()}
                    >
                      <EventCard
                        event={event}
                        location={event.location}
                        guests={4}
                        onClick={() =>
                          router.push(paths.event.landing.root(event.id))
                        }
                      />
                    </Timeline>
                  ))} */}
                </div>
              )}
              {view === "list" && (
                <div className="flex flex-col gap-12">
                  {/* {organization?.events.map((event, idx) => (
                    <EventListItem
                      key={idx}
                      // TODO: fix
                      date={event.startDate ?? new Date()}
                      event={event}
                      creator={event.creator.name}
                      onClick={() =>
                        router.push(paths.event.landing.root(event.id))
                      }
                    />
                  ))} */}
                </div>
              )}
            </div>
            <div className="hidden flex-col space-y-4 md:flex">
              <div className="flex justify-between space-x-2">
                <Clock />
                <CalendarSubscriptionButton />
              </div>
              <div className="flex flex-col space-y-2 rounded-lg border p-1 pb-2">
                <Calendar
                  mode="single"
                  initialFocus
                  modifiers={{ selectedDays: selectedCalendarDays }}
                  modifiersStyles={{ selectedDays: selectedDaysStyle }}
                />
                <EventTimeframeTabs
                  value={timeframe}
                  onValueChange={onTimeframeChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import { EventTimeframeTabs } from "@/app/home/(events)/_components/event-date-tabs";
import { Timeline } from "@/components/layout/timeline";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { upcomingAndPastEvents } from "@/lib/mock-events";
import { api } from "@/trpc/react";

import { CalendarSubscriptionButton } from "./_components/callendar-subscription-button";
import { Clock } from "./_components/clock";
import { CoverImage } from "./_components/cover-image";
import { EventCard } from "./_components/event-card";
import { EventListItem } from "./_components/event-list-item";
import { EventsButtons } from "./_components/events-buttons";
import { OrganizationHeader } from "./_components/organization-header";
import { ScrollSectionButtons } from "./_components/scroll-section-buttons";
import { type ViewMode } from "./_components/view-tabs";

export default function CalendarPage() {
  const router = useRouter();
  const pathname = usePathname();
  const viewMode = useSearchParams().get("viewMode");

  const onValueChange = (value: ViewMode) => {
    const query = new URLSearchParams();
    query.set("viewMode", value);
    router.push(`${pathname}?${query.toString()}`, { scroll: false });
  };
  const demoEvents = upcomingAndPastEvents.upcoming;

  const { organizationId } = useParams<{ organizationId: string }>();
  const { data: organization } = api.organization.get.useQuery({
    id: organizationId,
  });
  console.log(organization);
  return (
    <section>
      {organization && <CoverImage src={organization?.coverUrl} />}
      <div className="mx-auto min-h-96  space-y-5 p-3 md:space-y-8 md:px-0">
        <div className="mx-auto max-w-4xl">
          {organization && (
            <OrganizationHeader
              imageSrc={organization?.thumbnailUrl}
              organizationName={organization?.name}
            />
          )}
        </div>
        <Separator className="hidden w-full md:block" />
        <ScrollSectionButtons className="md:hidden" />
        <div className="mx-auto max-w-4xl">
          <div className="flex md:justify-between md:space-x-4">
            <div className="flex flex-1 flex-col space-y-4">
              <EventsButtons mode={"card"} onValueChange={onValueChange} />
              {organization &&
                organization.events.map(
                  (event, idx) =>
                    viewMode === "card" && (
                      <Timeline
                        mode={"compact"}
                        idx={idx}
                        dataLength={demoEvents.length}
                        key={idx}
                        date={event.startDate}
                      >
                        <EventCard
                          event={event}
                          location={event.location}
                          guests={4}
                        />
                      </Timeline>
                    ),
                )}
              <div className="flex flex-col gap-12">
                {organization &&
                  organization.events.map(
                    (event, idx) =>
                      viewMode === "list" && (
                        <EventListItem
                          key={idx}
                          date={event.startDate}
                          event={event}
                          creator={event.creator.name}
                        />
                      ),
                  )}
              </div>
            </div>
            <div className="hidden flex-col space-y-4 md:flex">
              <div className="flex justify-between space-x-2">
                <Clock />
                <CalendarSubscriptionButton />
              </div>
              <div className="flex flex-col space-y-2 rounded-lg border p-1 pb-2">
                <Calendar mode="single" initialFocus />
                <EventTimeframeTabs
                  onValueChange={(value) => console.log(value)}
                  value="upcoming"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

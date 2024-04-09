"use client";
import { EventTimeframeTabs } from "@/app/home/(events)/_components/event-date-tabs";
import { Timeline } from "@/components/layout/timeline";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { upcomingAndPastEvents } from "@/lib/mock-events";

import { CalendarSubscriptionButton } from "./_components/callendar-subscription-button";
import { Clock } from "./_components/clock";
import { CoverImage } from "./_components/cover-image";
import { EventCard } from "./_components/event-card";
import { EventsButtons } from "./_components/events-buttons";
import { OrganizationHeader } from "./_components/organization-header";
import { ScrollSectionButtons } from "./_components/scroll-section-buttons";

export default function CalendarPage() {
  const demoEvents = upcomingAndPastEvents.upcoming;

  return (
    <section>
      <CoverImage />
      <div className="mx-auto min-h-96  space-y-5 p-3 md:space-y-8 md:px-0">
        <div className="mx-auto max-w-4xl">
          <OrganizationHeader />
        </div>
        <Separator className="hidden w-full md:block" />
        <ScrollSectionButtons className="md:hidden" />
        <div className="mx-auto max-w-4xl">
          <div className="flex md:justify-between md:space-x-4">
            <div className="flex flex-1 flex-col space-y-4">
              <EventsButtons />
              {demoEvents.length > 0 &&
                demoEvents.map((event, idx) => (
                  <Timeline
                    mode="compact"
                    idx={idx}
                    dataLength={demoEvents.length}
                    key={idx}
                    date={event.date}
                  >
                    <EventCard />
                  </Timeline>
                ))}
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

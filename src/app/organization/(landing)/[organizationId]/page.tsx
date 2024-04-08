"use client";
import { LocationMap } from "@/app/event/create/_components/location-map";
import { EventTimeframeTabs } from "@/app/home/(events)/_components/event-date-tabs";
import { Events } from "@/app/home/(events)/_components/events";
import { MainPage } from "@/components/layout/main-page";
import { Calendar } from "@/components/ui/calendar";

import { CalendarSubscriptionButton } from "./_components/callendar-subscription-button";
import { Clock } from "./_components/clock";
import { CoverImage } from "./_components/cover-image";
import { EventsButtons } from "./_components/events-buttons";
import { OrganizationHeader } from "./_components/organization-header";
import { ScrollSectionButtons } from "./_components/scroll-section-buttons";

export default function CalendarPage() {
  return (
    <section>
      <CoverImage />
      <MainPage>
        <OrganizationHeader />
        <ScrollSectionButtons className="md:hidden" />
        <div className="space-y-4 md:hidden">
          <EventsButtons />
          <Events />
        </div>
        <div className="hidden md:flex md:space-x-8 ">
          <div className="flex flex-col space-y-4 ">
            <EventsButtons />
            <Events />
          </div>
          <div className="flex flex-col space-y-4">
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
            <div>
              <LocationMap position={{ lat: 43.3209, lng: 21.8954 }} />
            </div>
          </div>
        </div>
      </MainPage>
    </section>
  );
}

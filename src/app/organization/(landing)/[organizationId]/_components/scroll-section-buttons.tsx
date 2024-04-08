"use client";
import React from "react";

import { CalendarSubscriptionButton } from "./callendar-subscription-button";
import { Clock } from "./clock";
import { EventsFilter } from "./events-filter";
import { ShowMapButton } from "./show-map-button";

export const ScrollSectionButtons = () => {
  return (
    <div className="flex gap-2  overflow-x-auto pb-1.5 md:grid md:grid-cols-4 md:overflow-hidden">
      <Clock />
      <EventsFilter />
      <ShowMapButton />
      <CalendarSubscriptionButton />
    </div>
  );
};

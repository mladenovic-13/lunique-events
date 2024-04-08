"use client";
import React from "react";

import { cn } from "@/lib/utils";

import { CalendarSubscriptionButton } from "./callendar-subscription-button";
import { Clock } from "./clock";
import { EventsFilter } from "./events-filter";
import { ShowMapButton } from "./show-map-button";

interface ScrollSectionButtonsProps {
  className?: string;
}

export const ScrollSectionButtons = ({
  className,
}: ScrollSectionButtonsProps) => {
  return (
    <div className={cn("flex  gap-2 overflow-x-auto pb-1.5", className)}>
      <Clock />
      <EventsFilter />
      <ShowMapButton />
      <CalendarSubscriptionButton />
    </div>
  );
};

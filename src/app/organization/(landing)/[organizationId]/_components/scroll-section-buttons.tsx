"use client";
import React from "react";

import { cn } from "@/lib/utils";

import { CalendarSubscriptionButton } from "./callendar-subscription-button";
import { Clock } from "./clock";
import { EventsFilter } from "./events-filter";

interface ScrollSectionButtonsProps {
  className?: string;
}

export const ScrollSectionButtons = ({
  className,
}: ScrollSectionButtonsProps) => {
  return (
    <div className={cn("flex flex-1  gap-2 overflow-x-auto pb-1.5", className)}>
      <Clock />
      <EventsFilter />
      <CalendarSubscriptionButton />
    </div>
  );
};

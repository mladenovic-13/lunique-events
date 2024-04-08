import React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const EventsFilter = () => {
  return (
    <section>
      <div className="flex w-36 items-center justify-center space-x-1.5 rounded-lg bg-muted p-1 text-sm">
        <Select>
          <SelectTrigger className="h-6 w-[180px] border-none p-2 focus:ring-0 ">
            <SelectValue placeholder="Filter Events" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All Events</SelectItem>
              <SelectItem value="available">Available Only</SelectItem>
              <SelectLabel>Time</SelectLabel>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="past">Past</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </section>
  );
};

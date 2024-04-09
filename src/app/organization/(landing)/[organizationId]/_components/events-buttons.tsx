import React from "react";
import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import { ViewTabs } from "./view-tabs";

export const EventsButtons = () => {
  return (
    <section className="flex justify-between">
      <div>
        <h1 className="text-2xl font-semibold">Events</h1>
      </div>
      <div className="flex  space-x-2">
        <Button variant={"secondary"} className="h-8 space-x-2 pl-2">
          <PlusIcon size={14} />
          <p className="text-sm font-normal">Add Event</p>
        </Button>
        <div className="">
          <ViewTabs />
        </div>
      </div>
    </section>
  );
};

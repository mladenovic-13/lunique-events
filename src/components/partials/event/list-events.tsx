"use client";

import { EventCard } from "@/components/cards/event-card";
import { paths } from "@/routes/paths";
import { type RouterOutputs } from "@/trpc/shared";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NoEvents } from "./no-events";
import { useState } from "react";
import { api } from "@/trpc/react";

interface ListEventsProps {
  events: NonNullable<RouterOutputs["event"]["list"]>;
}

type EventDate = "upcoming" | "past";

export const ListEvents = ({ events }: ListEventsProps) => {
  const [tab, setTab] = useState<EventDate>("upcoming");

  const { data } = api.event.list.useQuery(
    { date: tab },
    { initialData: events },
  );

  return (
    <div>
      <Tabs
        value={tab}
        className="mb-8"
        onValueChange={(value) => {
          setTab(value as EventDate);
        }}
      >
        <TabsList>
          <TabsTrigger value="upcoming" className="w-[100px]">
            Upcoming
          </TabsTrigger>

          <TabsTrigger value="past" className="w-[100px]">
            Past
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="grid gap-3 md:grid-cols-4">
        {data.map((event) => (
          <Link
            href={paths.events.event(String(event.id))}
            key={event.id}
            className="transition duration-200 lg:hover:opacity-80"
          >
            <EventCard event={event} />
          </Link>
        ))}
      </div>
    </div>
  );
};

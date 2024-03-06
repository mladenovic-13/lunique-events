"use client";

import { EventCard } from "@/components/cards/event-card";
import { paths } from "@/routes/paths";
import { type RouterOutputs } from "@/trpc/shared";
import Link from "next/link";
import { useState } from "react";
import { api } from "@/trpc/react";
import { EventDateTabs } from "./event-date-tabs";

interface ListEventsProps {
  events: NonNullable<RouterOutputs["event"]["list"]>;
}

type EventDate = "upcoming" | "past";

export const ListEvents = ({ events }: ListEventsProps) => {
  const [tab, setTab] = useState<EventDate>(() => "upcoming");

  const {
    data,
    // isLoading, -> iskoristi ovo za loading state kad se menja tab
    // isError, -> ne bi bilo lose i greska da se hendluje
    // error handling: https://nextjs.org/docs/app/building-your-application/routing/error-handling
  } = api.event.list.useQuery(
    { date: tab },
    { enabled: !!tab, initialData: events },
  );

  return (
    <div className="space-y-3 md:space-y-5">
      <EventDateTabs value={tab} onValueChange={setTab} />

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

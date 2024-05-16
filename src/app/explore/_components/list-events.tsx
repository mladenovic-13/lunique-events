"use client";

import { type Event } from "@prisma/client";
import Link from "next/link";

import { paths } from "@/routes/paths";
import { api } from "@/trpc/react";

import { EventCard } from "./event-card";
import { ListEventsSkeleton } from "./list-events-skeleton";

export const ListEvents = () => {
  const { data, isLoading } = api.explore.list.useInfiniteQuery(
    {
      limit: 9,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );

  console.log({ data });

  const events = data?.pages
    .map((page) => page.events)
    .reduce((acc: Event[], events) => [...acc, ...events], []);

  console.log({ events });

  if (isLoading) return <ListEventsSkeleton />;

  return (
    <div className="grid gap-3 md:grid-cols-3">
      {events?.map((event) => (
        <Link key={event.id} href={paths.event.landing.root(event.id)}>
          <EventCard {...event} />
        </Link>
      ))}
    </div>
  );
};

"use client";

import { type Event } from "@prisma/client";
import { ChevronDownIcon, Loader2Icon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { paths } from "@/routes/paths";
import { api } from "@/trpc/react";

import { EventCard } from "./event-card";
import { ListEventsSkeleton } from "./list-events-skeleton";

export const ListEvents = () => {
  const { data, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage } =
    api.explore.list.useInfiniteQuery(
      {
        limit: 6,
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
    <div className="space-y-5">
      <div className="grid gap-3 md:grid-cols-3">
        {events?.map((event) => (
          <Link key={event.id} href={paths.event.landing.root(event.id)}>
            <EventCard {...event} />
          </Link>
        ))}
      </div>
      {hasNextPage && (
        <div className="mx-auto w-fit">
          <Button
            disabled={isFetchingNextPage}
            variant="ghost"
            className="w-full md:w-36"
            onClick={() => fetchNextPage()}
          >
            {!isFetchingNextPage && (
              <span className="flex items-center gap-1.5">
                Show more <ChevronDownIcon className="size-4" />
              </span>
            )}
            {isFetchingNextPage && (
              <Loader2Icon className="size-4 animate-spin" />
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

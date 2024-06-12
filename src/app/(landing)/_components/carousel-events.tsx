import * as React from "react";

import Marquee from "@/components/magicui/marquee";
import { api } from "@/trpc/react";

import EventCarouselCard from "./event-card-carousel";

export function CarouselEvents() {
  const { data: events, isLoading } = api.explore.featured.useQuery({
    limit: 10,
  });

  return (
    <div className="flex size-full">
      <div className="relative hidden flex-row items-center justify-center overflow-hidden rounded-lg bg-background md:flex md:h-[700px]  lg:h-[800px]">
        <Marquee pauseOnHover vertical className="[--duration:90s]">
          {isLoading &&
            Array(5)
              .fill(0)
              .map((_, index) => index + 1)
              .map((i) => <p key={i}>Loading...</p>)}
          {events?.map((event, idx) => (
            <EventCarouselCard {...event} key={idx} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover vertical className="[--duration:90s]">
          {isLoading &&
            Array(5)
              .fill(0)
              .map((_, index) => index + 1)
              .map((i) => <EventCarouselCard key={i} />)}
          {events?.map((event, idx) => (
            <EventCarouselCard {...event} key={idx} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white dark:from-background"></div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white dark:from-background"></div>
      </div>
      <div className="relative flex size-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background py-20 md:hidden md:shadow-xl">
        <Marquee pauseOnHover className="[--duration:90s]">
          {events?.map((event, idx) => (
            <EventCarouselCard {...event} key={idx} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
      </div>
    </div>
  );
}

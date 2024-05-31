import * as React from "react";
import { type Event } from "@prisma/client";
import Autoplay from "embla-carousel-autoplay";

import { EventCard } from "@/app/explore/_components/event-card";
import { Card, CardContent } from "@/components/ui/card";
// import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { api } from "@/trpc/react";

export function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({
      delay: 2000,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
      stopOnFocusIn: false,
      stopOnLastSnap: false,
    }),
  );
  const { data, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage } =
    api.explore.list.useInfiniteQuery(
      {
        limit: 6,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      },
    );

  const events = data?.pages
    .map((page) => page.events)
    .reduce((acc: Event[], events) => [...acc, ...events], []);

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-[1280px] rounded-lg bg-gradient-to-r from-gray-50/20 via-background/20 to-gray-50/20"
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent className="w-full">
        {isLoading &&
          Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="items-center justify-center  md:basis-1/2 lg:basis-1/4"
            >
              <div className="p-1">
                <Card className="">
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-4xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        {!isLoading &&
          events?.map((event, index) => (
            <CarouselItem
              key={index}
              className="items-center justify-center  md:basis-1/2 lg:basis-1/4"
            >
              <div className="p-1">
                <EventCard {...event} />
              </div>
            </CarouselItem>
          ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

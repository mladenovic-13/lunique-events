import * as React from "react";
import { type Event } from "@prisma/client";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { api } from "@/trpc/react";

import EventCardCarousel from "./event-card-carousel";

export function CarouselEvents() {
  const plugin = React.useRef(
    Autoplay({
      delay: 0,
      stopOnMouseEnter: true,
      stopOnFocusIn: false,
      stopOnInteraction: false,
    }),
  );

  const { data, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage } =
    api.explore.list.useInfiniteQuery(
      {
        limit: 12,
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
      className="flex size-full items-start justify-center rounded-lg md:w-[1280px]"
      opts={{
        align: "start",
        loop: true,
        duration: 15000,
      }}
    >
      <div className="hidden md:block">
        <div className="-top-10 left-0 z-10 -ml-10 flex h-[120%] w-[80px] items-center justify-end bg-gradient-to-r from-background via-background to-background/95 blur-lg md:absolute md:w-[150px]"></div>
      </div>
      <CarouselContent className="w-full">
        {isLoading &&
          Array.from({ length: 6 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="items-center justify-center px-1  md:basis-1/4"
            >
              <div className="py-1">
                <EventCardCarousel key={index} />
              </div>
            </CarouselItem>
          ))}
        {!isLoading &&
          events?.map((event, index) => (
            <CarouselItem
              key={index}
              className="basis-[70%] items-center justify-center px-1  md:basis-1/4"
            >
              <div className="py-1">
                <EventCardCarousel {...event} key={index} />
              </div>
            </CarouselItem>
          ))}
      </CarouselContent>
      <div className="hidden md:block">
        <div className="-top-10 right-0 z-10 -mr-10 flex h-[120%] w-[80px] items-center justify-end bg-gradient-to-l from-background via-background to-background/95 blur-lg md:absolute md:w-[150px]"></div>
      </div>

      {/* <CarouselPrevious /> */}
      {/* <CarouselNext className="hidden" /> */}
    </Carousel>
  );
}

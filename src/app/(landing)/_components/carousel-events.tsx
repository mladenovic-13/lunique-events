import * as React from "react";
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

  const { data: events, isLoading } = api.explore.featured.useQuery({
    limit: 10,
  });
  if (events) console.log(events[0]?.thumbnailUrl);
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
      <CarouselContent className="w-full">
        {isLoading &&
          Array.from({ length: 6 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="basis-[70%] items-center justify-center px-1  md:basis-1/4"
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
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </Carousel>
  );
}

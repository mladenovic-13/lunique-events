import * as React from "react";
import { type AlignmentOptionType } from "embla-carousel/components/Alignment";
import { type AxisDirectionOptionType } from "embla-carousel/components/Axis";
import { type OptionsType } from "embla-carousel/components/Options";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { testimonials as mock_testimonials } from "@/lib/mock-events";

import TestimonialCard from "./testimonial-card";

interface CarouselTestimonialsProps {
  direction: AxisDirectionOptionType;
  align: AlignmentOptionType;
}
const CarouselTestimonials = ({
  direction,
  align,
}: CarouselTestimonialsProps) => {
  const plugin = React.useRef(
    Autoplay({
      delay: 0,
      stopOnMouseEnter: true,
      stopOnFocusIn: false,
      stopOnInteraction: false,
    }),
  );
  const options: Partial<OptionsType> = {
    align: align,
    direction: direction,
  };
  return (
    <Carousel
      plugins={[plugin.current]}
      className="flex size-full w-full items-start justify-center rounded-lg"
      opts={{
        ...options,
        loop: true,
        duration: 15000,
      }}
    >
      <CarouselContent className="w-full">
        {mock_testimonials.map((testimonial, idx) => (
          <CarouselItem key={idx} className="basis-[70%] md:basis-1/4">
            <div className="py-1">
              <TestimonialCard {...testimonial} className="w-full" key={idx} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default CarouselTestimonials;

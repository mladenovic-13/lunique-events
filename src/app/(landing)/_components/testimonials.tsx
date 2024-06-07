import React from "react";

import { Badge } from "@/components/ui/badge";

import AvatarsGroup from "./avatars-group";
import CarouselTestimonials from "./carousel-testimonial";
interface TestimonialsProps {
  props?: string;
}

const Testimonials = ({}: TestimonialsProps) => {
  return (
    <section className="flex w-full flex-col items-center justify-center gap-6">
      <AvatarsGroup />
      <Badge
        variant={"secondary"}
        className="rounded-full border-[1.1px] border-accent-foreground/10"
      >
        Testimonials
      </Badge>
      <h1 className="text-center text-4xl font-semibold md:text-6xl">
        Thousands of users have already <br /> tried{" "}
        <strong className="bg-gradient-to-br from-primary to-rose-900 bg-clip-text font-semibold text-transparent">
          {" "}
          our application
        </strong>
      </h1>
      <CarouselTestimonials align={"center"} direction="ltr" />
      <CarouselTestimonials align={"start"} direction="ltr" />
    </section>
  );
};

export default Testimonials;

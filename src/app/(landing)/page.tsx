"use client";

import Link from "next/link";

import TextRevealByWord from "@/components/magicui/text-reveal";

import { CarouselEvents } from "./_components/carousel-events";
import { Heading } from "./_components/heading";
import OnboardingSteps from "./_components/onboarding-steps";
import { Testimonials } from "./_components/testimonials-marquee";

export default function Home() {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="flex w-full flex-col items-center justify-start gap-6  pt-10 md:gap-20 md:px-0 md:pt-12">
        <div className="flex w-full flex-col items-start justify-between md:flex-row">
          <div className="flex w-full flex-col items-center justify-start gap-8 md:gap-16">
            <Link
              className="w-fit animate-pulse rounded-lg bg-muted px-4 py-1 text-sm  drop-shadow-md transition-all md:text-base md:hover:bg-accent-foreground/20"
              href={"https://lunique.tech"}
              target="_blank"
            >
              <p>
                ✨ build by <strong>Lunique</strong>
              </p>
            </Link>
            <Heading />
          </div>
          <CarouselEvents />
        </div>
        <OnboardingSteps />
        <Testimonials />
        <TextRevealByWord text="Join our community and create the most amazing events ever!" />
      </div>
    </div>
  );
}

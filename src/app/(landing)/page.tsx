"use client";

import Link from "next/link";

import { CarouselEvents } from "./_components/carousel";
import { Heading } from "./_components/heading";

export default function Home() {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="flex w-full flex-col items-center justify-start pt-10  md:gap-4 md:px-0 md:pt-12 ">
        <Link
          className="w-fit animate-pulse rounded-lg bg-muted px-4 py-1 text-sm transition-all md:text-base md:hover:bg-accent-foreground/20"
          href={"https://lunique.tech"}
          target="_blank"
        >
          <p>
            ✨ build by <strong>Lunique</strong>
          </p>
        </Link>
        <Heading />
        <div className="flex w-full items-center justify-center pt-10 md:pt-10">
          <CarouselEvents />
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";

import { CarouselPlugin } from "./_components/carousel";
import { Heading } from "./_components/heading";

export default function Home() {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="gradient flex h-[400px] w-full flex-col items-center justify-start md:h-[800px] md:gap-4 md:pt-20">
        <Link
          className="w-fit animate-pulse rounded-lg bg-muted px-4 py-1 transition-all md:hover:bg-accent-foreground/20"
          href={"https://lunique.tech"}
          target="_blank"
        >
          <p>
            ✨ build by <strong>Lunique</strong>
          </p>
        </Link>
        <Heading />
        <CarouselPlugin />
      </div>
    </div>
  );
}

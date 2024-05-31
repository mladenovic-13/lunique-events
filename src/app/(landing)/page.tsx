"use client";

import { Button } from "@/components/ui/button";

import { Heading } from "./_components/heading";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="gradient flex h-[400px] w-full flex-col items-center justify-start md:h-[800px]">
        <Button className="w-fit animate-pulse" variant={"ghost"}>
          <p>
            ✨ build by <strong>Lunique</strong>
          </p>
        </Button>
        <Heading />
      </div>
    </div>
  );
}

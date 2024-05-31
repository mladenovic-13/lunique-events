import React from "react";

import { Button } from "@/components/ui/button";

export const Heading = () => {
  return (
    <div className="flex flex-col items-center px-4  text-center md:px-0">
      <h1 className="text-3xl font-semibold md:text-6xl md:leading-[70px]">
        Need to Impress? <br />
        Personalize Your Event Pages
      </h1>
      <div className="flex flex-col items-center justify-center  md:w-[400px]">
        <p className="font-medium md:pt-2">
          Tailor every detail to impress your guests and make each occasion
          unforgettable.
        </p>
        <div className="flex w-full flex-col-reverse md:flex-row  md:justify-between md:gap-4 md:px-3 md:pt-8">
          <Button
            variant={"outline"}
            className="w-full border-accent-foreground/70"
          >
            Check Pricing
          </Button>
          <Button variant={"default"} className="w-full">
            Create your first Event
          </Button>
        </div>
      </div>
    </div>
  );
};

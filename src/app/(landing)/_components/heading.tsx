import React from "react";
import { first } from "lodash";
import { useRouter } from "next/navigation";

import SparklesText from "@/components/magicui/sparkles-text";
import { Button } from "@/components/ui/button";
import { paths } from "@/routes/paths";

export const Heading = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center px-4  pt-6 text-center md:px-0 md:pt-0">
      <h1 className="text-5xl font-semibold md:text-6xl md:leading-[70px] ">
        Need to Impress? Personalize Your{" "}
        <SparklesText
          text="Event Pages"
          colors={{ first: "#E32C54", second: "#E32C54" }}
        />
      </h1>
      <div className="flex flex-col items-center justify-center md:w-[400px]  md:pt-6">
        <p className="pt-4 font-light md:pt-2 md:text-xl">
          Tailor every detail to impress your guests and make each occasion
          unforgettable.
        </p>
        <div className="flex w-full flex-col-reverse gap-4  pt-6 md:flex-row md:justify-between md:gap-4 md:px-3 md:pt-8">
          <Button
            variant={"outline"}
            className="w-full  border-accent-foreground/70  transition-all md:hover:bg-accent-foreground/10"
            onClick={() => router.push(paths.pricing)}
          >
            Check Pricing
          </Button>
          <Button
            variant={"default"}
            className="w-full "
            onClick={() => router.push(paths.signin.root)}
          >
            Create Your Event
          </Button>
        </div>
      </div>
    </div>
  );
};

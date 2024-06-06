import React from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

interface StepCardProps {
  step: number;
  title: string;
  description: string;
  image?: string;
  className?: string;
}
const StepCard = ({
  step,
  title,
  description,
  image,
  className,
}: StepCardProps) => {
  return (
    <div
      className={cn(
        "flex size-full flex-row items-start justify-center rounded-2xl bg-muted p-8 py-8 md:py-12 ",
        className && className,
        className &&
          className.includes("flex-col") &&
          !className.includes("flex-row") &&
          "gap-12",
      )}
    >
      <div
        className={cn(
          "flex w-full flex-col gap-6 md:w-1/2 md:gap-2 ",
          className &&
            className.includes("flex-col") &&
            !className.includes("flex-row") &&
            "w-full md:w-full",
        )}
      >
        <div className="flex w-fit items-center justify-center rounded-full border-[1.1px] border-primary px-4 py-1 text-primary">
          <p>Step {step}</p>
        </div>
        <h1 className="text-2xl font-semibold md:pt-6 md:text-4xl">{title}</h1>
        <p className="text-accent-foreground/60">{description}</p>
      </div>
      {/* mobile view */}
      {image && (
        <div
          className={cn(
            "flex w-1/2 items-center justify-center md:hidden",
            className &&
              className.includes("flex-col") &&
              !className.includes(" flex-row ") &&
              "w-full",
          )}
        >
          <Image
            src={image}
            alt={image}
            width={800}
            height={800}
            className={cn(
              "w-full rounded-lg object-cover drop-shadow-lg transition-all",
            )}
          />
        </div>
      )}
      {/* desktop view */}
      {image && (
        <div
          className={cn(
            "hidden w-1/2 items-center justify-center md:flex",
            className &&
              className.includes("flex-col") &&
              !className.includes("flex-row") &&
              "w-full",
          )}
        >
          <Image
            src={image}
            alt={image}
            width={800}
            height={800}
            className={cn(
              "w-full rounded-lg object-cover drop-shadow-lg transition-all",
            )}
          />
        </div>
      )}
    </div>
  );
};

export default StepCard;

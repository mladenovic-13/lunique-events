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
        "flex size-full flex-row items-center justify-center  gap-4 rounded-2xl bg-muted p-8 py-12",
        className && className,
      )}
    >
      <div
        className={cn(
          "flex w-full flex-col gap-2 md:w-1/2 ",
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
      {image && (
        <div
          className={cn(
            "flex w-1/2 items-center justify-center",
            className &&
              className.includes("flex-col") &&
              !className.includes("flex-row") &&
              "w-full",
          )}
        >
          <Image
            src={image}
            alt={image}
            width={420}
            height={420}
            className={cn(
              "w-1/2 rounded-lg object-cover drop-shadow-lg transition-all md:hover:-skew-y-2",
              className &&
                className.includes("flex-col") &&
                !className.includes("flex-row") &&
                "w-full",
            )}
          />
        </div>
      )}
    </div>
  );
};

export default StepCard;

"use client";

import React from "react";
import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

interface TitleProps {
  title: string;
  description?: string;
  button?: string;
  onAction: () => void;
}

const Section = ({ title, description, button, onAction }: TitleProps) => {
  return (
    <div className="flex justify-between">
      <div className="flex flex-col space-y-0.5 md:space-y-1.5">
        <h1 className="text-lg font-semibold text-current md:text-xl">
          {title}
        </h1>
        {description && (
          <p className="text-sm font-normal text-accent-foreground/60 md:text-base">
            {description}
          </p>
        )}
      </div>
      {button && (
        <Button
          className="flex h-7 space-x-2 py-1.5 pl-3 pr-4 md:h-fit"
          variant={"secondary"}
          onClick={onAction}
        >
          <PlusIcon className="size-3.5 md:size-4" />
          <p className="capitalize">{button}</p>
        </Button>
      )}
    </div>
  );
};

export default Section;

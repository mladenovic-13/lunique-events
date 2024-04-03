import React from "react";
import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

interface TitleProps {
  title: string;
  description?: string;
  button?: string;
}

const Section = ({ title, description, button }: TitleProps) => {
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
          className="flex h-fit space-x-2 py-1.5 pl-3 pr-4"
          variant={"secondary"}
        >
          <PlusIcon size={18} />
          <p className="capitalize">{button}</p>
        </Button>
      )}
    </div>
  );
};

export default Section;

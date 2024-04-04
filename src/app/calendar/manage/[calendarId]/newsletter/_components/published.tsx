import React from "react";
import { MailboxIcon } from "lucide-react";

import Section from "@/components/header/section";

const publishedItems = [];

export const Published = () => {
  return (
    <section className="flex flex-col space-x-2 space-y-20">
      <Section title="Published" />
      {publishedItems.length === 0 && (
        <div className="flex flex-col items-center justify-center space-y-10">
          <MailboxIcon className="size-28" opacity={0.1} />
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-xl font-semibold text-accent-foreground/80 md:text-2xl">
              No Newsletters
            </h1>
            <p className="text-sm font-normal capitalize text-accent-foreground/60 md:text-base">
              Tell your subscribers about events and what is happening.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

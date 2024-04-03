import React from "react";
import { MessagesSquareIcon } from "lucide-react";

import Section from "@/components/header/section";

const feedbacks = [];

export const EventFeedback = () => {
  return (
    <section className="space-y-14 md:space-y-8">
      <Section title="Event Feedback" button="Download" />
      {feedbacks.length === 0 && (
        <div className="flex flex-col items-center justify-center space-y-10">
          <MessagesSquareIcon className="size-36 md:size-48" opacity={0.1} />
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-xl font-semibold text-accent-foreground/80 md:text-2xl">
              No Feedback
            </h1>
            <p className="text-sm font-normal capitalize text-accent-foreground/60 md:text-base">
              No feedback has been collected for your events.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

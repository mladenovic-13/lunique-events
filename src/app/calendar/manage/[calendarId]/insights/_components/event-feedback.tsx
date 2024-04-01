import React from "react";
import { MessagesSquareIcon } from "lucide-react";

import Section from "@/components/header/section";

const feedbacks = [];

export const EventFeedback = () => {
  return (
    <section className="space-y-8">
      <Section title="Event Feedback" button="Download" />
      {feedbacks.length === 0 && (
        <div className="flex flex-col items-center justify-center space-y-10">
          <MessagesSquareIcon size={200} opacity={0.1} />
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold text-accent-foreground/80">
              No Feedback
            </h1>
            <p className="text-base font-normal capitalize text-accent-foreground/60">
              No feedback has been collected for your events.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

import React from "react";
import { format, isToday, isTomorrow, isYesterday } from "date-fns";
import { CircleIcon } from "lucide-react";

import { upcomingAndPastEvents } from "@/lib/mock-events";

export type Mode = "compact" | "regular" | "list";

interface TimelineProps {
  date: Date;
  mode?: Mode;
  children?: React.ReactNode;
  idx: number;
  dataLength: number;
}
const demo = upcomingAndPastEvents.past[2];

export const Timeline = ({
  date,
  mode,
  children,
  idx,
  dataLength,
}: TimelineProps) => {
  return (
    <div>
      {mode === "compact" && (
        <div className="flex h-full items-center gap-2">
          <div className="flex h-[105%] flex-col items-center md:px-2  ">
            <CircleIcon className="size-4 text-border" />

            <div className="relative h-[95%] w-px border-l-2 border-dashed border-border/80 ">
              {idx === dataLength - 1 && (
                <div className="absolute -right-2.5 top-0 h-full w-5 bg-gradient-to-b from-background/0 via-background/10 to-background"></div>
              )}
            </div>
          </div>
          <div className="flex w-full  flex-col gap-4 md:h-[250px] md:gap-0 md:space-y-2">
            <div className="-mt-3 flex items-center gap-3 px-3">
              {demo && <DisplayDate date={date} />}
            </div>
            <div>{children}</div>
          </div>
        </div>
      )}
      {mode == "regular" && (
        <div className="flex h-full gap-2">
          <div className="flex gap-4">
            <div className="text-right">
              <div className="w-20">
                <DisplayDate date={date} />
              </div>
            </div>
            <div className="flex flex-col items-center">
              <CircleIcon className="size-4 text-border" />
              <div className="relative h-[95%] w-px border-l-2 border-dashed border-border/80 ">
                {idx === dataLength - 1 && (
                  <div className="absolute -right-2.5 top-0 h-full w-5 bg-gradient-to-b from-background/0 via-background/10 to-background"></div>
                )}
              </div>
            </div>
          </div>
          <div className="flex-1">{children}</div>
        </div>
      )}
    </div>
  );
};

const DisplayDate = ({ date }: { date: Date }) => (
  <>
    {isYesterday(date) && <p className="text-lg">Yesterday</p>}
    {isToday(date) && <p className="text-lg">Today</p>}
    {isTomorrow(date) && <p className="text-lg">Tomorrow</p>}
    {!isYesterday(date) && !isToday(date) && !isTomorrow(date) && (
      <p className="md:text-lg">{format(date, "LLL d")}</p>
    )}
    <p className="text-sm text-muted-foreground md:text-base">
      {format(date, "EEEE")}
    </p>
    <p className="text-sm text-muted-foreground md:hidden">15:00 PM</p>
  </>
);

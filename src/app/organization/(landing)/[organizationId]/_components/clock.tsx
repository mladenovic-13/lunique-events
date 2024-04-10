import React from "react";
import { ClockIcon } from "lucide-react";

export const Clock = () => {
  return (
    <div className="flex h-7 flex-1 items-center justify-between rounded-lg border-[1.1px] border-accent-foreground/20 p-1 px-2.5 text-sm">
      <div className="flex items-center space-x-1.5">
        <ClockIcon size={14} />
        <p>GMT+2</p>
      </div>
      <div className="w-14">
        <p className="text-accent-foreground/50">2:19 PM</p>
      </div>
    </div>
  );
};

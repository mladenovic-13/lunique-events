import React from "react";
import { ClockIcon } from "lucide-react";

export const Clock = () => {
  return (
    <div className="flex items-center justify-center space-x-1.5 rounded-lg border-[1.1px] border-accent-foreground/20 p-1 text-sm">
      <ClockIcon size={14} />
      <p>GMT+2</p>
      <div className="w-14">
        <p className="text-accent-foreground/50">2:19 PM</p>
      </div>
    </div>
  );
};

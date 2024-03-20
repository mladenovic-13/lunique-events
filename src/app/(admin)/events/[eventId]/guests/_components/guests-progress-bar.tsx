"use client";

import { CircleIcon } from "lucide-react";

export const GuestsProgressBar = () => {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex justify-start space-x-2 text-green-500">
        <div>
          <p className="text-2xl">1</p>
        </div>
        <div className="flex flex-col-reverse">
          <p>guest</p>
        </div>
      </div>

      <div className="flex justify-center space-x-0.5">
        <div className="flex h-2 w-full rounded-l-sm bg-green-500"></div>
        <div className="flex h-2 w-full rounded-r-sm bg-muted-foreground"></div>
      </div>

      <div className="flex space-x-3">
        <div className="flex items-center space-x-2 text-green-500">
          <CircleIcon className=" size-1.5 rounded-full bg-green-500 text-green-500" />
          <p>1 Going</p>
        </div>
        <div className="flex items-center space-x-2 text-muted-foreground">
          <CircleIcon className="size-1.5 rounded-full bg-muted-foreground/80 text-muted-foreground/80" />
          <p>1 Not Going</p>
        </div>
      </div>
    </div>
  );
};

"use client";

import { DownloadIcon, Share2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";

export const GuestListActions = () => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Guest List</h1>
        <div className="flex space-x-2 ">
          <Button className="flex size-7 h-7 place-content-center items-center rounded   bg-secondary p-0 text-primary">
            <DownloadIcon className="size-4 text-primary/60" />
          </Button>
          <Button className="flex size-7 h-7  place-content-center   items-center rounded bg-secondary p-0 text-primary">
            <Share2Icon className="size-4 text-primary/60" />
          </Button>
        </div>
      </div>
    </div>
  );
};

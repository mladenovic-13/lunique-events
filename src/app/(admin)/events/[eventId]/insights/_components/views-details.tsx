import React from "react";

import { Separator } from "@/components/ui/separator";

export const ViewsDetails = () => {
  return (
    <div className="flex w-full space-x-4 px-0">
      <div className="space-y-3">
        <h1 className="text-lg font-semibold capitalize">Page Views</h1>
        <div className="flex w-4/5 justify-between">
          <div className="flex flex-col">
            <p className="text-sm text-primary/50">Yesterday</p>
            <p className="text-2xl font-semibold">0</p>
          </div>
          <div className="flex flex-col">
            <p className="text-sm text-primary/50">Past Month</p>
            <p className="text-2xl font-semibold">11</p>
          </div>
        </div>
        <h1 className="text-lg font-semibold capitalize">Live Traffice</h1>
        <h2 className="text-base font-normal capitalize">
          No page views in the last hour.
        </h2>
        <p className="text-sm text-primary/50">
          Share your link and put it in your social bio to capture more traffic.
        </p>
      </div>
      <div>
        <Separator orientation="vertical" className="h-full" />
      </div>
      <div className="space-y-3">
        <h1 className="text-lg font-semibold capitalize">Page Views</h1>
        <div className="flex w-4/5 justify-between">
          <div className="flex flex-col">
            <p className="text-sm text-primary/50">Yesterday</p>
            <p className="text-2xl font-semibold">0</p>
          </div>
          <div className="flex flex-col">
            <p className="text-sm text-primary/50">Past Month</p>
            <p className="text-2xl font-semibold">11</p>
          </div>
        </div>
        <h1 className="text-lg font-semibold capitalize">Live Traffice</h1>
        <h2 className="text-base font-normal capitalize">
          No page views in the last hour.
        </h2>
        <p className="text-sm text-primary/50">
          Share your link and put it in your social bio to capture more traffic.
        </p>
      </div>
    </div>
  );
};

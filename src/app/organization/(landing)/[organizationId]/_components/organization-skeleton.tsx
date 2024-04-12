import React from "react";

import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export const OrganizationSkeleton = () => {
  return (
    <section>
      <Skeleton className="bg-background ">
        <div className="h-36 rounded-none bg-secondary md:hidden" />
        <div className="mx-auto min-h-96 max-w-4xl space-y-5 p-3 md:space-y-8 md:px-0">
          <div className=" hidden h-56  rounded-xl bg-secondary md:block" />

          <div className=" space-y-6 px-5">
            <div className="-mt-12 size-24  rounded-lg border-4 border-background bg-secondary md:size-20" />
            <div className="space-y-2">
              <div className="h-4 w-60 rounded-lg bg-secondary" />
              <div className="h-4 w-24 rounded-lg bg-secondary" />
            </div>
          </div>
        </div>
        <div>
          <Separator className="hidden w-full md:block" />
        </div>
        <div className="mx-auto min-h-96 max-w-4xl space-y-5 p-3 md:space-y-8 md:px-0">
          <div className="-mt-56 flex max-w-4xl space-x-4 pt-6 md:mt-0">
            <div className="flex-1">
              <OrganizationEventsSkeleton />
            </div>
            <div className="hidden md:block">
              <div className="flex flex-col gap-3">
                <div className="h-6 w-72 rounded-md bg-secondary" />
                <div className="flex size-72 justify-center rounded-lg bg-secondary ">
                  <Calendar />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Skeleton>
    </section>
  );
};

const OrganizationEventsSkeleton = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between">
        <div className="h-4 w-28 rounded-lg bg-secondary"></div>
        <div className="flex space-x-2">
          <div className="h-4 w-16 rounded-lg bg-secondary"></div>
          <div className="h-4 w-12 rounded-lg bg-secondary"></div>
        </div>
      </div>
      {Array(3)
        .fill(0)
        .map((_, index) => index + 1)
        .map((idx) => (
          <div className="space-y-2 pl-6" key={idx}>
            <div className="h-5 w-16 rounded-lg bg-accent-foreground/10"></div>
            <Card className="rounded-xl bg-secondary p-4">
              <div className="flex flex-col gap-6">
                <div className="flex justify-between">
                  <div className="flex flex-col gap-2 pt-5">
                    <div className="h-4 w-40 rounded-lg bg-accent-foreground/10" />
                    <div className="h-3 w-32 rounded-lg bg-accent-foreground/10" />
                    <div className="h-3 w-16 rounded-lg bg-accent-foreground/10" />
                    <div className="h-3 w-16 rounded-lg bg-accent-foreground/10" />
                  </div>
                  <div>
                    <div className="size-24 rounded-lg bg-accent-foreground/10 md:size-32"></div>
                  </div>
                </div>
                <div className="h-7 w-20 rounded-lg bg-accent-foreground/10"></div>
              </div>
            </Card>
          </div>
        ))}
    </div>
  );
};

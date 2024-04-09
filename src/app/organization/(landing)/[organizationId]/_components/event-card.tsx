import React from "react";
import { ArrowRightIcon, MapPinIcon, UsersIcon } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import eventImg from "@/public/images/you-are-invited.jpeg";

export const EventCard = () => {
  return (
    <Card className="flex min-w-[325px] max-w-[610px]">
      <div className="flex w-full flex-col space-y-3 p-4">
        <div className="flex justify-between">
          <div className="flex flex-col space-y-2 text-sm md:text-base">
            <p className="text-accent-foreground/50">10:30 AM</p>
            <h1 className="text-lg font-semibold md:text-xl">
              First Fresh Event
            </h1>
            <div>
              <div className="flex items-center space-x-2 text-accent-foreground/50">
                <MapPinIcon size={15} />
                <p>Belgrade</p>
              </div>
              <div className="flex items-center space-x-2 text-accent-foreground/50">
                <UsersIcon size={15} />
                <p>No guests</p>
              </div>
            </div>
          </div>
          <div>
            <Image
              alt=""
              src={eventImg}
              width={120}
              height={120}
              className="size-24 rounded-lg md:size-32"
            />
          </div>
        </div>
        <div>
          <Button
            variant={"secondary"}
            className="h-8 space-x-2 text-accent-foreground/70"
          >
            <p>Manage Event</p>
            <ArrowRightIcon size={15} />
          </Button>
        </div>
      </div>
    </Card>
  );
};

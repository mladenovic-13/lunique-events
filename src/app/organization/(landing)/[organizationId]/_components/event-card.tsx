import React from "react";
import { type Event, type Location } from "@prisma/client";
import {
  AlertTriangleIcon,
  ArrowRightIcon,
  MapPinIcon,
  UsersIcon,
} from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import eventImg from "@/public/images/you-are-invited.jpeg";

interface EventCardProps {
  event?: Event | null;
  location?: Location | null;
  guests?: number | null;
}

export const EventCard = ({ event, location, guests }: EventCardProps) => {
  return (
    <Card className="flex min-w-[325px] max-w-[610px] transition-all hover:cursor-pointer hover:p-2 hover:ring-1 hover:ring-accent-foreground/20">
      <div className="flex w-full flex-col space-y-3 p-4">
        {event && (
          <div className="flex justify-between">
            <div className="flex flex-col space-y-2 text-sm md:text-base">
              <p className="text-accent-foreground/50">{event.startTime}</p>
              <h1 className="text-lg font-semibold md:text-xl">{event.name}</h1>
              <div>
                {location && (
                  <div className="flex items-center space-x-2 text-accent-foreground/50">
                    <MapPinIcon size={15} />
                    <p>{location.mainText}</p>
                    <p>{location.secondaryText}</p>
                  </div>
                )}
                {!location && (
                  <div className="flex items-center space-x-2 text-yellow-300">
                    <AlertTriangleIcon size={15} />
                    <p className="">Location missing</p>
                  </div>
                )}
                {guests && (
                  <div className="flex items-center space-x-2 text-accent-foreground/50">
                    <UsersIcon size={15} />
                    <p>{guests} guests</p>
                  </div>
                )}
              </div>
            </div>
            <div>
              <Image
                alt=""
                src={event.thumbnailUrl ? event.thumbnailUrl : eventImg}
                width={120}
                height={120}
                className="size-24 rounded-lg object-cover md:size-32"
              />
            </div>
          </div>
        )}
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

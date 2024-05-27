import React from "react";
import { type Event } from "@prisma/client";
import { format } from "date-fns";
import {
  AlertTriangleIcon,
  ArrowRightIcon,
  MapPinIcon,
  UsersIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import eventImg from "@/public/images/you-are-invited.jpeg";
import { paths } from "@/routes/paths";

interface LocationInterface {
  description: string;
}
interface EventCardProps {
  event: Event;
  location?: LocationInterface | null;
  guests?: number | null;
  onClick: () => void;
}

export const EventCard = ({
  event,
  location,
  guests,
  onClick,
}: EventCardProps) => {
  const { theme } = useTheme();
  return (
    <Card
      onClick={onClick}
      className="flex min-w-[325px] max-w-[610px] transition-all hover:cursor-pointer hover:pl-2 hover:ring-1 hover:ring-accent-foreground/20"
    >
      <div className="flex w-full flex-col space-y-3 p-4">
        {event && (
          <div className="flex justify-between">
            <div className="flex flex-col space-y-2 text-sm md:text-base">
              {/* TODO: fix */}
              {/* <p className="hidden text-accent-foreground/50 md:flex">
                {event.startTime}
              </p> */}
              <p className="hidden text-sm md:block">
                {format(event.date, "HH:mm")}
              </p>
              <h1 className="text-lg font-semibold md:text-xl">{event.name}</h1>
              <div className="capitalize">
                {location && (
                  <div className="flex items-center space-x-2 text-accent-foreground/50">
                    <MapPinIcon size={15} />
                    <p className="line-clamp-1 transition-all hover:line-clamp-none">
                      {location.description}
                    </p>
                  </div>
                )}
                {!location && (
                  <div
                    className={cn(
                      "flex items-center space-x-2",
                      theme === "light" && "text-amber-600/90",
                      theme === "dark" && "text-yellow-400",
                    )}
                  >
                    <AlertTriangleIcon size={15} />
                    <p className="drop-shadow-sm">Location missing</p>
                  </div>
                )}
                {guests !== null && guests !== undefined && (
                  <div className="flex items-center space-x-2 text-accent-foreground/50">
                    <UsersIcon size={15} />
                    <p>
                      {guests === 0
                        ? "No Guests"
                        : guests === 1
                          ? `${guests} Guest`
                          : `${guests} Guests`}
                    </p>
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
          <Link
            href={paths.event.manage.overview(event.id)}
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant={"secondary"}
              className="h-8 space-x-2 text-accent-foreground/70"
            >
              <p>Manage Event</p>
              <ArrowRightIcon size={15} />
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

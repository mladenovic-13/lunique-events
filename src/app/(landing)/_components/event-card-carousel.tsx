"use client";

import React, { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { random } from "lodash";
import { LoaderCircleIcon, UsersIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { awsImageLoader } from "@/lib/image-loader";
import { isAwsImage } from "@/lib/is-aws-image";
import { cn } from "@/lib/utils";
import { paths } from "@/routes/paths";

interface EventCardCarouselProps {
  date?: Date;
  id?: string;
  name?: string;
  description?: string;
  thumbnailUrl?: string;
}
const EventCarouselCard = ({
  date,
  id: eventId,
  name,
  description,
  thumbnailUrl,
}: EventCardCarouselProps) => {
  const router = useRouter();
  const randomGuestCount = useMemo(
    () => ((random(true) * 100) % 70).toFixed(),
    [],
  );
  const [isServer, setIsServer] = useState(true);
  useEffect(() => {
    setIsServer(false);
  }, [setIsServer]);

  return (
    <div
      onClick={() => eventId && router.push(paths.event.landing.root(eventId))}
      className={cn(
        "group flex w-[300px] flex-col overflow-hidden rounded-lg border-[1.1px]  border-accent-foreground/20 bg-muted pb-6 transition-all group-hover:cursor-pointer group-hover:bg-background dark:bg-background group-hover:dark:bg-muted",
      )}
    >
      <div>
        {thumbnailUrl && (
          <Image
            loader={isAwsImage(thumbnailUrl) ? awsImageLoader : undefined}
            src={thumbnailUrl}
            alt={`${name} thumbnail`}
            width={300}
            height={300}
            className={cn(
              "h-[250px] w-full object-cover  brightness-100 transition-all group-hover:brightness-50 ",
            )}
          />
        )}
        {!thumbnailUrl && (
          <div
            className={cn(
              "relative flex h-[220px] w-full items-center justify-center text-primary",
            )}
          >
            <LoaderCircleIcon className="size-20 animate-spin delay-75 " />
          </div>
        )}
      </div>
      <div
        className={cn(
          "flex  h-[180px] flex-col  gap-4 px-8 pt-6",
          !date && "animate-pulse",
        )}
      >
        <div className="flex items-center justify-between text-accent-foreground/90">
          <h1 className="line-clamp-1 text-lg font-semibold">
            {name ? name : "Loading..."}
          </h1>
        </div>
        <div className="size-full text-left text-sm font-normal text-accent-foreground/40">
          <p className="line-clamp-5">
            {description ? description : "Loading..."}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between px-8">
        <p className="text-xs">
          {format(date ? date : new Date(), "dd MMMM, yyyy")}
        </p>
        <div className="flex items-center justify-center gap-2">
          <UsersIcon className="size-4" />
          <p className="text-xs">{!isServer && randomGuestCount}</p>
        </div>
      </div>
    </div>
  );
};

export default EventCarouselCard;

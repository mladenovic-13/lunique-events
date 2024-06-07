import React, { useState } from "react";
import { format } from "date-fns";
import { LoaderCircleIcon, UsersIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
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
const EventCardCarousel = ({
  date,
  id: eventId,
  name,
  description,
  thumbnailUrl,
}: EventCardCarouselProps) => {
  const router = useRouter();
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={cn(
        "flex w-full flex-col overflow-hidden rounded-lg border-[1.1px] border-accent-foreground/20 bg-muted pb-6 transition-all hover:cursor-pointer dark:bg-background",
        hover && "bg-background dark:bg-muted",
      )}
    >
      <div>
        {thumbnailUrl && (
          <div className="relative">
            <Image
              loader={isAwsImage(thumbnailUrl) ? awsImageLoader : undefined}
              src={thumbnailUrl}
              alt={`${name} thumbnail`}
              width={480}
              height={480}
              className={cn(
                "h-[220px] w-full object-cover brightness-100 transition-all ",
                hover && "brightness-50 ",
              )}
            />
            <Button
              onClick={() =>
                eventId && router.push(paths.event.landing.root(eventId))
              }
              className={cn(
                "duration-2000 absolute inset-0 m-auto hidden w-fit scale-100 transition-all  hover:bg-primary",
                hover && "md:flex md:hover:scale-110",
              )}
            >
              See Details
            </Button>
          </div>
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
          <div className="flex items-center justify-center gap-2">
            <UsersIcon className="size-4" />
            <p className="text-xs">40</p>
          </div>
        </div>
        <div className="size-full text-left text-sm font-normal text-accent-foreground/40">
          <p className="line-clamp-5">
            {description ? description : "Loading..."}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between px-8">
        <p className="text-xs">{format(date ? date : new Date(), "dd MMMM")}</p>
        <p
          className={cn(
            "-rotate-8 bg-gradient-to-tl from-primary to-rose-700 bg-clip-text text-xl font-bold text-transparent transition-all",
            hover && "rotate-0",
          )}
        >
          {format(date ? date : new Date(), "yyyy")}
        </p>
      </div>
    </div>
  );
};

export default EventCardCarousel;

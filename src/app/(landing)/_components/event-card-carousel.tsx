import React from "react";
import { format } from "date-fns";
import { UsersIcon } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { awsImageLoader } from "@/lib/image-loader";
import { isAwsImage } from "@/lib/is-aws-image";

interface EventCardCarouselProps {
  date: Date;
  name: string;
  description: string;
  thumbnailUrl: string;
}
const EventCardCarousel = ({
  date,
  name,
  description,
  thumbnailUrl,
}: EventCardCarouselProps) => {
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-lg border-[1.1px] border-accent-foreground/20 bg-muted pb-6">
      <Image
        loader={isAwsImage(thumbnailUrl) ? awsImageLoader : undefined}
        src={thumbnailUrl}
        alt={`${name} thumbnail`}
        width={240}
        height={240}
        className="h-[220px] w-full  object-cover"
      />
      <div className="flex  h-[140px] flex-col gap-4 px-8 pt-6">
        <div className="flex items-center justify-between text-accent-foreground/90">
          <h1 className="line-clamp-1 text-lg font-semibold">{name}</h1>
          <div className="flex items-center justify-center gap-2">
            <UsersIcon className="size-4" />
            <p className="text-xs">40</p>
          </div>
        </div>
        <div className="w-full overflow-hidden text-left text-sm font-normal text-accent-foreground/40">
          <p>{description}</p>
        </div>
      </div>
      <div className="flex items-center justify-between px-8">
        <div className="text-xs">
          <p className="">{format(date, "dd MMMM")}</p>
          <p className="text-accent-foreground/50">{format(date, "yyyy")}</p>
        </div>
        <Button className="rounded-lg">See Details</Button>
      </div>
    </div>
  );
};

export default EventCardCarousel;

import Image from "next/image";

import { awsImageLoader } from "@/lib/image-loader";
import { isAwsImage } from "@/lib/is-aws-image";
import { formatDate } from "@/lib/utils";

interface EventCardProps {
  date: Date;
  name: string;
  description: string;
  thumbnailUrl: string;
}

export const EventCard = ({
  date,
  description,
  name,
  thumbnailUrl,
}: EventCardProps) => {
  return (
    <div className="min-h-48 space-y-2 rounded-md border border-border/50 bg-card p-3 transition duration-200 hover:cursor-pointer hover:border-border hover:shadow-lg hover:dark:bg-muted/60 md:h-56">
      <div className="flex items-start justify-between">
        <Image
          loader={isAwsImage(thumbnailUrl) ? awsImageLoader : undefined}
          src={thumbnailUrl}
          alt={`${name} thumbnail`}
          width={64}
          height={64}
          className="size-16 rounded-md object-cover"
        />
        <div className="text-sm text-muted-foreground">
          {formatDate(date.toString())}
        </div>
      </div>
      <div className="space-y-1">
        <p className="line-clamp-2 text-lg font-semibold">{name}</p>
        <p className="line-clamp-3 text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

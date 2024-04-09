"use client";

import Image from "next/image";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { awsImageLoader } from "@/lib/image-loader";
import placeholderImage from "@/public/images/you-are-invited.jpeg";

export const EventThumbnail = ({ src }: { src: string | null }) => {
  return (
    <AspectRatio ratio={1 / 1} className="rounded-md">
      <Image
        width={340}
        height={340}
        loader={awsImageLoader}
        src={src ?? placeholderImage}
        alt="event placeholder image"
        className="size-full rounded-md"
      />
    </AspectRatio>
  );
};

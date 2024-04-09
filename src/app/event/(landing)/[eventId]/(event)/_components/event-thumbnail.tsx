"use client";

import Image from "next/image";

import { awsImageLoader } from "@/lib/image-loader";
import placeholderImage from "@/public/images/you-are-invited.jpeg";

export const EventThumbnail = ({ src }: { src: string | null }) => {
  return (
    <Image
      width={320}
      height={320}
      loader={awsImageLoader}
      src={src ?? placeholderImage}
      alt="event placeholder image"
      className="aspect-square size-80 rounded-md"
    />
  );
};

import React from "react";
import Image from "next/image";

import coverImg from "@/public/images/placeholder.jpg";

interface CoverImageProps {
  src?: string | null;
}

export const CoverImage = ({ src }: CoverImageProps) => {
  return (
    <div className="flex h-36  cursor-pointer justify-center  md:h-60">
      <Image
        src={src ? src : coverImg}
        width={900}
        height={200}
        className="h-36 object-cover md:h-60 md:rounded-2xl"
        alt=""
      />
    </div>
  );
};

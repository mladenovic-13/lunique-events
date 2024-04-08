import React from "react";
import Image from "next/image";

import coverImg from "@/public/images/you-are-invited.jpeg";

export const CoverImage = () => {
  return (
    <div className="flex h-36  cursor-pointer justify-center  md:h-52">
      <Image
        src={coverImg}
        width={900}
        height={200}
        className="h-36 object-cover md:h-52 md:rounded-2xl"
        alt=""
      />
    </div>
  );
};

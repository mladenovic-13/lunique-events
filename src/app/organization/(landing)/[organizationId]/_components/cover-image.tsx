import React from "react";
import Image from "next/image";

import coverImg from "@/public/images/you-are-invited.jpeg";

export const CoverImage = () => {
  return (
    <div className="h-36 cursor-pointer rounded-t-xl md:h-52">
      <Image
        alt=""
        src={coverImg}
        width={390}
        height={112}
        className="h-36 w-full object-cover md:h-52"
      />
    </div>
  );
};

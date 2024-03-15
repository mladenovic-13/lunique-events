"use client";

import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { ImagePlusIcon } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import thumbImage from "@/public/images/placeholder.jpg";

// TODO: upload event image
export const ImageUpload = () => {
  const { onOpen } = useModal();

  return (
    <div className="relative">
      <AspectRatio ratio={1 / 1}>
        <Image
          src={thumbImage}
          fill
          alt=""
          className="w-full rounded-xl object-cover"
        />
      </AspectRatio>
      <Button
        variant="secondary"
        onClick={() => onOpen("choose-event-thumbnail")}
        className="absolute bottom-3 right-3 size-10 rounded-full p-0"
      >
        <ImagePlusIcon className="h-5" />
      </Button>
    </div>
  );
};

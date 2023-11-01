"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useModal } from "@/hooks/use-modal-store";
import { type ImageProps } from "@/types";
import Image from "next/image";

interface RenderGalleryImagesProps {
  images: ImageProps[];
}

export const RenderGalleryImages = ({ images }: RenderGalleryImagesProps) => {
  const { onOpen } = useModal();

  return (
    <>
      {images.map((image) => (
        <AspectRatio
          key={image.id}
          ratio={4 / 3}
          className="transition md:cursor-pointer md:duration-300 md:hover:brightness-110"
          onClick={() =>
            onOpen("event-gallery", {
              gallery: { images: images, currenImage: image.id },
            })
          }
        >
          <Image
            src={image.src}
            alt={`Gallery Image ${image.id}`}
            width={460}
            height={345}
            className="h-full w-full rounded-lg object-cover"
          />
        </AspectRatio>
      ))}
    </>
  );
};

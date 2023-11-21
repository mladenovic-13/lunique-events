"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useModal } from "@/hooks/use-modal-store";
import { api } from "@/trpc/react";
import { type ImageAttributes } from "@/types";
import Image from "next/image";
import { useMemo } from "react";

interface RenderGalleryImagesProps {
  eventId: string;
}

export const RenderGalleryImages = ({ eventId }: RenderGalleryImagesProps) => {
  const { onOpen } = useModal();

  const { data: event } = api.event.get.useQuery({ id: eventId });

  const { data: urls } = api.s3.getEventImages.useQuery(
    { eventId: event?.id, userId: event?.ownerId },
    { enabled: !!event?.id && !!event.ownerId },
  );

  const images = useMemo<ImageAttributes[]>(() => {
    if (!urls) return [];
    return urls.map((url, idx) => ({ id: idx, src: url }));
  }, [urls]);

  return (
    <>
      {images.map((image, idx) => (
        <div
          id={`gallery-image-${idx}`}
          key={image.id}
          onClick={() =>
            onOpen("event-gallery", {
              galleryImages: images,
              currentImage: idx,
            })
          }
        >
          <AspectRatio
            ratio={4 / 3}
            className="transition md:cursor-pointer md:duration-300 md:hover:brightness-110"
          >
            <Image
              src={image.src}
              alt={`Gallery Image ${image.id}`}
              width={460}
              height={345}
              className="h-full w-full rounded-lg object-cover"
            />
          </AspectRatio>
        </div>
      ))}
    </>
  );
};

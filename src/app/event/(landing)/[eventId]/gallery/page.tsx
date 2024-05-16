import { notFound } from "next/navigation";

import { api } from "@/trpc/server";

import { GallerySidebar } from "./_components/gallery-sidebar";
import { RenderGalleryImages } from "./_components/render-gallery-images";

export default async function GalleryIdPage({
  params,
}: {
  params: { galleryId: string };
}) {
  const { galleryId } = params;

  if (!galleryId) notFound();

  const event = await api.event.get({ id: galleryId });
  const images = await api.event.getImages({ eventId: galleryId });

  if (!event || !images) notFound();

  return (
    <main className="grid grid-cols-1 bg-background md:h-[calc(100vh-65px)] md:grid-cols-3">
      <div className="p-3 md:pr-0">
        <GallerySidebar event={event} images={images} />
      </div>

      <RenderGalleryImages event={event} images={images} />
    </main>
  );
}

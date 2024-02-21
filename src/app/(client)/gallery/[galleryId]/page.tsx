import { GallerySidebar } from "@/components/partials/gallery/gallery-sidebar";
import { RenderGalleryImages } from "@/components/partials/gallery/render-gallery-images";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { paths } from "@/routes/paths";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";

export default async function GalleryIdPage({
  params,
}: {
  params: { galleryId: string };
}) {
  const { galleryId } = params;

  if (!galleryId) redirect(paths.gallery.error);

  const event = await api.event.get.query({ id: galleryId });

  if (!event) redirect(paths.gallery.error);

  return (
    <main className="grid grid-cols-1 bg-background md:h-[calc(100vh-65px)] md:grid-cols-3">
      <div className="p-3 md:pr-0">
        <GallerySidebar event={event} />
      </div>
      <div className="col-span-2 hidden overflow-hidden md:block">
        <ScrollArea className="relative h-screen p-3">
          <RenderGalleryImages eventId={galleryId} />
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </div>

      <div className="col-span-2 p-3 md:hidden">
        <RenderGalleryImages eventId={galleryId} />
      </div>
    </main>
  );
}

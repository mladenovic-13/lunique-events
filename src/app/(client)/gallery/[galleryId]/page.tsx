import { RenderGalleryImages } from "@/components/partials/gallery/render-gallery-images";
import { SelfieUploadCard } from "@/components/partials/gallery/selfie-upload-card";
import { paths } from "@/routes/paths";
import { redirect } from "next/navigation";

export default function GalleryIdPage({
  params,
}: {
  params: { galleryId: string };
}) {
  const { galleryId } = params;

  if (!galleryId) redirect(paths.gallery.error);

  return (
    <main className="dark grid gap-3 bg-background p-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
      <SelfieUploadCard eventId={galleryId} />
      <RenderGalleryImages eventId={galleryId} />
    </main>
  );
}

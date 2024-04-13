import { redirect } from "next/navigation";

import { paths } from "@/routes/paths";
import { getServerAuthSession } from "@/server/auth";

// TODO:
// - replace root with redirect to overview
// - move images to /{eventID}/images

export default async function EventIdPage({}: {
  params: {
    eventId: string;
  };
}) {
  const session = await getServerAuthSession();
  if (!session?.user.id) redirect(paths.signin.root);

  // const event = await api.event.get.query({ id: params.eventId });
  // if (!event?.id) notFound();

  // const images = await api.event.getImages.query({ eventId: event.id });
  // if (!images) notFound();

  return (
    <div className="space-y-5 pb-20 md:space-y-8">
      {/* TODO: find place for share, upload buttons */}
      {/* <EventActionButtons event={event} /> */}

      {/* {images.length > 0 && <EditEventGallery images={images} />} */}
      {/* {images.length === 0 && <NoEventImages id={event.id} />} */}
    </div>
  );
}

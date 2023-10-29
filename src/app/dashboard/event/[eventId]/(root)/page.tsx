import { OpenModalButton } from "@/components/buttons/open-modal-button";
import { events } from "@/lib/data";
import { format } from "date-fns";
import { Share2Icon, ShareIcon } from "lucide-react";

export default function EventIdPag({
  params,
}: {
  params: {
    eventId: string;
  };
}) {
  const eventId = Number(params.eventId);
  const event = events[eventId - 1];

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">{event?.name}</h1>
          <div className="flex gap-3">
            {event?.date && (
              <p className="text-xl text-zinc-500">
                {format(event.date, "do MMMM, yyy")}
              </p>
            )}
            {event?.location && (
              <p className="text-xl text-zinc-500">@{event.location}</p>
            )}
          </div>
        </div>
        <div className="flex gap-3">
          <OpenModalButton modalType="share-event" variant="outline" size="sm">
            <Share2Icon className="mr-1.5 h-5 w-5" />
            Share
          </OpenModalButton>
          <OpenModalButton modalType="upload-event-images" size="sm">
            <ShareIcon className="mr-1.5 h-5 w-5" />
            Upload
          </OpenModalButton>
        </div>
      </div>
    </div>
  );
}

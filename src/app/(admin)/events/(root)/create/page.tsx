"use client";
import { VisibilitySelect } from "@/components/partials/event/event-visibility-select";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { useModal } from "@/hooks/use-modal-store";
import thumbImage from "@/public/images/you are invited.png";
import { Globe, ImagePlus, Key } from "lucide-react";

export default function CreateEventPage() {
  const { onOpen } = useModal();

  return (
    <div className="flex flex-row space-x-8">
      <div className="relative w-60">
        <img src={thumbImage.src} className=" w-full rounded-xl" />
        <Button
          variant="secondary"
          onClick={() => onOpen("choose-event-thumbnail")}
          className="absolute bottom-2 right-2 w-10 rounded-full p-0"
        >
          <ImagePlus className="h-5" />
        </Button>
      </div>

      <div className="flex flex-col space-y-8">
        <VisibilitySelect />
        <div>
          <Input />
        </div>
        <div>3</div>
      </div>
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { TrashIcon } from "lucide-react";
import { useState } from "react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";

type ImageAttributes = {
  id: number;
  src: string;
};

interface ImageToggleGroupProps {
  images: ImageAttributes[];
  eventId: string;
}

export const EditEventGallery = ({
  images,
  eventId,
}: ImageToggleGroupProps) => {
  const [selected, setSelected] = useState<string[]>([]);

  const { onOpen } = useModal();

  const handleSelectAll = () => {
    setSelected(() => images.map((image) => String(image.id)));
  };

  const handleDeselectAll = () => {
    setSelected([]);
  };

  return (
    <div>
      <div>
        {selected.length === 0 && (
          <Button variant="secondary" onClick={handleSelectAll}>
            Select All
          </Button>
        )}
        {selected.length !== 0 && (
          <div className="flex gap-1.5">
            <Button variant="secondary" onClick={handleDeselectAll}>
              Deselect All
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="text-destructive"
              onClick={() =>
                onOpen("delete-event-images", { eventId, images: selected })
              }
            >
              <TrashIcon />
            </Button>
          </div>
        )}
      </div>
      <div>
        <ToggleGroup.Root
          type="multiple"
          value={selected}
          onValueChange={setSelected}
        ></ToggleGroup.Root>
      </div>
    </div>
  );
};

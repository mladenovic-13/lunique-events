"use client";

import { useModal } from "@/hooks/use-modal-store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export const ShareEventModal = () => {
  const { isOpen, type, onClose } = useModal();

  const isModalOpen = isOpen && type === "share-event";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share this gallery</DialogTitle>
          <DialogDescription>
            Anyone with the link can view this gallery.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

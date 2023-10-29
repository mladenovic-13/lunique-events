"use client";

import { useModal } from "@/hooks/use-modal-store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export const UploadImagesModal = () => {
  const { isOpen, type, onClose } = useModal();

  const isModalOpen = isOpen && type === "upload-event-images";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload photos</DialogTitle>
          <DialogDescription>Upload event photos here</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

"use client";

import { useModal } from "@/hooks/use-modal-store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CopyCheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast, useToast } from "../ui/use-toast";

export const ShareEventModal = () => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const { isOpen, type, onClose, data } = useModal();
  const { eventId } = data;

  const isModalOpen = isOpen && type === "share-event";

  const galleryUrl = `${origin}/gallery/${eventId}`;

  const { mutate: copy, isLoading } = useMutation({
    mutationFn: () => navigator.clipboard.writeText(galleryUrl),
    onSuccess: () => {
      setCopied(true);
      toast({
        title: "Link copied",
        description: "Anyone with link can view this gallery.",
      });
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    },
    onError: () =>
      toast({
        title: "Failed to copy link",
        description: "Please try again.",
      }),
  });

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share this gallery</DialogTitle>
          <DialogDescription>
            Anyone with the link can view this gallery.
          </DialogDescription>
          <div className="flex gap-3 py-5">
            <Input
              value={`http://localhost:3000/gallery/${eventId}`}
              className="flex-1"
            />
            <Button
              disabled={isLoading || copied}
              onClick={() => copy()}
              size="icon"
              variant="secondary"
            >
              {!copied && <CopyIcon className="h-5 w-5" />}
              {copied && !isLoading && <CopyCheckIcon className="h-5 w-5" />}
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

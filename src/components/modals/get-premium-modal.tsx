"use client";

import { CheckIcon } from "lucide-react";

import { useModal } from "@/hooks/use-modal-store";

import { GetNowButton } from "../billing/get-now-button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export const GetNowModal = () => {
  const { isOpen, type, onClose } = useModal();

  const isModalOpen = isOpen && type === "get-now";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="md:max-w-md">
        <DialogHeader>
          <DialogTitle>Upgrade to Premium Service</DialogTitle>
          <DialogDescription>
            Unlock access to our premium features by upgrading your service.
            Click the button below to purchase the premium service and enjoy
            exclusive benefits.
          </DialogDescription>
        </DialogHeader>
        <ul className="space-y-2 py-3">
          <li className="flex items-center gap-3">
            <CheckIcon className="size-5" />
            Unlimited events
          </li>
          <li className="flex items-center gap-3">
            <CheckIcon className="size-5" />
            Beautiful event pages
          </li>
          <li className="flex items-center gap-3">
            <CheckIcon className="size-5" />
            Unlimited event guests
          </li>
          <li className="flex items-center gap-3">
            <CheckIcon className="size-5" />
            Up to 500 weekly invites
          </li>
          <li className="flex items-center gap-3">
            <CheckIcon className="size-5" />
            Create up to 3 organizations
          </li>
          <li className="flex items-center gap-3">
            <CheckIcon className="size-5" />
            Event gallery
          </li>
          <li className="flex items-center gap-3">
            <CheckIcon className="size-5" />
            Upload up to 1000 pictures
          </li>
          <li className="flex items-center gap-3">
            <CheckIcon className="size-5" />
            Unlimited selfie searches
          </li>
        </ul>
        <DialogFooter>
          <GetNowButton />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

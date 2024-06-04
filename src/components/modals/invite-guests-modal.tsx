"use client";

import { useEffect } from "react";
import { XIcon } from "lucide-react";
import { useParams } from "next/navigation";

import {
  useGuestCapacity,
  useInviteGuestActions,
} from "@/hooks/use-guest-store";
import { useModal } from "@/hooks/use-modal-store";
import { cn } from "@/lib/utils";

import InviteGuestPartial from "../common/invite-guests";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Separator } from "../ui/separator";

export const InviteGuestsModal = () => {
  const { isOpen, type, onClose } = useModal();

  const guestCapacity = useGuestCapacity();
  const { resetStore } = useInviteGuestActions();
  const isModalOpen = isOpen && type === "invite-guests";
  useEffect(() => {
    if (isModalOpen) resetStore();
  }, [isModalOpen, resetStore]);
  const eventId = useParams().eventId as string;
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent
        closeIcon={false}
        className="flex  h-screen flex-col gap-0 p-0 pt-10 md:h-[620px] md:max-h-[620px] md:min-w-[700px] md:pt-0"
      >
        <div className="px-2 pb-4 pt-5">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <p className="capitalize">Invite Guests</p>
              <div className="flex items-center justify-center gap-2 text-secondary-foreground">
                <Button
                  variant={"outline"}
                  className={cn(
                    "flex h-6 cursor-pointer items-center rounded-full border border-accent-foreground/50  px-2 text-xs transition-all hover:border-accent-foreground hover:text-accent-foreground",
                    guestCapacity === 0 && "border-red-500 text-red-500",
                  )}
                >
                  <p className="uppercase">{guestCapacity} left</p>
                </Button>
                <Button
                  variant={"ghost"}
                  className="p-0"
                  size={"icon"}
                  onClick={onClose}
                >
                  <XIcon className="p-0" />
                </Button>
              </div>
            </DialogTitle>
          </DialogHeader>
        </div>
        <Separator className="h-px bg-white/20" />
        <div className="flex h-[85%]  md:h-[550px]">
          <InviteGuestPartial
            eventId={eventId}
            className="w-full"
            onInviteComplete={onClose}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

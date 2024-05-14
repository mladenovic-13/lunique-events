"use client";

import { useEffect } from "react";

import {
  useGuestCapacity,
  useInviteGuestActions,
} from "@/hooks/use-guest-store";
import { useModal } from "@/hooks/use-modal-store";
import { cn } from "@/lib/utils";

import { InviteGuests } from "../guests/invite-guests-panel";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Separator } from "../ui/separator";

export const InviteGuestsModal = () => {
  const { isOpen, type, onClose } = useModal();

  const guestCapacity = useGuestCapacity();
  const { setStep } = useInviteGuestActions();
  const isModalOpen = isOpen && type === "invite-guests";

  useEffect(() => {
    if (isModalOpen) setStep("add-emails");
  }, [isModalOpen, setStep]);

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="flex  min-w-[700px] flex-col gap-0 p-0">
        <div className="px-2 pb-4 pt-5">
          <DialogHeader className=" p-0 pl-2 pr-14">
            <DialogTitle className="flex items-center justify-between">
              <p className="capitalize">Invite Guests</p>
              <Button
                variant={"outline"}
                className={cn(
                  "flex h-6 cursor-pointer items-center rounded-full border border-accent-foreground/50  px-2 text-xs text-accent-foreground/50 transition-all hover:border-accent-foreground hover:text-accent-foreground",
                  guestCapacity === 0 && "border-red-500 text-red-500",
                )}
              >
                <p className="uppercase">{guestCapacity} left</p>
              </Button>
            </DialogTitle>
          </DialogHeader>
        </div>
        <Separator className="h-px bg-white/20" />
        <div className="flex  w-full px-2">
          <InviteGuests />
        </div>
        <DialogDescription className="space-y-2"></DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

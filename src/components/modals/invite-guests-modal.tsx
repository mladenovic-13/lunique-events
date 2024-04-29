"use client";

import { useState } from "react";

import { useModal } from "@/hooks/use-modal-store";

import { InviteGuests } from "../guests/invite-guests-menu";
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

  const [remainingGuestCount, setRemainingGuestCount] = useState(100);

  const isModalOpen = isOpen && type === "invite-guests";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className=" flex  min-w-[700px] flex-col p-0">
        <div className=" px-2 pt-5">
          <DialogHeader className=" p-0 pl-2 pr-14">
            <DialogTitle className="flex items-center justify-between">
              <p className="capitalize">Invite Guests</p>
              <Button
                variant={"outline"}
                className="flex h-6 cursor-pointer items-center rounded-full border border-accent-foreground/50  px-2 text-xs text-accent-foreground/50 transition-all hover:border-accent-foreground hover:text-accent-foreground"
              >
                <p className="uppercase">{remainingGuestCount} left</p>
              </Button>
            </DialogTitle>
          </DialogHeader>
        </div>
        <Separator className="h-px bg-white/20" />
        <div className="flex  w-full px-2">
          <InviteGuests
            changeRemainingGuestCount={(guestsCount) =>
              setRemainingGuestCount(100 - guestsCount)
            }
          />
        </div>
        <DialogDescription className="space-y-2">@ TODO</DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

"use client";

import { useModal } from "@/hooks/use-modal-store";

import { InviteGuests } from "../guests/invite-guests-menu";
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

  const isModalOpen = isOpen && type === "invite-guests";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className=" flex min-h-[650px] min-w-[700px] flex-col p-0">
        <div className=" px-2 pt-5">
          <DialogHeader className=" p-0 pl-2 pr-14">
            <DialogTitle className="flex items-center justify-between">
              <p className="capitalize">Invite Guests</p>
              <div className="flex h-6 items-center  rounded-full border border-accent-foreground/50 px-2 text-xs text-accent-foreground/50">
                <p className="uppercase">500 left</p>
              </div>
            </DialogTitle>
          </DialogHeader>
        </div>
        <Separator className="h-px bg-white/20" />
        <div className="flex w-full px-2">
          <InviteGuests />
        </div>
        <DialogDescription className="space-y-2">@ TODO</DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

"use client";

import { LoaderCircleIcon, UserRoundMinusIcon } from "lucide-react";

import { useModal } from "@/hooks/use-modal-store";
import { api } from "@/trpc/react";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useToast } from "../ui/use-toast";

export const RemoveAdminModal = () => {
  const { isOpen, type, onClose, data } = useModal();
  const { toast } = useToast();

  const isModalOpen = isOpen && type === "remove-admin";

  const { mutate: removeAdmin, isPending } =
    api.organization.removeAdmin.useMutation();

  const utils = api.useUtils();

  const onRemoveHandler = () => {
    if (!data.adminId || !data.organizationId) return;
    removeAdmin(
      { organizationId: data.organizationId, adminId: data.adminId },
      {
        onSuccess: () => {
          toast({ title: "Admin succesfully removed" });
          utils.invalidate().catch(() => ({}));
          onClose();
        },
        onError: (error) => {
          toast({
            title: "Failed",
            description: error.message,
            variant: "destructive",
          });
          console.log(error.message);
        },
      },
    );
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="">
        <DialogHeader>
          <div className="mb-5 flex w-full items-center justify-start">
            <UserRoundMinusIcon className="size-20 rounded-full bg-destructive/10 p-4 text-destructive" />
          </div>
          <DialogTitle>Remove Admin</DialogTitle>
          <DialogDescription>
            Are you sure you want to remove this admin?
          </DialogDescription>
        </DialogHeader>
        <div className="mt-5 flex gap-2">
          <Button
            variant="destructive"
            className="w-full"
            onClick={() => onRemoveHandler()}
          >
            {isPending && <LoaderCircleIcon className="animate-spin" />}
            {!isPending && <p>Remove</p>}
          </Button>
          <Button variant="secondary" className="w-full" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

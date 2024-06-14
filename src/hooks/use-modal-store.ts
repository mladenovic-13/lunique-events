import { create } from "zustand";

import { type RouterOutputs } from "@/trpc/react";

export type ModalType =
  | "share-event"
  | "cancel-subscription"
  | "choose-event-thumbnail"
  | "show-guest-list"
  | "check-guests"
  | "invite-guests"
  | "confirm-registration"
  | "group-registration"
  | "get-now"
  | "event-capacity"
  | "org-admins";

export type ModalData = {
  eventId?: string;
  organizationId?: string;
  subscription?: RouterOutputs["billing"]["getSubscription"];
};

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (modal: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,

  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));

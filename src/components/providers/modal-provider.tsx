"use client";

import { useEffect, useState } from "react";

import { CancelSubscriptionModal } from "../modals/cancel-subscription-modal";
import { CheckGuestsModal } from "../modals/check-guests-modal";
import { ChooseThumbnailModal } from "../modals/choose-event-thumbnail";
import { ConfirmRegistrationModal } from "../modals/confirm-registration-modal";
import { DeleteEventImagesModal } from "../modals/delete-images-modal";
import { EventCapacityModal } from "../modals/event-capacity-modal";
import { GalleryModal } from "../modals/gallery-modal";
import { GetNowModal } from "../modals/get-premium-modal";
import { GroupRegistrationModal } from "../modals/group-registration-modal";
import { InviteGuestsModal } from "../modals/invite-guests-modal";
import { ShareEventModal } from "../modals/share-event-modal";
import { ShowGuestListModal } from "../modals/show-guest-list-modal";
import { UploadImagesModal } from "../modals/upload-images-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <ShareEventModal />
      <UploadImagesModal />
      <DeleteEventImagesModal />
      <GalleryModal />
      <CancelSubscriptionModal />
      <ChooseThumbnailModal />
      <ShowGuestListModal />
      <CheckGuestsModal />
      <InviteGuestsModal />
      <ConfirmRegistrationModal />
      <GroupRegistrationModal />
      <EventCapacityModal />
      <GetNowModal />
    </>
  );
};

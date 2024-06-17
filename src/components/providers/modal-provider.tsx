"use client";

import { useEffect, useState } from "react";

import { CancelSubscriptionModal } from "../modals/cancel-subscription-modal";
import { CheckGuestsModal } from "../modals/check-guests-modal";
import { ChooseThumbnailModal } from "../modals/choose-event-thumbnail";
import { ConfirmRegistrationModal } from "../modals/confirm-registration-modal";
import { EventCapacityModal } from "../modals/event-capacity-modal";
import { GetNowModal } from "../modals/get-premium-modal";
import { GroupRegistrationModal } from "../modals/group-registration-modal";
import { InviteGuestsModal } from "../modals/invite-guests-modal";
import { OrganizationAdminsModal } from "../modals/organization-admins-modal";
import { RemoveAdminModal } from "../modals/remove-admin-modal";
import { ShareEventModal } from "../modals/share-event-modal";
import { ShowGuestListModal } from "../modals/show-guest-list-modal";

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
      <CancelSubscriptionModal />
      <ChooseThumbnailModal />
      <ShowGuestListModal />
      <CheckGuestsModal />
      <InviteGuestsModal />
      <ConfirmRegistrationModal />
      <GroupRegistrationModal />
      <EventCapacityModal />
      <GetNowModal />
      <OrganizationAdminsModal />
      <RemoveAdminModal />
    </>
  );
};

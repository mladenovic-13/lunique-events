"use client";

import { useParams } from "next/navigation";

import Section from "@/components/header/section";
import { MainPage } from "@/components/layout/main-page";
import { useModal } from "@/hooks/use-modal-store";

export default function CalendarPeoplePage() {
  const { onOpen } = useModal();
  const { organizationId } = useParams<{ organizationId: string }>();

  return (
    <MainPage>
      <div>
        <Section
          title="Admins"
          description="Manage your organization admins."
          button="Add Admin"
          onAction={() => onOpen("org-admins", { organizationId })}
        />
      </div>
    </MainPage>
  );
}

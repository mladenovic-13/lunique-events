"use client";

import { Separator } from "@/components/ui/separator";

import RegistrationActionButtons from "./_components/action-buttons";
import { CustomizeEmailsSection } from "./_components/customize-emails";
import { RegistrationQuestions } from "./_components/registration-questions";
import { StripeCard } from "./_components/stripe-card";
import { TicketsGrid } from "./_components/tickets-grid";

export default function RegistrationPage({}: {
  params: {
    eventId: string;
  };
}) {
  const tickets = [
    { id: 1, ticketName: "Premium", requireApproval: false, available: true },
    { id: 2, ticketName: "VIP", requireApproval: true, available: false },
    { id: 3, ticketName: "VIP", requireApproval: true, available: false },
    { id: 4, ticketName: "VIP", requireApproval: true, available: false },
  ];
  const requireApproval = false;

  return (
    <div className="flex flex-col space-y-4">
      <RegistrationActionButtons />
      <StripeCard />
      <TicketsGrid tickets={tickets} />
      <Separator />
      <CustomizeEmailsSection requireApproval={requireApproval} />
      <Separator className="" />
      <RegistrationQuestions />
    </div>
  );
}

"use client";

import { Separator } from "@/components/ui/separator";

import RegistrationActionButtons from "./_components/action-buttons";
import { CustomizeEmailsSection } from "./_components/customize-emails";
import { RegistrationQuestions } from "./_components/registration-questions";
import { StripeCard } from "./_components/stripe-card";
import { TicketsGrid } from "./_components/tickets-grid";

export default function RegistrationPage() {
  const tickets = [
    { id: 1, ticketName: "Premium", requireApproval: false, available: true },
    { id: 2, ticketName: "VIP", requireApproval: true, available: false },
    { id: 3, ticketName: "Business", requireApproval: true, available: true },
    { id: 4, ticketName: "Economy", requireApproval: false, available: true },
  ];
  const requireApproval: boolean =
    tickets.filter((ticket) => ticket.requireApproval === false).length === 0;

  return (
    <div className="flex flex-col space-y-4">
      <RegistrationActionButtons />
      <StripeCard />
      <TicketsGrid tickets={tickets} />
      <Separator />
      <CustomizeEmailsSection requireApproval={requireApproval} />
      <Separator />
      <RegistrationQuestions />
    </div>
  );
}

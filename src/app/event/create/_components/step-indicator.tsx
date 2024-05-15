"use client";

import { useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";

export const StepIndicator = () => {
  const searchParams = useSearchParams();

  const step = searchParams.get("step") ?? "create";

  return (
    <div className="grid grid-cols-3 gap-10 px-3 pb-8 pt-5">
      <StepItem label="Create Event" isCompleted />
      <StepItem
        label="Registration"
        isCompleted={step === "registration" || step === "guests"}
      />
      <StepItem label="Invite guests" isCompleted={step === "guests"} />
    </div>
  );
};

const StepItem = ({
  label,
  isCompleted,
}: {
  label: string;
  isCompleted?: boolean;
}) => {
  return (
    <div className="space-y-1">
      <div
        className={cn("h-1 w-full bg-secondary", isCompleted && "bg-primary")}
      />
      <p className="text-sm">{label}</p>
    </div>
  );
};

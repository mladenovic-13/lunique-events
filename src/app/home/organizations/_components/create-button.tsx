"use client";

import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { paths } from "@/routes/paths";
import { api } from "@/trpc/react";

export const CreateButton = () => {
  const router = useRouter();

  const { data: isPremiumUser } = api.billing.isPremiumUser.useQuery();
  const { onOpen } = useModal();

  const onClick = () => {
    if (!isPremiumUser) onOpen("get-now");
    if (isPremiumUser) router.push(paths.organization.create);
  };

  return (
    <Button variant="secondary" size="sm" onClick={onClick}>
      <PlusIcon className="mr-1.5 size-4" /> Create
    </Button>
  );
};

"use client";

import { Building2Icon, User2Icon } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useConfigActions, useOrganizationId } from "@/hooks/use-config-store";
import { selectPrevendDefault } from "@/lib/select-ref";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";

interface OrganizationSelectProps {
  className?: string;
}

export const OrganizationSelect = ({ className }: OrganizationSelectProps) => {
  const organizationId = useOrganizationId();
  const { updateOrganizationId } = useConfigActions();

  const { data: organizations, isLoading } = api.organization.list.useQuery();

  const organization = organizations?.find(
    (item) => item.id === organizationId,
  );

  if (isLoading)
    return <div className="h-8 w-full rounded-md bg-muted md:w-32" />;

  return (
    <Select value={organizationId} onValueChange={updateOrganizationId}>
      <SelectTrigger
        className={cn("h-8 w-full md:w-fit", className && className)}
      >
        <div className="flex items-center gap-1.5">
          {organization?.isPersonal && <User2Icon className="size-4" />}
          {!organization?.isPersonal && <Building2Icon className="size-4" />}

          <span className="truncate">{organization?.name}</span>
        </div>
      </SelectTrigger>
      <SelectContent ref={selectPrevendDefault}>
        {organizations
          ?.sort((org) => (org.isPersonal ? -1 : 1))
          .map((org) => (
            <SelectItem key={org.id} value={org.id}>
              <div className="flex items-center gap-3">
                <div className="flex items-center">
                  {org.isPersonal && <User2Icon className="size-4" />}
                  {!org.isPersonal && <Building2Icon className="size-4" />}
                </div>
                {org.name}
              </div>
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};

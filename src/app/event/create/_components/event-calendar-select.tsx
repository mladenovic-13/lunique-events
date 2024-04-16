"use client";

import { useEffect } from "react";
import { Building2Icon, User2Icon } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useConfigActions, useOrganizationId } from "@/hooks/use-config-store";
import { selectPrevendDefault } from "@/lib/select-ref";
import { api } from "@/trpc/react";

interface OrganizationInputProps {
  value: string | null;
  onChange: (value: string) => void;
}

export function OrganizationInput({ onChange }: OrganizationInputProps) {
  const { data: organizations, isLoading } = api.organization.list.useQuery();
  const organizationId = useOrganizationId();
  const { updateOrganizationId } = useConfigActions();

  useEffect(() => {
    if (!organizationId) return;
    onChange(organizationId);
  }, [organizationId, onChange]);

  if (isLoading)
    return <div className="h-8 w-48 animate-pulse rounded-md bg-muted" />;

  const org = organizations?.find((item) => item.id === organizationId);

  return (
    <div>
      <Select value={organizationId} onValueChange={updateOrganizationId}>
        <SelectTrigger className="h-8 max-w-32 justify-between border-muted-foreground/10 bg-muted data-[state=open]:bg-muted-foreground/50 md:min-w-40 md:max-w-fit">
          <div className="flex items-center justify-start gap-3">
            {org?.isPersonal && <User2Icon className="size-4" />}
            {!org?.isPersonal && <Building2Icon className="size-4" />}

            <span className="truncate">{org?.name}</span>
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
    </div>
  );
}

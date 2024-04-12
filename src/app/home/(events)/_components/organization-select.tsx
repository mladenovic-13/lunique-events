"use client";

import { Building2Icon, User2Icon } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useConfig } from "@/hooks/use-config-store";
import { api } from "@/trpc/react";

export const OrganizationSelect = () => {
  const { organization: id, updateOrganization: updateId } = useConfig();

  const { data: organizations } = api.organization.list.useQuery();

  const organization = organizations?.find((item) => item.id === id);

  return (
    <Select value={id} onValueChange={updateId}>
      <SelectTrigger className="max-w-32  md:min-w-40 md:max-w-fit">
        {organization?.isPersonal && <User2Icon className="size-4" />}
        {!organization?.isPersonal && <Building2Icon className="size-4" />}

        <span className="truncate">{organization?.name}</span>
      </SelectTrigger>
      <SelectContent>
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

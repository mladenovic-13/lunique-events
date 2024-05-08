import React from "react";
import { Building2Icon, User2Icon } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { type RouterOutputs } from "@/trpc/shared";

interface SelectOrganizationProps {
  organizations: RouterOutputs["organization"]["list"];
  value: string;
  onChangeValue: () => void;
  organizationId: string;
}

export const SelectOrganization = ({
  organizations,
  value,
  onChangeValue,
  organizationId,
}: SelectOrganizationProps) => {
  return (
    <Select value={value ?? ""} onValueChange={onChangeValue}>
      <SelectTrigger className="h-8 w-full md:w-fit">
        <div className="flex items-center gap-1.5">
          <span className="truncate">
            {
              organizations.find((org) =>
                value ? org.id === value : org.id === organizationId,
              )?.name
            }
          </span>
        </div>
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

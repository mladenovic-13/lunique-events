"use client";

import { useEffect } from "react";
import { Building2 } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { api } from "@/trpc/react";

interface OrganizationInputProps {
  value: string | null;
  onChange: (value: string) => void;
}

export function OrganizationInput({ value, onChange }: OrganizationInputProps) {
  const { data: organizations, isLoading } = api.organization.list.useQuery();

  useEffect(() => {
    if (!organizations && value) return;

    const personalOrganizationId = organizations?.find(
      (organization) => organization.isPersonal,
    )?.id;

    onChange(personalOrganizationId ?? "");
    // eslint-disable-next-line
  }, [organizations, onChange]);

  if (isLoading)
    return <div className="h-8 w-48 animate-pulse rounded-md bg-muted" />;

  return (
    <div>
      <Select value={value ? value : undefined} onValueChange={onChange}>
        <SelectTrigger className="h-8 min-w-40  truncate border-muted-foreground/10 bg-muted capitalize data-[state=open]:bg-muted-foreground/50">
          <Building2 className="mr-1.5 size-4" />
          {organizations?.find((organizations) => organizations.id === value)
            ?.name ?? ""}
        </SelectTrigger>
        <SelectContent>
          {organizations?.map((organization) => (
            <SelectItem key={organization.id} value={organization.id}>
              {organization.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

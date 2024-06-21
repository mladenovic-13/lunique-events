"use client";
import React from "react";
import { useSession } from "next-auth/react";

import { paths } from "@/routes/paths";
import { type RouterOutputs } from "@/trpc/react";

import { OrganizationCard } from "./organization-card";

interface AdminOfOrganizationsProps {
  organizations: RouterOutputs["organization"]["list"];
}
const AdminOfOrganizations = ({ organizations }: AdminOfOrganizationsProps) => {
  const user = useSession().data?.user;
  return (
    <ul className="grid w-full grid-cols-1 gap-3 md:grid-cols-3">
      {organizations
        .filter(
          (item) => item.isPersonal === false && item.ownerId !== user?.id,
        )
        .map((organization) => (
          <OrganizationCard
            key={organization.id}
            organization={organization}
            href={paths.organization.manage.events(organization.id)}
          />
        ))}
    </ul>
  );
};

export default AdminOfOrganizations;

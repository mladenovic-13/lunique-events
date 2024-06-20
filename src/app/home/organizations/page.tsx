import { notFound } from "next/navigation";

import { MainPage } from "@/components/layout/main-page";
import { Separator } from "@/components/ui/separator";
import { paths } from "@/routes/paths";
import { api } from "@/trpc/server";

import AdminOfOrganizations from "./_components/admin-organizations";
import { CreateButton } from "./_components/create-button";
import OrganizationGuide from "./_components/guide";
import { OrganizationCard } from "./_components/organization-card";
import OwnerOfOrganizations from "./_components/owner-organizations";

export default async function OrganizationsHomePage() {
  const organizations = await api.organization.list();
  // const adminOf = await api.organization.listAdminOf();
  if (!organizations) notFound();

  return (
    <MainPage className="animate-collapsible-down">
      <OrganizationGuide />
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium md:text-xl">My Organizations</h2>
        <CreateButton />
      </div>

      <OwnerOfOrganizations organizations={organizations} />
      <Separator />
      <h2 className="text-lg font-medium md:text-xl">Admin of Organizations</h2>
      <AdminOfOrganizations organizations={organizations} />
      {/* {adminOf.map((organization) => (
          <OrganizationCard
            key={organization.id}
            organization={organization}
            href={paths.organization.manage.events(organization.id)}
          />
        ))} */}
    </MainPage>
  );
}

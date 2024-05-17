import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { MainPage } from "@/components/layout/main-page";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { paths } from "@/routes/paths";
import { api } from "@/trpc/server";

import { OrganizationCard } from "./_components/organization-card";

export default async function OrganizationsHomePage() {
  const organizations = await api.organization.list();

  if (!organizations) notFound();

  return (
    <MainPage>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium md:text-xl">My Organizations</h2>
        <Link
          href={paths.organization.create}
          className={buttonVariants({ variant: "secondary", size: "sm" })}
        >
          <PlusIcon className="mr-1.5 size-4" /> Create
        </Link>
      </div>

      <ul className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {organizations.map((organization) => (
          <OrganizationCard
            key={organization.id}
            organization={organization}
            href={paths.organization.manage.events(organization.id)}
          />
        ))}
      </ul>
      <Separator />
      <h2 className="text-lg font-medium md:text-xl">
        Subscribed Organization
      </h2>
      <div className="flex h-52 items-center justify-center">
        {/* <p className="text-sm text-muted-foreground">
          No subscribed organizations
        </p> */}
        <p className="text-sm text-muted-foreground">Soon</p>
      </div>
    </MainPage>
  );
}

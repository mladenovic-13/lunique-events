import { redirect } from "next/navigation";

import { MainPage } from "@/components/layout/main-page";
import { paths } from "@/routes/paths";
import { api } from "@/trpc/server";

import { CreateOrganizationForm } from "./_components/create-organization-form";

export default async function CreateCalendarPage() {
  const isPremium = await api.billing.isPremiumUser();

  if (!isPremium) redirect(paths.pricing);

  return (
    <MainPage>
      <h1 className="text-2xl font-semibold md:text-3xl">
        Create Organization
      </h1>
      <CreateOrganizationForm />
    </MainPage>
  );
}

import { MainPage } from "@/components/layout/main-page";

import { CreateOrganizationForm } from "./_components/create-organization-form";

export default function CreateCalendarPage() {
  return (
    <MainPage>
      <h1 className="text-2xl font-semibold md:text-3xl">
        Create Organization
      </h1>
      <CreateOrganizationForm />
    </MainPage>
  );
}

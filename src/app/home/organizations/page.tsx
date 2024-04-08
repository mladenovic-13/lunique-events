import { notFound } from "next/navigation";

import { MainPage } from "@/components/layout/main-page";
import { api } from "@/trpc/server";

export default async function OrganizationsHomePage() {
  const organizations = await api.organization.list.query();

  if (!organizations) notFound();

  return (
    <MainPage>
      <h1>Organizations</h1>
      <div>
        <ul>
          {organizations.map((organization) => (
            <li key={organization.id}>Name: {organization.name}</li>
          ))}
        </ul>
      </div>
    </MainPage>
  );
}

import { notFound, redirect } from "next/navigation";

import { ManageNav } from "@/components/navigation/manage-nav";
import { paths } from "@/routes/paths";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";

export default async function ManageCalendarLayout({
  children,
  params: { organizationId },
}: {
  children: React.ReactNode;
  params: { organizationId: string };
}) {
  const session = await getServerAuthSession();

  if (!session) return redirect(paths.signin.root);

  const organizationName = await api.organization.getName({
    id: organizationId,
  });

  const organization = await api.organization.getOne({
    id: organizationId,
  });

  if (!organizationName) return notFound();
  if (
    !organization?.members
      .map((member) => member.id)
      .includes(session.user.id) &&
    organization?.owner.id !== session.user.id
  )
    return notFound();

  const items = [
    {
      title: "Events",
      href: paths.organization.manage.events(organizationId),
    },
    {
      title: "Admins",
      href: paths.organization.manage.admins(organizationId),
    },
    // {
    //   title: "Newsletter",
    //   href: paths.organization.manage.newsletter(organizationId),
    // },
    // {
    //   title: "Insights",
    //   href: paths.organization.manage.insights(organizationId),
    // },
    // {
    //   title: "Settings",
    //   href: paths.organization.manage.settings.display(organizationId),
    // },
  ];

  return (
    <>
      <div className="sticky top-0 z-50 border-b bg-background">
        <div className="mx-auto max-w-4xl md:pt-3">
          <ManageNav
            items={items}
            title={organizationName.name}
            landingPage={{
              label: "Organization Page",
              href: paths.organization.landing.root(organizationId),
            }}
          />
        </div>
      </div>
      <main className="mx-auto max-w-4xl md:px-0 md:py-5">{children}</main>
    </>
  );
}

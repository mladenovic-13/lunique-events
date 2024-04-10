import { redirect } from "next/navigation";

import { ManageNav } from "@/components/navigation/manage-nav";
import { paths } from "@/routes/paths";
import { getServerAuthSession } from "@/server/auth";

export default async function ManageCalendarLayout({
  children,
  params: { calendarId },
}: {
  children: React.ReactNode;
  params: { calendarId: string };
}) {
  const session = await getServerAuthSession();

  if (!session) return redirect(paths.signin.root);

  const items = [
    {
      title: "Events",
      href: paths.organization.manage.events(calendarId),
    },
    {
      title: "People",
      href: paths.organization.manage.people(calendarId),
    },
    {
      title: "Newsletter",
      href: paths.organization.manage.newsletter(calendarId),
    },
    {
      title: "Insights",
      href: paths.organization.manage.insights(calendarId),
    },
    {
      title: "Settings",
      href: paths.organization.manage.settings.display(calendarId),
    },
  ];

  return (
    <>
      <div className="sticky top-0 z-50 border-b bg-background">
        <div className="mx-auto max-w-4xl md:pt-3">
          <ManageNav
            items={items}
            navigateBack={{
              label: "Organizations",
              href: paths.home.organizations,
            }}
            navigateForward={{
              label: "Organization Page",
              href: paths.organization.landing.root(calendarId),
            }}
          />
        </div>
      </div>
      <main className="mx-auto max-w-4xl md:px-0 md:py-5">{children}</main>
    </>
  );
}

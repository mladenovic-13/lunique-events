import { notFound, redirect } from "next/navigation";

import { ManageNav } from "@/components/navigation/manage-nav";
import { paths } from "@/routes/paths";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";

interface SettingsLayoutProps {
  params: { eventId: string };
  children: React.ReactNode;
}

export default async function EventIdLayout({
  children,
  params: { eventId },
}: SettingsLayoutProps) {
  const session = await getServerAuthSession();

  if (!session) return redirect(paths.signin.root);

  const event = await api.event.getName.query({ id: eventId });

  if (!event) return notFound();

  const items = [
    {
      title: "Overview",
      href: paths.event.manage.overview(eventId),
    },
    {
      title: "Guests",
      href: paths.event.manage.guests(eventId),
    },
    {
      title: "Registration",
      href: paths.event.manage.registration(eventId),
    },
    {
      title: "Emails",
      href: paths.event.manage.emails(eventId),
    },
    {
      title: "Photos",
      href: paths.event.manage.photos(eventId),
    },
    {
      title: "Insights",
      href: paths.event.manage.insights(eventId),
    },
    {
      title: "Settings",
      href: paths.event.manage.settings(eventId),
    },
  ];

  return (
    <>
      <div className="sticky top-0 z-50 border-b bg-background">
        <div className="mx-auto max-w-4xl pt-3">
          <ManageNav
            items={items}
            title={event.name}
            landingPage={{
              label: "Event Page",
              href: paths.event.landing.root(eventId),
            }}
          />
        </div>
      </div>
      <main className="mx-auto max-w-4xl p-3 md:px-0 md:py-5">{children}</main>
    </>
  );
}

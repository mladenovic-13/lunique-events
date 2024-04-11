import { CalendarSettingsNav } from "@/components/navigation/calendar-settings-nav";

export default function ManageCalendarSettingsLayout({
  children,
  params: { organizationId },
}: {
  children: React.ReactNode;
  params: { organizationId: string };
}) {
  return (
    <div className="flex flex-col md:flex-row">
      <CalendarSettingsNav id={organizationId} />
      <div>{children}</div>
    </div>
  );
}

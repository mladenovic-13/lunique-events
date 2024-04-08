import { CalendarSettingsNav } from "@/components/navigation/calendar-settings-nav";

export default function ManageCalendarSettingsLayout({
  children,
  params: { calendarId },
}: {
  children: React.ReactNode;
  params: { calendarId: string };
}) {
  return (
    <div className="flex flex-col md:flex-row">
      <CalendarSettingsNav id={calendarId} />
      <div>{children}</div>
    </div>
  );
}

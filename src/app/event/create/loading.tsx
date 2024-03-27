import { EventSettingsSkeleton } from "../manage/[eventId]/settings/_components/event-settings-skeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-4xl">
      <EventSettingsSkeleton />
    </div>
  );
}

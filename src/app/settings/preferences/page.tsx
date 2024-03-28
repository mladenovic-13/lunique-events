import { Separator } from "@/components/ui/separator";

import { DisplaySettings } from "./_components/display-settings";
import { Notifications } from "./_components/notifications";
import { Subscriptions } from "./_components/subscriptions";

export default function PreferencesSettingsPage() {
  return (
    <div className="flex flex-col space-y-8 px-2">
      <DisplaySettings />
      <Separator />
      <Notifications />
      <Separator />
      <Subscriptions />
    </div>
  );
}

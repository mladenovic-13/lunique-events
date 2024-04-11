import { redirect } from "next/navigation";

import { paths } from "@/routes/paths";

export default function SettingsPage() {
  return redirect(paths.settings.account);
}

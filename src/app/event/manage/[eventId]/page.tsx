import { redirect } from "next/navigation";

import { paths } from "@/routes/paths";

export default function EventIdRootPage({
  params,
}: {
  params: {
    eventId: string;
  };
}) {
  return redirect(paths.event.manage.overview(params.eventId));
}

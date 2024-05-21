import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { paths } from "@/routes/paths";
import { getServerAuthSession } from "@/server/auth";

export const ManageEventCard = async ({
  eventId,
  creatorId,
}: {
  eventId: string;
  creatorId: string;
}) => {
  const session = await getServerAuthSession();

  const isVisitorManager = session?.user.id === creatorId;

  if (!isVisitorManager) return null;

  return (
    <Card>
      <CardHeader className="rounded-t-lg bg-card-foreground/5 px-3 py-2">
        <CardTitle className="text-sm">Permissions</CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        You have managing access to this event
      </CardContent>
      <CardFooter className="p-3">
        <Link
          href={paths.event.manage.overview(eventId)}
          className={buttonVariants({ className: "w-full" })}
        >
          Manage Event
        </Link>
      </CardFooter>
    </Card>
  );
};

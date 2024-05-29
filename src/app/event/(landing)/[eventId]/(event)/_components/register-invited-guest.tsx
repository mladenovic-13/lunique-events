import { redirect } from "next/navigation";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { paths } from "@/routes/paths";
import { api } from "@/trpc/server";

import { GoingOptionButtons } from "./going-option-buttons";

interface RegisterInvitedGuestProps {
  inviteId: string;
  eventId: string;
}

export const RegisterInvitedGuest = async ({
  inviteId,
  eventId,
}: RegisterInvitedGuestProps) => {
  const invite = await api.invite.get({ id: inviteId });
  const rules = await api.event.getRegistration({ eventId: eventId });

  if (!rules || !invite) redirect(paths.event.landing.root(eventId));

  const guest = await api.guest.getByEmail({ email: invite.email, eventId });

  return (
    <div className="space-y-3">
      <Card>
        <CardHeader className="rounded-t-lg bg-card-foreground/5 px-3 py-2">
          <CardTitle className="text-sm">Registration</CardTitle>
        </CardHeader>
        <CardContent className="pt-5">
          {invite.message && (
            <p className="text-center">
              <q>{invite.message}</q>
            </p>
          )}
          {!invite.message && (
            <p className="text-center">
              <q>Welcome! To join event, please register below.</q>
            </p>
          )}
        </CardContent>
        <CardFooter>
          <GoingOptionButtons rules={rules} invite={invite} guest={guest} />
        </CardFooter>
      </Card>
    </div>
  );
};

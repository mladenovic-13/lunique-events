import { env } from "process";
import { Resend } from "resend";

import { InvitationEmail } from "@/components/email/invitation-email";

const resend = new Resend(env.EMAIL_SERVER_PASSWORD);
export async function POST(request: Request) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { receivers } = await request.json();

  return await resend.emails.send({
    from: "events@lunique.tech",
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    to: receivers,
    subject: "You Are Invited",
    react: InvitationEmail(),
  });
}

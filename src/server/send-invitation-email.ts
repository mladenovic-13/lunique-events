import { env } from "process";
import { Resend } from "resend";

import { InvitationEmail } from "@/components/email/invitation-email";

const resend = new Resend(env.EMAIL_SERVER_PASSWORD);
export async function sendInvitationEmail() {
  // const emails = await request.json();
  const emailReceivers: string[] = ["l.stojadinovic99@gmail.com"];

  await resend.emails.send({
    from: `Lunique Tech <events@lunique.tech>`,
    to: emailReceivers,
    subject: "You Are Invited",
    react: InvitationEmail(),
  });
}

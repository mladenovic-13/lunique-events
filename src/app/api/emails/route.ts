import console from "console";
import { NextResponse } from "next/server";
import { Resend } from "resend";

import { InvitationEmail } from "@/components/email/invitation-email";

const resend = new Resend(process.env.EMAIL_SERVER_PASSWORD);

export async function POST(request: Request) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { emails } = await request.json();
  try {
    const data = await resend.emails.send({
      from: `Lunique Tech <${process.env.EMAIL_FROM}>`,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      to: emails,
      subject: "You Are Invited",
      react: InvitationEmail(),
    });
    console.log(data);
    if (data.id !== null)
      return NextResponse.json({ message: "Email Succesfully Sent!" });
    return NextResponse.json(data);
  } catch (error) {}
}

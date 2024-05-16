import { type SendVerificationRequestParams } from "next-auth/providers";
import { Resend } from "resend";

import { VerificationEmail } from "@/components/email/verification-email";
import { env } from "@/env.mjs";

const resend = new Resend(env.EMAIL_SERVER_PASSWORD);
const logo = `${env.NEXT_PUBLIC_AWS_CLOUDFRONT_DOMAIN}/assets/logo.png`;

export async function sendVerificationRequest({
  identifier,
  provider,
  url,
}: SendVerificationRequestParams) {
  await resend.emails.send({
    from: `Lunique Tech <${provider.from}>`,
    to: [identifier],
    subject: "Sign In Magic Link",
    react: VerificationEmail({ magicLink: url, logo: logo }),
  });
}

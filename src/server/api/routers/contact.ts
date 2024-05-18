import { CustomerSupportEmail } from "@/components/email/customer-support-email";
import { env } from "@/env.mjs";
import { contactFormSchema } from "@/lib/validation";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const contactRouter = createTRPCRouter({
  send: protectedProcedure
    .input(contactFormSchema)
    .mutation(async ({ ctx, input }) => {
      const logo = `${env.NEXT_PUBLIC_AWS_CLOUDFRONT_DOMAIN}/assets/logo.png`;
      return await ctx.resend.emails.send({
        from: `Lunique Events <${env.EMAIL_FROM}>`,
        to: [
          "contact@lunique.tech",
          "luka@lunique.tech",
          "nikola@lunique.tech",
        ],
        subject: "Customer Message",
        react: CustomerSupportEmail({
          customerMessage: input.message ?? "",
          customerName: input.fullname ?? "",
          customerEmail: input.email ?? "",
          logo: logo,
        }),
      });
    }),
});

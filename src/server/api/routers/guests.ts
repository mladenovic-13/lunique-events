import * as z from "zod";

import { InvitationEmail } from "@/components/email/invitation-email";
import { env } from "@/env.mjs";
import { paths } from "@/routes/paths";
import { registrationSchema } from "@/validation/register-guest";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const guestsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      registrationSchema.extend({
        eventId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.guest.create({
        data: {
          event: {
            connect: {
              id: input.eventId,
            },
          },
          email: input.email,
        },
      });

      return null;
    }),
  list: protectedProcedure
    .input(
      z.object({
        eventId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.guest.findMany({
        where: {
          eventId: input.eventId,
        },
      });
    }),
  invite: protectedProcedure
    .input(
      z.object({
        emails: z.string().array(),
        customMessage: z.string(),
        eventId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const eventLadingPage = `${env.NEXT_PUBLIC_VERCEL_URL}${paths.event.landing.root(input.eventId)}`;
      const logo = `${env.NEXT_PUBLIC_AWS_CLOUDFRONT_DOMAIN}/assets/logo.png`;
      return await ctx.resend.emails.send({
        from: `Lunique Events <${env.EMAIL_FROM}>`,
        to: input.emails,
        subject: "You Are Invited",
        react: InvitationEmail({
          customMessage: input.customMessage,
          eventLandingPage: eventLadingPage,
          userName: ctx.session.user.name,
          logo: logo,
        }),
      });
    }),
});

import { TRPCError } from "@trpc/server";
import * as z from "zod";

import { InvitationEmail } from "@/components/email/invitation-email";
import { env } from "@/env.mjs";
import { paths } from "@/routes/paths";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const inviteRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.invite.findFirst({
        where: {
          id: input.id,
        },
      });
    }),
  send: protectedProcedure
    .input(
      z.object({
        emails: z.string().array(),
        customMessage: z.string(),
        eventId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { eventId, emails, customMessage } = input;

      const baseUrl = `${env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}${paths.event.landing.root(input.eventId)}`;
      const logo = `${env.NEXT_PUBLIC_AWS_CLOUDFRONT_DOMAIN}/assets/logo.png`;

      const res = await ctx.db.invite.createMany({
        data: emails.map((email) => ({ eventId, email, status: "PENDING" })),
      });

      if (!res.count) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Failed to create invites",
        });
      }

      const invites = await ctx.db.invite.findMany({
        where: {
          eventId: eventId,
        },
        select: {
          id: true,
          email: true,
        },
      });

      if (!invites) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Failed to find related invites",
        });
      }

      return await Promise.all(
        invites.map((invite) =>
          ctx.resend.emails.send({
            from: `Lunique Events <${env.EMAIL_FROM}>`,
            to: [invite.email],
            subject: "You Are Invited",
            react: InvitationEmail({
              customMessage: customMessage,
              eventLandingPage: baseUrl + "?" + `invite=${invite.id}`,
              userName: ctx.session.user.name,
              logo: logo,
            }),
          }),
        ),
      );
    }),
});

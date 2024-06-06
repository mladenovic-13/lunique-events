import { InviteStatus } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import * as z from "zod";

import { InvitationEmail } from "@/components/email/invitation-email";
import { env } from "@/env.mjs";
import { getIpAddress } from "@/lib/get-ip-address";
import { paths } from "@/routes/paths";

import { ratelimit } from "../ratelimiters/ratelimiter";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const inviteRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ id: z.string().nullable() }))
    .query(async ({ ctx, input }) => {
      await ratelimit({
        enabled: env.VERCEL_ENV === "production",
        key: getIpAddress(ctx.headers),
      });

      if (!input.id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invite ID required",
        });
      }

      return await ctx.db.invite.findFirst({
        where: {
          id: input.id,
        },
      });
    }),
  list: publicProcedure
    .input(z.object({ eventId: z.string() }))
    .query(async ({ ctx, input }) => {
      if (!input.eventId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Event ID required",
        });
      }

      return await ctx.db.invite.findMany({
        where: {
          eventId: input.eventId,
        },
      });
    }),
  updateStatus: publicProcedure
    .input(z.object({ id: z.string(), status: z.nativeEnum(InviteStatus) }))
    .mutation(async ({ ctx, input }) => {
      await ratelimit({
        enabled: env.VERCEL_ENV === "production",
        key: getIpAddress(ctx.headers),
      });

      return await ctx.db.invite.update({
        where: {
          id: input.id,
        },
        data: {
          status: input.status,
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
      await ratelimit({
        enabled: env.VERCEL_ENV === "production",
        key: ctx.session.user.id,
      });

      const { eventId, emails, customMessage } = input;

      const baseUrl = `${env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}${paths.event.landing.root(input.eventId)}`;
      const logo = `${env.NEXT_PUBLIC_AWS_CLOUDFRONT_DOMAIN}/assets/logo.png`;

      const res = await ctx.db.invite.createMany({
        data: emails.map((email) => ({
          eventId,
          email,
          message: customMessage,
          status: "PENDING",
        })),
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

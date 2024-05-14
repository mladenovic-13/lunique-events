import * as z from "zod";

import { InvitationEmail } from "@/components/email/invitation-email";
import { env } from "@/env.mjs";
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
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.resend.emails.send({
        from: `Lunique Tech <${env.EMAIL_FROM}>`,
        to: input.emails,
        subject: "You Are Invited",
        react: InvitationEmail(),
      });
    }),
});

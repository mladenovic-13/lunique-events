import * as z from "zod";

import { env } from "@/env.mjs";
import { getIpAddress } from "@/lib/get-ip-address";
import { registrationSchema } from "@/validation/register-guest";

import { ratelimit } from "../ratelimiters/ratelimiter";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const guestsRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      registrationSchema.extend({
        eventId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ratelimit({
        enabled: env.VERCEL_ENV === "production",
        key: getIpAddress(ctx.headers),
      });

      return await ctx.db.guest.create({
        data: {
          event: {
            connect: {
              id: input.eventId,
            },
          },
          user: ctx.session?.user.id
            ? { connect: { id: ctx.session.user.id } }
            : undefined,
          email: input.email,
          name: input.name,
          website: input.website,
          linkedIn: input.linkedIn,
        },
      });
    }),
  list: protectedProcedure
    .input(
      z.object({
        eventId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      await ratelimit({
        enabled: env.VERCEL_ENV === "production",
        key: ctx.session.user.id,
      });

      return await ctx.db.guest.findMany({
        where: {
          eventId: input.eventId,
        },
      });
    }),
  getByEmail: publicProcedure
    .input(
      z.object({
        email: z.string(),
        eventId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      await ratelimit({
        enabled: env.VERCEL_ENV === "production",
        key: getIpAddress(ctx.headers),
      });

      return await ctx.db.guest.findFirst({
        where: {
          eventId: input.eventId,
          email: input.email,
        },
      });
    }),
});

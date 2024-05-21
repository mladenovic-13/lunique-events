import * as z from "zod";

import { registrationSchema } from "@/validation/register-guest";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const guestsRouter = createTRPCRouter({
  create: publicProcedure
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
      return await ctx.db.guest.findMany({
        where: {
          eventId: input.eventId,
        },
      });
    }),
});

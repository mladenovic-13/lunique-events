import * as z from "zod";

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

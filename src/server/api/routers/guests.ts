import * as z from "zod";

import { registrationSchema } from "@/validation/register-guest";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

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
          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });

      return null;
    }),
});

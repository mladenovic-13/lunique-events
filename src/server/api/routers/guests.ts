import * as z from "zod";

import { registrationSchema } from "@/validation/register-guest";

import { createTRPCRouter, publicProcedure } from "../trpc";

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
          Event: {
            connect: {
              id: input.eventId,
            },
          },
          name: input.name,
          email: input.email,
        },
      });

      return null;
    }),
});

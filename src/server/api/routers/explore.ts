import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const exploreRouter = createTRPCRouter({
  list: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(20).nullish(),
        cursor: z.string().nullish(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 50;
      const { cursor } = input;
      const events = await ctx.db.event.findMany({
        take: limit + 1,
        where: {
          isPublic: true,
        },
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          createdAt: "desc",
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (events.length > limit) {
        const nextItem = events.pop();
        nextCursor = nextItem!.id;
      }

      return {
        events,
        nextCursor,
      };
    }),
  featured: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(20).nullish(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const limit = input.limit ?? 20;
      const events = await ctx.db.event.findMany({
        take: limit + 1,
        where: {
          AND: {
            isPublic: true,
            featured: true,
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      if (!events)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Events not found",
        });

      return events;
    }),
});

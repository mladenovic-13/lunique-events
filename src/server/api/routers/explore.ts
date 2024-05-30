import { z } from "zod";

import { env } from "@/env.mjs";
import { getIpAddress } from "@/lib/get-ip-address";

import { ratelimit } from "../ratelimiters/ratelimiter";
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
      await ratelimit({
        enabled: env.VERCEL_ENV === "production",
        key: getIpAddress(ctx.headers),
      });

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
});

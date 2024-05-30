import { z } from "zod";

import { organizationSchema } from "@/app/organization/create/_components/validation";
import { env } from "@/env.mjs";
import { getIpAddress } from "@/lib/get-ip-address";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

import { ratelimit } from "../ratelimiters/ratelimiter";

export const organizationRouter = createTRPCRouter({
  create: protectedProcedure
    .input(organizationSchema)
    .mutation(async ({ ctx, input }) => {
      await ratelimit({
        enabled: env.VERCEL_ENV === "production",
        key: ctx.session.user.id,
      });

      return await ctx.db.organization.create({
        data: {
          isPersonal: false,
          name: input.name,
          description: input.description,
          slug: input.slug,
          coverUrl: input.coverImageUrl,
          thumbnailUrl: input.thumbnailImageUrl,
          owner: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });
    }),
  list: protectedProcedure.query(async ({ ctx }) => {
    await ratelimit({
      enabled: env.VERCEL_ENV === "production",
      key: ctx.session.user.id,
    });

    return await ctx.db.organization.findMany({
      where: {
        ownerId: ctx.session.user.id,
      },
      include: {
        owner: {
          select: {
            name: true,
          },
        },
      },
    });
  }),
  get: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        timeframe: z.string().nullish(),
      }),
    )
    .query(async ({ ctx, input }) => {
      await ratelimit({
        enabled: env.VERCEL_ENV === "production",
        key: ctx.session.user.id,
      });

      return await ctx.db.organization.findFirst({
        where: {
          AND: {
            ownerId: ctx.session.user.id,

            id: input.id,
          },
        },
        include: {
          events: {
            include: {
              location: true,
              guests: true,
              creator: true,
            },
            where: {
              date: {
                gt: input.timeframe === "upcoming" ? new Date() : undefined,
                lte: input.timeframe === "past" ? new Date() : undefined,
              },
            },
          },
          members: true,
        },
      });
    }),
  getName: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      await ratelimit({
        enabled: env.VERCEL_ENV === "production",
        key: getIpAddress(ctx.headers),
      });

      return await ctx.db.organization.findFirst({
        where: {
          id: input.id,
        },
        select: {
          name: true,
        },
      });
    }),
});

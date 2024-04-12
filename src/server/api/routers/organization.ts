import { z } from "zod";

import { organizationSchema } from "@/app/organization/create/_components/validation";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const organizationRouter = createTRPCRouter({
  create: protectedProcedure
    .input(organizationSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.organization.create({
        data: {
          isPersonal: false,
          name: input.name,
          description: input.description,
          slug: input.slug,
          theme: input.theme,
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
    return await ctx.db.organization.findMany({
      where: {
        ownerId: ctx.session.user.id,
      },
    });
  }),
  get: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        eventTimeFrame: z.enum(["past", "upcoming"]).nullish(),
      }),
    )
    .query(async ({ ctx, input }) => {
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
              startDate: {
                gt:
                  input.eventTimeFrame === "upcoming" ? new Date() : undefined,
                lte: input.eventTimeFrame === "past" ? new Date() : undefined,
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

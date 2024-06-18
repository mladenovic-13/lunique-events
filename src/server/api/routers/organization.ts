import { TRPCError } from "@trpc/server";
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
          owner: true,
        },
      });
    }),
  getOne: protectedProcedure
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
          id: input.id,
        },
        include: {
          members: true,
          owner: true,
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
  addAdmin: protectedProcedure
    .input(
      z.object({
        email: z.string().email(),
        organizationId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const organization = await ctx.db.organization.findFirst({
        where: {
          id: input.organizationId,
        },
        include: {
          members: {
            select: {
              id: true,
              email: true,
            },
          },
        },
      });
      if (!organization) {
        throw new TRPCError({
          message: "Organization with provided id doesn't exist",
          code: "NOT_FOUND",
        });
      }

      const user = await ctx.db.user.findFirst({
        where: {
          email: input.email,
        },
      });

      if (!user) {
        throw new TRPCError({
          message: "User with provided email doesn't exist",
          code: "NOT_FOUND",
        });
      }

      if (organization.ownerId === user.id) {
        throw new TRPCError({
          message: "User is owner of this organization",
          code: "BAD_REQUEST",
        });
      }

      if (organization.members.map((m) => m.email).includes(input.email)) {
        throw new TRPCError({
          message: "User is already admin",
          code: "BAD_REQUEST",
        });
      }
      if (
        !organization.members.map((m) => m.id).includes(ctx.session.user.id) &&
        organization.ownerId !== ctx.session.user.id
      ) {
        throw new TRPCError({
          message:
            "The user does not have permission to add new administrators because the user is not an admin of this organization.",
          code: "BAD_REQUEST",
        });
      }

      return await ctx.db.organization.update({
        where: {
          id: input.organizationId,
        },
        data: {
          members: {
            connect: {
              id: user.id,
            },
          },
        },
      });
    }),
  listAdminOf: protectedProcedure.query(async ({ ctx }) => {
    await ratelimit({
      enabled: env.VERCEL_ENV === "production",
      key: ctx.session.user.id,
    });

    const user = await ctx.db.user.findFirst({
      where: {
        id: ctx.session.user.id,
      },
      select: {
        memberOfOrganizations: true,
      },
    });

    if (!user) {
      throw new TRPCError({
        message: "User doesn't exist",
        code: "BAD_REQUEST",
      });
    }

    return user.memberOfOrganizations;
  }),
  listAdmins: protectedProcedure
    .input(
      z.object({
        organizationId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const organization = await ctx.db.organization.findFirst({
        where: {
          id: input.organizationId,
        },
        include: {
          members: true,
        },
      });

      if (!organization) {
        throw new TRPCError({
          message: "Organization with provided id doesn't exist",
          code: "NOT_FOUND",
        });
      }

      if (!organization.members) {
        throw new TRPCError({
          message: "Organization does't have any other admins except owner",
          code: "NOT_FOUND",
        });
      }

      return organization.members;
    }),
  removeAdmin: protectedProcedure
    .input(
      z.object({
        organizationId: z.string(),
        adminId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const organization = await ctx.db.organization.findFirst({
        where: {
          id: input.organizationId,
        },
        include: {
          members: {
            select: {
              id: true,
              email: true,
            },
          },
        },
      });
      if (!organization) {
        throw new TRPCError({
          message: "Organization with provided id doesn't exist",
          code: "NOT_FOUND",
        });
      }

      const user = await ctx.db.user.findFirst({
        where: {
          id: input.adminId,
        },
      });

      if (!user) {
        throw new TRPCError({
          message: "Admin doesn't exist",
          code: "NOT_FOUND",
        });
      }

      if (organization.ownerId === user.id) {
        throw new TRPCError({
          message: "This admin is owner of this organization",
          code: "BAD_REQUEST",
        });
      }

      if (!organization.members.map((m) => m.id).includes(input.adminId)) {
        throw new TRPCError({
          message: "This admin doesn't belong to this organization",
          code: "BAD_REQUEST",
        });
      }

      if (organization.ownerId !== ctx.session.user.id) {
        throw new TRPCError({
          message:
            "You aren't owner of this organization and don't have permission for removing admins",
          code: "UNAUTHORIZED",
        });
      }

      return await ctx.db.organization.update({
        where: {
          id: input.organizationId,
        },
        data: {
          members: {
            disconnect: {
              id: input.adminId,
            },
          },
        },
      });
    }),
});

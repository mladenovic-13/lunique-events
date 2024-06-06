import { type Location } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { env } from "process";
import { z } from "zod";

import { getIpAddress } from "@/lib/get-ip-address";
import {
  createEventSchema,
  eventRegistrationSchema,
  updateEventSchema,
} from "@/lib/validation";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

import { ratelimit } from "../ratelimiters/ratelimiter";

export const eventRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createEventSchema)
    .mutation(async ({ ctx, input }) => {
      await ratelimit({
        enabled: env.VERCEL_ENV === "production",
        key: ctx.session.user.id,
      });

      let organization = null;

      if (input.organization) {
        organization = await ctx.db.organization.findFirst({
          where: {
            ownerId: ctx.session.user.id,
            id: input.organization,
          },
        });
      } else {
        organization = await ctx.db.organization.findFirst({
          where: {
            AND: {
              ownerId: ctx.session.user.id,
              isPersonal: true,
            },
          },
          select: {
            id: true,
          },
        });
      }

      if (!organization)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Organization not found",
        });

      const queryString = `
        INSERT INTO "Location" ("id", "placeId", "description", "secondaryText", "geom", "mainText", "lat", "lng")
        VALUES (uuid_generate_v4(), $1, $2, $3, st_point($4,$5), $6, $7, $8)
        RETURNING id;
      `;

      const args = [
        input.location?.placeId,
        input.location?.description,
        input.location?.secondaryText,
        input.location?.position.lat,
        input.location?.position.lng,
        input.location?.mainText,
        input.location?.position.lat,
        input.location?.position.lng,
      ];

      const location = await ctx.db.$queryRawUnsafe<Location[]>(
        queryString,
        ...args,
      );

      if (!location?.[0]?.id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Failed to create location",
        });
      }

      const locationId = location[0].id;

      return await ctx.db.event.create({
        data: {
          creator: {
            connect: {
              id: ctx.session.user.id,
            },
          },
          organization: {
            connect: {
              id: organization.id,
            },
          },
          location: {
            connect: {
              id: locationId,
            },
          },
          registrationSettings: { create: {} },
          thumbnailUrl: input.thumbnailUrl ?? "",
          name: input.name,
          description: input.description,
          isPublic: input.public,
          date: input.date,
          timezone: input.timezone,
        },
      });
    }),
  getRegistration: publicProcedure
    .input(z.object({ eventId: z.string() }))
    .query(async ({ ctx, input }) => {
      await ratelimit({
        enabled: env.VERCEL_ENV === "production",
        key: getIpAddress(ctx.headers),
      });

      return await ctx.db.registrationSettings.findUnique({
        where: {
          eventId: input.eventId,
        },
        include: {
          questions: true,
        },
      });
    }),
  updateRegisrationRules: protectedProcedure
    .input(eventRegistrationSchema.extend({ eventId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ratelimit({
        enabled: env.VERCEL_ENV === "production",
        key: ctx.session.user.id,
      });

      return await ctx.db.registrationSettings.update({
        where: {
          eventId: input.eventId,
        },
        data: {
          questions: {
            createMany: {
              data: input.questions.map((q) => ({ question: q })),
            },
          },

          capacity: input.capacity ? input.capacityValue : undefined,
          name: input.name,
          linkedIn: input.linkedIn,
          waitlist: input.capacityWaitlist,
          website: input.website,
        },
      });
    }),
  update: protectedProcedure
    .input(
      z.object({
        eventId: z.string(),
        // eventUpdateSchema: eventSchema,
        data: updateEventSchema,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ratelimit({
        enabled: env.VERCEL_ENV === "production",
        key: ctx.session.user.id,
      });

      let organization = null;

      if (input.data.organization) {
        organization = await ctx.db.organization.findFirst({
          where: {
            ownerId: ctx.session.user.id,
            id: input.data.organization,
          },
        });
      } else {
        organization = await ctx.db.organization.findFirst({
          where: {
            AND: {
              ownerId: ctx.session.user.id,
              isPersonal: true,
            },
          },
          select: {
            id: true,
          },
        });
      }

      if (!organization)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Organization not found",
        });

      return ctx.db.event.update({
        where: {
          id: input.eventId,
        },
        data: {
          isPublic: input.data.public,
          name: input.data.name,
          date: input.data.date,
          timezone: input.data.timezone,
          description: input.data.description,

          organization: {
            connect: {
              id: organization.id,
            },
          },
          location: {
            update: {
              data: {
                description: input.data.location?.description,
                mainText: input.data.location?.mainText,
                secondaryText: input.data.location?.secondaryText,
                placeId: input.data.location?.placeId,
                lng: input.data.location?.position.lng,
                lat: input.data.location?.position.lat,
              },
            },
          },
          registrationSettings: {
            update: {
              data: {
                capacity: input.data.capacity ? input.data.capacityValue : null,
                waitlist: input.data.capacityWaitlist,
                name: input.data.userName,
                linkedIn: input.data.userLinkedIn,
                website: input.data.userWebsite,
              },
            },
          },
        },
      });
    }),
  updateThumbnail: protectedProcedure
    .input(
      z.object({
        eventId: z.string(),
        thumbnailURL: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.event.update({
        where: {
          id: input.eventId,
        },
        data: {
          thumbnailUrl: input.thumbnailURL,
        },
      });
    }),
  list: protectedProcedure
    .input(
      z.object({
        timeframe: z.string().nullish(),
        organizationId: z.string().nullish(),
      }),
    )
    .query(async ({ ctx, input }) => {
      await ratelimit({
        enabled: env.VERCEL_ENV === "production",
        key: ctx.session.user.id,
      });

      return await ctx.db.event.findMany({
        where: {
          organization: {
            id: input.organizationId ?? undefined,
            ownerId: ctx.session.user.id,
          },
          date: {
            gt: input.timeframe === "upcoming" ? new Date() : undefined,
            lte: input.timeframe === "past" ? new Date() : undefined,
          },
        },
        include: {
          organization: {
            select: {
              owner: {
                select: {
                  name: true,
                },
              },
            },
          },
          guests: {
            select: {
              email: true,
            },
          },
          creator: {
            select: {
              name: true,
            },
          },
          location: {
            select: {
              description: true,
            },
          },
        },
      });
    }),
  get: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      await ratelimit({
        enabled: env.VERCEL_ENV === "production",
        key: getIpAddress(ctx.headers),
      });

      return await ctx.db.event.findFirst({
        where: {
          id: input.id,
        },
        include: {
          creator: true,
          guests: true,
          location: true,
          organization: true,
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

      return await ctx.db.event.findFirst({
        where: {
          id: input.id,
        },
        select: {
          name: true,
        },
      });
    }),
  getOverview: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      await ratelimit({
        enabled: env.VERCEL_ENV === "production",
        key: getIpAddress(ctx.headers),
      });

      return await ctx.db.event.findFirst({
        where: {
          id: input.id,
        },
        select: {
          date: true,
          location: {
            select: {
              mainText: true,
              secondaryText: true,
            },
          },
        },
      });
    }),
});

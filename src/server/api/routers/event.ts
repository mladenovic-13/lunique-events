import { DeleteObjectsCommand } from "@aws-sdk/client-s3";
import { ImageType } from "@prisma/client";
import { TRPCError } from "@trpc/server";
// import { Ratelimit } from "@upstash/ratelimit";
// import { Redis } from "@upstash/redis";
import { z } from "zod";

import { eventSchema } from "@/app/event/create/_components/validation";
import { env } from "@/env.mjs";
import { basicDetailsSchema } from "@/lib/validation";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import {
  deleteCollection,
  findImages,
  indexImage,
} from "@/server/aws/rekognition-utils";
import { deleteS3EventFolder } from "@/server/aws/s3-utils";

// const searchRatelimit = new Ratelimit({
//   redis: Redis.fromEnv(),
//   limiter: Ratelimit.slidingWindow(1, "2 m"),
//   analytics: true,
// });

// const uploadRatelimit = new Ratelimit({
//   redis: Redis.fromEnv(),
//   limiter: Ratelimit.slidingWindow(1000, "1 m"),
//   analytics: true,
// });

// const ratelimit = new Ratelimit({
//   redis: Redis.fromEnv(),
//   limiter: Ratelimit.slidingWindow(50, "1 m"),
//   analytics: true,
// });

export const eventRouter = createTRPCRouter({
  create: protectedProcedure
    .input(basicDetailsSchema)
    .mutation(async ({ ctx, input }) => {
      // TODO: implement rekognition
      // await createCollection(ctx.rekognition, event.id);

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
          thumbnailUrl: input.thumbnailUrl ?? "",
          name: input.name,
          description: input.description,
          isPublic: input.public,
          // startDate: input.startDateTime.date,
          // startTime: input.startDateTime.time,
          // endDate: input.endDateTime.date,
          // endTime: input.endDateTime.time,
          // requireApproval: input.requireApproval,
          // tickets: input.tickets,
          // capacityValue: input.capacity.value,
          // capacityWaitlist: input.capacity.waitlist,
          // location: input.location
          //   ? {
          //       create: {
          //         placeId: input.location.placeId,
          //         description: input.location.description,
          //         mainText: input.location.mainText,
          //         secondaryText: input.location.secondaryText,
          //         lat: input.location.position.lat,
          //         lng: input.location.position.lng,
          //       },
          //     }
          //   : undefined,
          // timezone: {
          //   create: {
          //     city: input.timezone.city,
          //     label: input.timezone.label,
          //     value: input.timezone.value,
          //   },
          // },
        },
      });
    }),
  update: protectedProcedure
    .input(
      z.object({
        eventId: z.string(),
        // eventUpdateSchema: eventSchema,
        eventSchema: eventSchema,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      let organization = null;

      if (input.eventSchema.organization) {
        organization = await ctx.db.organization.findFirst({
          where: {
            ownerId: ctx.session.user.id,
            id: input.eventSchema.organization,
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
          name: input.eventSchema.name,
          startDate: input.eventSchema.startDate,
          endDate: input.eventSchema.endDate,
          description: input.eventSchema.description,
          capacityValue: input.eventSchema.capacity.value,
          capacityWaitlist: input.eventSchema.capacity.waitlist,
          isPublic: input.eventSchema.public,
          requireApproval: input.eventSchema.requireApproval,
          organization: {
            connect: {
              id: organization.id,
            },
          },
          location: {
            update: {
              data: {
                description: input.eventSchema.location?.description,
                mainText: input.eventSchema.location?.mainText,
                secondaryText: input.eventSchema.location?.secondaryText,
                placeId: input.eventSchema.location?.placeId,
                lng: input.eventSchema.location?.position.lng,
                lat: input.eventSchema.location?.position.lat,
              },
            },
          },
          timezone: {
            update: {
              data: {
                city: input.eventSchema.timezone.city,
                label: input.eventSchema.timezone.label,
                value: input.eventSchema.timezone.value,
              },
            },
          },
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
      // const { success } = await ratelimit.limit(ctx.session.user.id);
      // if (!success) {
      //   throw new TRPCError({ code: "TOO_MANY_REQUESTS" });
      // }

      return await ctx.db.event.findMany({
        where: {
          organization: {
            id: input.organizationId ?? undefined,
            ownerId: ctx.session.user.id,
          },
          startDate: {
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
      // const { success } = await ratelimit.limit(input.id);
      // if (!success) {
      //   throw new TRPCError({ code: "TOO_MANY_REQUESTS" });
      // }

      return await ctx.db.event.findFirst({
        where: {
          id: input.id,
        },
        include: {
          creator: true,
          guests: true,
          location: true,
          organization: true,
          timezone: true,
        },
      });
    }),
  getName: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
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
      return await ctx.db.event.findFirst({
        where: {
          id: input.id,
        },
        select: {
          startDate: true,
          endDate: true,
          location: {
            select: {
              mainText: true,
              secondaryText: true,
            },
          },
        },
      });
    }),

  // settings: protectedProcedure
  //   .input(z.object({ id: z.string() }))
  //   .query(async ({ ctx, input }) => {
  //     const { success } = await ratelimit.limit(ctx.session.user.id);
  //     if (!success) {
  //       throw new TRPCError({ code: "TOO_MANY_REQUESTS" });
  //     }

  //     return await ctx.db.eventSettings.findUnique({
  //       where: { eventId: input.id },
  //       include: { event: true },
  //     });
  //   }),
  // updateSettings: protectedProcedure
  //   .input(
  //     eventSettingsSchema.partial().extend({
  //       id: z.string(),
  //     }),
  //   )
  //   .mutation(async ({ ctx, input }) => {
  //     const { success } = await ratelimit.limit(ctx.session.user.id);
  //     if (!success) {
  //       throw new TRPCError({ code: "TOO_MANY_REQUESTS" });
  //     }

  //     return await ctx.db.event.update({
  //       where: {
  //         id: input.id,
  //         ownerId: ctx.session.user.id,
  //       },
  //       data: {
  //         eventSettings: {
  //           update: {
  //             isPublic: input.isPublic,
  //             isWatermarkHidden: input.isWatermarkHidden,
  //           },
  //         },
  //       },
  //     });
  //   }),

  getImages: publicProcedure
    .input(
      z.object({
        eventId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { eventId } = input;

      // const { success } = await ratelimit.limit(eventId);
      // if (!success) {
      //   throw new TRPCError({ code: "TOO_MANY_REQUESTS" });
      // }

      const images = await ctx.db.image.findMany({
        where: {
          eventId: eventId,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return images;
    }),
  addImages: protectedProcedure
    .input(
      z.object({
        eventId: z.string(),
        images: z.array(
          z.object({
            key: z.string(),
            name: z.string(),
            type: z.enum([ImageType.JPG, ImageType.PNG]),
          }),
        ),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      // const { success } = await ratelimit.limit(ctx.session.user.id);
      // if (!success) {
      //   throw new TRPCError({ code: "TOO_MANY_REQUESTS" });
      // }

      const { images, eventId } = input;

      const data = images.map((image) => ({
        key: image.key,
        eventId,
        name: image.name,
        url: `${env.NEXT_PUBLIC_AWS_CLOUDFRONT_DOMAIN}/${image.key}`,
        type: image.type,
      }));

      return await ctx.db.image.createMany({
        data,
      });
    }),
  deleteImages: protectedProcedure
    .input(
      z.object({
        images: z
          .object({
            id: z.string(),
            key: z.string(),
          })
          .array(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // const { success } = await ratelimit.limit(ctx.session.user.id);
      // if (!success) {
      //   throw new TRPCError({ code: "TOO_MANY_REQUESTS" });
      // }

      const { images } = input;

      if (images.length === 0)
        throw new TRPCError({ message: "No image IDs", code: "BAD_REQUEST" });

      return await ctx.db.$transaction(async (tx) => {
        const deleteObjectsCommand = new DeleteObjectsCommand({
          Bucket: env.BUCKET_NAME,
          Delete: { Objects: images.map((img) => ({ Key: img.key })) },
        });

        const res = await tx.image.deleteMany({
          where: {
            id: {
              in: images.map((img) => img.id),
            },
          },
        });

        const s3Res = await ctx.s3.send(deleteObjectsCommand);

        if (s3Res.$metadata.httpStatusCode !== 200) {
          throw new TRPCError({
            message: "Failed to delete S3 objects",
            code: "INTERNAL_SERVER_ERROR",
          });
        }

        return res;
      });
    }),
  // TODO:
  // Move to addImages procedure because it's
  // easier to undu S3 upload if image indexing fails
  indexImage: protectedProcedure
    .input(
      z.object({
        eventId: z.string(),
        imageKey: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { imageKey, eventId } = input;

      const data = await indexImage(ctx.rekognition, eventId, imageKey);

      return await ctx.db.face.createMany({
        data,
      });
    }),
  checkAndUpdateLimit: protectedProcedure
    .input(z.object({ count: z.number() }))
    .mutation(async ({ ctx, input }) => {
      // const { success } = await uploadRatelimit.limit(ctx.session.user.id);
      // if (!success) {
      //   throw new TRPCError({ code: "TOO_MANY_REQUESTS" });
      // }

      const user = await ctx.db.user.findUnique({
        where: {
          id: ctx.session.user.id,
        },
        select: {
          limit: true,
        },
      });

      if (!user) {
        throw new TRPCError({
          message: "User not found",
          code: "NOT_FOUND",
        });
      }

      if (user.limit < input.count) {
        return false;
      }

      const limit = await ctx.db.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: { limit: user.limit - input.count },
      });

      if (!limit) {
        throw new TRPCError({
          message: "Failed to update limit",
          code: "INTERNAL_SERVER_ERROR",
        });
      }

      return true;
    }),
  findImages: protectedProcedure
    .input(z.object({ eventId: z.string(), imageKey: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { imageKey, eventId } = input;

      // const { success } = await searchRatelimit.limit(eventId);
      // if (!success) {
      //   throw new TRPCError({ code: "TOO_MANY_REQUESTS" });
      // }

      return await findImages(ctx.db, ctx.rekognition, eventId, imageKey);
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      // const { success } = await ratelimit.limit(ctx.session.user.id);
      // if (!success) {
      //   throw new TRPCError({ code: "TOO_MANY_REQUESTS" });
      // }

      const { id } = input;

      await deleteCollection(ctx.rekognition, id);
      await deleteS3EventFolder(ctx.s3, ctx.session.user.id, id);

      return await ctx.db.event.delete({
        where: {
          organization: {
            ownerId: ctx.session.user.id,
          },
          id: input.id,
        },
      });
    }),
});

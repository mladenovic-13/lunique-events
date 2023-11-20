import { z } from "zod";
import { env } from "@/env.mjs";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { TRPCError } from "@trpc/server";

export const s3Router = createTRPCRouter({
  getEventImages: protectedProcedure
    .input(
      z.object({
        userId: z.string().optional(),
        eventId: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      if (!input.userId || !input.eventId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Please provide user ID and event ID.",
        });
      }

      const { s3 } = ctx;
      const { userId, eventId } = input;

      const listObjectsOutput = await s3.listObjectsV2({
        Bucket: env.BUCKET_NAME,
        Prefix: `user-${userId}/event-${eventId}/`,
      });

      if (!listObjectsOutput.Contents) return [];

      const urls = await Promise.all(
        listObjectsOutput.Contents.map((item) =>
          getSignedUrl(
            s3,
            new GetObjectCommand({
              Bucket: env.BUCKET_NAME,
              Key: item.Key,
            }),
          ),
        ),
      );

      return urls;
    }),
  getPresignedUrl: protectedProcedure
    .input(z.object({ key: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { s3 } = ctx;
      const { key } = input;

      const putObjectCommand = new PutObjectCommand({
        Bucket: env.BUCKET_NAME,
        Key: key,
      });

      return await getSignedUrl(s3, putObjectCommand);
    }),
});

import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  CreateCollectionCommand,
  DeleteCollectionCommand,
  IndexFacesCommand,
} from "@aws-sdk/client-rekognition";
import { env } from "@/env.mjs";
import { TRPCError } from "@trpc/server";

export const rekognitionRouter = createTRPCRouter({
  index: protectedProcedure
    .input(z.object({ eventId: z.string(), imageKey: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { imageKey, eventId } = input;

      const face = await ctx.db.face.findFirst({ where: { eventId } });

      if (!face) {
        const createCollectionCommand = new CreateCollectionCommand({
          CollectionId: eventId,
        });

        const collectionRes = await ctx.rekognition.send(
          createCollectionCommand,
        );
        console.log("[COLLECTION_RES]", collectionRes);
      }

      const indexFacesCommand = new IndexFacesCommand({
        CollectionId: eventId,
        Image: {
          S3Object: {
            Bucket: env.BUCKET_NAME,
            Name: imageKey,
          },
        },
      });

      const indexRes = await ctx.rekognition.send(indexFacesCommand);

      console.log("[INDEX_RES]", indexRes);

      // TODO: figure out what happen when there are no faces on image

      if (indexRes.$metadata.httpStatusCode !== 200) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Failed to index image",
        });
      }

      if (!indexRes.FaceRecords) {
        return { count: 0 };
      }

      const faces = indexRes.FaceRecords.filter(
        (record) =>
          !!record.Face && !!record.Face.FaceId && !!record.Face.ImageId,
      );

      const facesData = faces.map((record) => ({
        indexedFaceId: record.Face!.FaceId ?? "",
        indexedImageId: record.Face!.ImageId ?? "",
        imageKey: imageKey,
        eventId: eventId,
      }));

      return await ctx.db.face.createMany({
        data: facesData,
      });
    }),
  deleteCollection: protectedProcedure
    .input(z.object({ eventId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { eventId } = input;

      const deleteCollectionCommand = new DeleteCollectionCommand({
        CollectionId: eventId,
      });
      const response = await ctx.rekognition.send(deleteCollectionCommand);

      console.log("[REKOGNITION_DELETE_COLLECTION]", response);

      if (response.StatusCode !== 200) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Collection does not exist or AWS error",
        });
      }

      return response.$metadata;
    }),
});

import { z } from "zod";
import { env } from "@/env.mjs";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const s3Router = createTRPCRouter({
  getObjects: protectedProcedure.query(async ({ ctx }) => {
    const { s3 } = ctx;

    const listObjectsOutput = await s3.listObjectsV2({
      Bucket: env.BUCKET_NAME,
      Prefix: "user-cloon5jd60000uhn2nlvvslpv/event-clovhrzbq0008uh99pfgpg43w/",
    });

    // const url = await getSignedUrl(
    //   s3,
    //   new GetObjectCommand({
    //     Bucket: env.BUCKET_NAME,
    //     Key: "user-cloon5jd60000uhn2nlvvslpv/event-clovhrzbq0008uh99pfgpg43w/15-25-4-4.jpeg",
    //   }),
    // );

    // console.log({ url });

    return listObjectsOutput.Contents ?? [];
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

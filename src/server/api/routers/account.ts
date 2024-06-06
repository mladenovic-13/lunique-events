import { env } from "@/env.mjs";
import { accountInfoSchema } from "@/validation/account-info";

import { ratelimit } from "../ratelimiters/ratelimiter";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const accountRouter = createTRPCRouter({
  get: protectedProcedure.query(async ({ ctx }) => {
    await ratelimit({
      enabled: env.VERCEL_ENV === "production",
      key: ctx.session.user.id,
    });

    return await ctx.db.user.findFirst({
      where: {
        id: ctx.session.user.id,
      },
      select: {
        name: true,
        image: true,
        bio: true,
        socialLinks: true,
      },
    });
  }),
  update: protectedProcedure
    .input(accountInfoSchema)
    .mutation(async ({ ctx, input }) => {
      await ratelimit({
        enabled: env.VERCEL_ENV === "production",
        key: ctx.session.user.id,
      });

      return await ctx.db.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          bio: input.bio,
          name: input.name,
          image: input.profileImageUrl,
          socialLinks: {
            upsert: {
              where: {
                userId: ctx.session.user.id,
              },
              update: {
                linkedin: input.linkedinUrl,
                twitter: input.xUrl,
                website: input.websiteUrl,
                youtue: input.youtubeUrl,
              },
              create: {
                linkedin: input.linkedinUrl,
                twitter: input.xUrl,
                website: input.websiteUrl,
                youtue: input.youtubeUrl,
              },
            },
          },
        },
      });
    }),
});

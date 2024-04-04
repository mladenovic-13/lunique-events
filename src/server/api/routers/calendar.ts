import { calendarSchema } from "@/app/calendar/create/_components/validation";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const calendarRouter = createTRPCRouter({
  create: protectedProcedure
    .input(calendarSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.calendar.create({
        data: {
          name: input.name,
          description: input.description,
          slug: input.slug,
          theme: input.theme,
          coverUrl: input.coverImageUrl,
          thumbnailUrl: input.thumbnailImageUrl,
          location: input.location
            ? {
                create: {
                  placeId: input.location.placeId,
                  description: input.location.placeId,
                  lat: input.location.position.lat,
                  lng: input.location.position.lng,
                  mainText: input.location.mainText,
                  secondaryText: input.location.secondaryText,
                },
              }
            : undefined,
        },
      });
    }),
});

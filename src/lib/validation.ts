import { Theme } from "@prisma/client";
import * as z from "zod";

export const validatePhotoId = (photoId: string | null, length: number) => {
  if (!photoId) return null;

  const photoIdSchema = z
    .number()
    .min(0)
    .max(length - 1);
  const parse = photoIdSchema.safeParse(parseInt(photoId));

  return parse.success;
};

export const themeNameSchema = z.nativeEnum(Theme);

export const locationSchema = z.object({
  placeId: z.string(),
  description: z.string(),
  mainText: z.string(),
  secondaryText: z.string(),
  position: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
});

// EVENT
export const basicDetailsSchema = z.object({
  name: z.string(),
  description: z.string(),
  thumbnailUrl: z.string(),
  organization: z.string(),
  public: z.boolean(),
});

export type EventBasicDetails = z.infer<typeof basicDetailsSchema>;

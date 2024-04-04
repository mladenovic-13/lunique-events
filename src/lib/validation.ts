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

export const themeNameSchema = z.enum([
  "zinc",
  "slate",
  "stone",
  "gray",
  "neutral",
  "red",
  "rose",
  "orange",
  "green",
  "blue",
  "yellow",
  "violet",
]);

export const locationSchema = z.object({
  placeId: z.string(),
  descripton: z.string(),
  mainText: z.string(),
  secondaryText: z.string(),
  position: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
});

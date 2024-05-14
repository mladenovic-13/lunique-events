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

// EVENT
export const locationSchema = z.object({
  placeId: z.string(),
  mainText: z.string(),
  secondaryText: z.string(),
  description: z.string(),
  position: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
});
export const basicDetailsSchema = z.object({
  name: z.string().min(1, "Please enter event name"),
  description: z.string(),
  thumbnailUrl: z.string(),
  organization: z.string(),
  public: z.boolean(),
  date: z.string(),
  timezone: z.string(),
  location: locationSchema.nullable(),
});

export type EventBasicDetails = z.infer<typeof basicDetailsSchema>;

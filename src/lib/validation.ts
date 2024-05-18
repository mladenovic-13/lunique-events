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

export const createEventSchema = z.object({
  name: z.string().min(1, "Please enter event name"),
  description: z.string(),
  thumbnailUrl: z.string(),
  organization: z.string(),
  public: z.boolean(),
  date: z.string(),
  timezone: z.string(),
  location: locationSchema.nullable(),
});

export const contactFormSchema = z.object({
  fullname: z
    .string()
    .min(5, { message: "Full name must be at least 5 characters." }),
  email: z.string().email(),
  message: z.string().min(10),
});

export type EventBasicDetails = z.infer<typeof createEventSchema>;

export const eventRegistrationSchema = z.object({
  requireApproval: z.boolean(),
  capacity: z.boolean(),
  capacityValue: z.number().optional(),
  capacityWaitlist: z.boolean(),
  name: z.boolean(),
  email: z.boolean(),
  website: z.boolean(),
  linkedIn: z.boolean(),
  questions: z
    .string()
    .max(50, "Question can contain max 50 characters")
    .array()
    .max(3, "You can have maximum of 3 custom questions"),
});

export type EventRegistration = z.infer<typeof eventRegistrationSchema>;

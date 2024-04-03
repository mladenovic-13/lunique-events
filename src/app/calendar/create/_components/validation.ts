import * as z from "zod";

import { locationSchema, themeNameSchema } from "@/lib/validation";

export const calendarSchema = z.object({
  name: z.string(),
  description: z.string(),
  theme: themeNameSchema,
  slug: z.string(),
  // null -> Global Location
  location: locationSchema.nullable(),
  imageUrl: z.string().nullable(),
  coverImageUrl: z.string().nullable(),
});

export type CalendarSchema = z.infer<typeof calendarSchema>;

export const defaultValues: CalendarSchema = {
  name: "",
  description: "",
  slug: "",
  theme: "rose",
  location: null,
  imageUrl: null,
  coverImageUrl: null,
};

import { Theme } from "@prisma/client";
import * as z from "zod";

import { themeNameSchema } from "@/lib/validation";

export const calendarSchema = z.object({
  name: z.string(),
  description: z.string(),
  theme: themeNameSchema,
  slug: z.string(),
  thumbnailImageUrl: z.string().nullable(),
  coverImageUrl: z.string().nullable(),
});

export type CalendarSchema = z.infer<typeof calendarSchema>;

export const defaultValues: CalendarSchema = {
  name: "",
  description: "",
  slug: "",
  theme: Theme.SLATE,
  thumbnailImageUrl: null,
  coverImageUrl: null,
};

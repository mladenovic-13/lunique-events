import { Theme } from "@prisma/client";
import * as z from "zod";

import { themeNameSchema } from "@/lib/validation";

export const organizationSchema = z.object({
  name: z.string(),
  description: z.string(),
  theme: themeNameSchema,
  slug: z.string(),
  thumbnailImageUrl: z.string().nullable(),
  coverImageUrl: z.string().nullable(),
});

export type OrganizationSchema = z.infer<typeof organizationSchema>;

export const defaultValues: OrganizationSchema = {
  name: "",
  description: "",
  slug: "",
  theme: Theme.SLATE,
  thumbnailImageUrl: null,
  coverImageUrl: null,
};

import * as z from "zod";

export const organizationSchema = z.object({
  name: z.string(),
  description: z.string(),
  slug: z.string(),
  thumbnailImageUrl: z.string().nullable(),
  coverImageUrl: z.string().nullable(),
});

export type OrganizationSchema = z.infer<typeof organizationSchema>;

export const defaultValues: OrganizationSchema = {
  name: "",
  description: "",
  slug: "",
  thumbnailImageUrl: null,
  coverImageUrl: null,
};

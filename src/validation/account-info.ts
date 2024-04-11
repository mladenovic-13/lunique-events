import * as z from "zod";

export const accountInfoSchema = z.object({
  name: z.string(),
  bio: z.string(),
  profileImageUrl: z.string(),
  xUrl: z.string(),
  youtubeUrl: z.string(),
  linkedinUrl: z.string(),
  websiteUrl: z.string(),
});

export type AccountInfoSchema = z.infer<typeof accountInfoSchema>;

export const defaultValues: AccountInfoSchema = {
  name: "",
  bio: "",
  linkedinUrl: "",
  xUrl: "",
  profileImageUrl: "",
  websiteUrl: "",
  youtubeUrl: "",
};

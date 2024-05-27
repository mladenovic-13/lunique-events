import * as z from "zod";

export const registrationSchema = z.object({
  email: z.string(),
  name: z.string().optional(),
  website: z.string().optional(),
  linkedIn: z.string().optional(),
  isInvited: z.boolean().optional(),
});

export type RegistrationData = z.infer<typeof registrationSchema>;

export const registrationDefaultValues: RegistrationData = {
  name: "",
  email: "",
  website: "",
  linkedIn: "",
};

import * as z from "zod";

import { timezones } from "@/lib/timezones";
import { locationSchema } from "@/lib/validation";

const timezoneSchema = z.object({
  value: z.string(),
  label: z.string(),
  city: z.string(),
});

const capacitySchema = z.object({
  value: z.number().nullable(),
  waitlist: z.boolean(),
});

export const eventSchema = z.object({
  public: z.boolean(),
  name: z.string(),
  thumbnailUrl: z.string().nullable(),
  startDate: z.date().nullable(),
  endDate: z.date().nullable(),
  timezone: timezoneSchema,
  location: locationSchema.nullish(),
  description: z.string(),
  capacity: capacitySchema,
  requireApproval: z.boolean().nullable(),
  tickets: z.boolean(),
  organization: z.string().nullable(),
});

const date = new Date();
date.setUTCHours(18);
date.setUTCMinutes(0);

const timezone =
  timezones.find((timezone) => timezone.city.toLowerCase() === "belgrade") ??
  timezones[0]!;

export const defaultValues: EventSchema = {
  organization: null,
  public: true,
  thumbnailUrl: null,
  name: "",
  description: "",
  startDate: date,
  endDate: date,
  location: null,
  timezone,
  capacity: {
    value: null,
    waitlist: false,
  },
  requireApproval: false,
  tickets: false,
};

export type EventSchema = z.infer<typeof eventSchema>;
export type Timezone = EventSchema["timezone"];

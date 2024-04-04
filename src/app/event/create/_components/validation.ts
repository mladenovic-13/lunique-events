import * as z from "zod";

import { timezones } from "@/lib/timezones";
import { locationSchema, themeNameSchema } from "@/lib/validation";

const dateTimeSchema = z.object({
  date: z.date(),
  time: z.string(),
});

const themeSchema = z.object({
  theme: themeNameSchema,
  font: z.enum([
    "Roboto",
    "Borel",
    "Limelight",
    "Mallanna",
    "Baumans",
    "Potta One",
  ]),
  mode: z.enum(["light", "dark", "system"]),
});

const timezoneSchema = z.object({
  id: z.number(),
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
  theme: themeSchema,
  startDateTime: dateTimeSchema,
  endDateTime: dateTimeSchema,
  timezone: timezoneSchema,
  location: locationSchema.nullish(),
  description: z.string(),
  capacity: capacitySchema,
  requireApproval: z.boolean(),
  tickets: z.boolean(),
});

const date = new Date();
date.setUTCHours(18);
date.setUTCMinutes(0);

const timezone =
  timezones.find((timezone) => timezone.city.toLowerCase() === "belgrade") ??
  timezones[0]!;

export const defaultValues: EventSchema = {
  public: true,
  thumbnailUrl: null,
  name: "",
  description: "",
  theme: {
    font: "Roboto",
    theme: "rose",
    mode: "system",
  },
  startDateTime: {
    date: date,
    time: "18:00",
  },
  endDateTime: {
    date: date,
    time: "20:00",
  },
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

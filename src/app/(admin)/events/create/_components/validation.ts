import * as z from "zod";

import { timezones } from "@/lib/timezones";

export const eventSchema = z.object({
  public: z.boolean(),
  name: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  timezone: z.object({
    id: z.number(),
    value: z.string(),
    label: z.string(),
    city: z.string(),
  }),
  location: z
    .object({
      placeId: z.string(),
      descripton: z.string(),
      mainText: z.string(),
      secondaryText: z.string(),
      position: z.object({
        lat: z.number(),
        lng: z.number(),
      }),
    })
    .nullish(),
  description: z.string(),
  capacity: z.object({
    value: z.number().nullable(),
    waitlist: z.boolean(),
  }),
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

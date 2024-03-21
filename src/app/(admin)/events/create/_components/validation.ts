import * as z from "zod";

import { timezones } from "@/lib/timezones";

const dateTimeSchema = z.object({
  date: z.date(),
  time: z.string(),
});

export const eventSchema = z.object({
  public: z.boolean(),
  name: z.string(),
  thumbnailUrl: z.string().nullable(),
  startDateTime: dateTimeSchema,
  endDateTime: dateTimeSchema,
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
  thumbnailUrl: null,
  name: "",
  description: "",
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

import * as z from "zod";

import { timezones } from "./event-timezone";

export const eventSchema = z.object({
  public: z.boolean(),
  name: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  // TODO
  timeZone: z.string(),
  location: z.string(),
  description: z.string(),
  capacity: z.number().nullish(),
  requireApproval: z.boolean(),
});

const date = new Date();
date.setUTCHours(18);
date.setUTCMinutes(0);

export const defaultValues: EventSchema = {
  public: true,
  name: "",
  description: "",
  startDate: date,
  endDate: date,
  location: "",
  timeZone: timezones[0]?.value ?? "Unknown",
  capacity: null,
  requireApproval: false,
};

export type EventSchema = z.infer<typeof eventSchema>;

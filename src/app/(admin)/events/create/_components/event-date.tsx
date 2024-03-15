"use client";

import { Controller, useFormContext } from "react-hook-form";
import { format } from "date-fns";
import { CircleIcon } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

import { type EventSchema } from "./validation";

export const EventDatePicker = () => {
  const methos = useFormContext<EventSchema>();

  return (
    <div className="flex-1 rounded-md bg-muted p-1">
      <div className="flex h-full justify-between ">
        <div className="flex">
          <div className="flex h-full flex-col items-center p-3 py-2.5">
            <CircleIcon className="size-3 rounded-full bg-muted-foreground/80 text-muted-foreground/80" />
            <div className="flex-1 border-r border-dashed border-muted-foreground/50" />
            <CircleIcon className="size-3 text-muted-foreground/80" />
          </div>
          <div className="flex flex-col justify-between py-1.5 font-light">
            <span className="text-sm md:text-base">Start</span>
            <span className="text-sm md:text-base">End</span>
          </div>
        </div>
        <div className="flex h-full w-44 flex-col gap-1 md:w-60">
          <Controller
            control={methos.control}
            name="startDate"
            render={({ field }) => (
              <div className="flex h-full items-center justify-between rounded-md bg-muted-foreground/20 font-light">
                <span className="px-2 py-1">Wed 6, Mar</span>
                <span className="h-full w-16 border-l-2 border-muted text-center md:w-20 ">
                  <TimePicker value={field.value} onChange={field.onChange} />
                </span>
              </div>
            )}
          />

          <div className="flex h-full items-center justify-between rounded-md bg-muted-foreground/20 font-light">
            <span className="px-2 py-1">Wed 20, Mar</span>
            <span className="h-full w-16 border-l-2 border-muted py-1 text-center md:w-20 ">
              12:30
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

interface TimePickerProps {
  value: Date;
  onChange: (date: Date) => void;
}

const TimePicker = ({ value, onChange }: TimePickerProps) => {
  const onValueChange = (_value: string) => {
    const parts = _value.split(":");
    const hours = parts[0];
    const minutes = parts[1];

    if (!hours || !minutes) return;

    const newDate = value;
    newDate.setUTCHours(parseInt(hours, 10));
    newDate.setUTCMinutes(parseInt(minutes, 10));

    onChange(newDate);
  };

  const date = new Date(
    value.valueOf() + value.getTimezoneOffset() * 60 * 1000,
  );

  const innerValue = format(date, "kk:mm");

  return (
    <Select value={innerValue} onValueChange={onValueChange}>
      <SelectTrigger
        icon={false}
        className="flex size-full items-center justify-center rounded-l-none border-none bg-transparent p-0 text-base shadow-none focus:ring-0 data-[state=open]:bg-muted-foreground/30"
      >
        {innerValue}
      </SelectTrigger>

      <SelectContent className="max-h-52 min-w-fit">
        {times.map((time, idx) => (
          <SelectItem key={idx} icon={false} value={time} className="w-fit">
            {time}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

const times = [
  "00:00",
  "00:30",
  "01:00",
  "01:30",
  "02:00",
  "02:30",
  "03:00",
  "03:30",
  "04:00",
  "04:30",
  "05:00",
  "05:30",
  "06:00",
  "06:30",
  "07:00",
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
  "23:30",
];

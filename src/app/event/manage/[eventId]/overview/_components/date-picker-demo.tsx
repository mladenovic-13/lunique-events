"use client";

import * as React from "react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DatePickerDemoProps {
  value: Date;
  onChange: (value: Date) => void;
  className?: string;
}

export function DatePickerDemo({
  value,
  onChange,
  className,
}: DatePickerDemoProps) {
  const onChangeHandler = (dateValue: Date) => {
    onChange(dateValue);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"ghost"}
          className={cn(
            "w-full justify-center border-none  text-base font-normal",
            !value && "text-muted-foreground",
            className && className,
          )}
        >
          {/* <CalendarIcon className="mr-2 size-4" /> */}
          {value ? (
            format(value, "ccc") +
            ", " +
            format(value, "d") +
            " " +
            format(value, "MMM")
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(dateValue) => {
            dateValue && onChangeHandler(dateValue);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

"use client";

import { useRef } from "react";

import { TimePickerInput } from "@/components/ui/time-picker-input";

interface TimePickerDemoProps {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
}

export function EventTimeInput({ value: date, onChange }: TimePickerDemoProps) {
  const minuteRef = useRef<HTMLInputElement>(null);
  const hourRef = useRef<HTMLInputElement>(null);
  const secondRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex gap-2">
      <TimePickerInput
        picker="hours"
        date={date}
        setDate={onChange}
        ref={hourRef}
        onRightFocus={() => minuteRef.current?.focus()}
      />
      <TimePickerInput
        picker="minutes"
        date={date}
        setDate={onChange}
        ref={minuteRef}
        onLeftFocus={() => hourRef.current?.focus()}
        onRightFocus={() => secondRef.current?.focus()}
      />
    </div>
  );
}

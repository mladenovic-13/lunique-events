"use client";

import { useRef } from "react";

import { TimePickerInput } from "@/components/ui/time-picker-input";
import { cn } from "@/lib/utils";

interface TimePickerDemoProps {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  className?: string;
}

export function EventTimeInput({
  value: date,
  onChange,
  className,
}: TimePickerDemoProps) {
  const minuteRef = useRef<HTMLInputElement>(null);
  const hourRef = useRef<HTMLInputElement>(null);
  const secondRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        <TimePickerInput
          picker="hours"
          date={date}
          setDate={onChange}
          ref={hourRef}
          onRightFocus={() => minuteRef.current?.focus()}
          className={cn(className && className)}
        />
        <p className="text-sm text-muted-foreground">h</p>
      </div>
      <div className="flex items-center gap-1">
        <TimePickerInput
          picker="minutes"
          date={date}
          setDate={onChange}
          ref={minuteRef}
          onLeftFocus={() => hourRef.current?.focus()}
          onRightFocus={() => secondRef.current?.focus()}
          className={cn(className && className)}
        />
        <p className="text-sm text-muted-foreground">min</p>
      </div>
    </div>
  );
}

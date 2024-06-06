"use client";

import { GlobeIcon, KeyIcon, LinkIcon } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { selectPrevendDefault } from "@/lib/select-ref";
import { cn } from "@/lib/utils";

type EventVisibility = "public" | "private";

interface EventVisibilityInputProps {
  value: boolean;
  onChange: (value: boolean) => void;
  className?: string;
}

export function EventVisibilityInput({
  value,
  onChange,
  className,
}: EventVisibilityInputProps) {
  const icon: Record<EventVisibility, JSX.Element> = {
    public: <GlobeIcon className="size-4 text-muted-foreground" />,
    private: <KeyIcon className="size-4 text-muted-foreground" />,
  };

  const handleOnChange = (value: string) => {
    if (value === "public") {
      onChange(true);
    } else {
      onChange(false);
    }
  };

  const innerValue = value ? "public" : "private";

  return (
    <div>
      <Select value={innerValue} onValueChange={handleOnChange}>
        <SelectTrigger
          className={cn(
            "h-8 border-muted-foreground/10 capitalize md:w-32",
            className && className,
          )}
        >
          {icon[innerValue]}
          {innerValue}
        </SelectTrigger>
        <SelectContent align="end" ref={selectPrevendDefault}>
          <SelectGroup>
            <SelectItem value="public" className="px-0">
              <div className="flex items-center gap-3 p-3">
                <GlobeIcon className="size-5 text-muted-foreground" />
                <div className="flex flex-col gap-0.5">
                  <p>Public</p>
                  <p className="max-w-[300px] text-muted-foreground">
                    Shown on your calendar and eligible to be featured.
                  </p>
                </div>
              </div>
            </SelectItem>
            <SelectItem value="private" className="px-0">
              <div className="flex items-center gap-3 p-3">
                <LinkIcon className="size-5 text-muted-foreground" />
                <div className="flex flex-col gap-0.5">
                  <p>Private</p>
                  <p className="max-w-[300px] text-muted-foreground">
                    Unlisted. Only people with the link can register.
                  </p>
                </div>
              </div>
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

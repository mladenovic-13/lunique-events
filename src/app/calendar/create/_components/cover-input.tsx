"use client";

import { Button } from "@/components/ui/button";

interface CoverInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const CoverInput = ({ value, onChange }: CoverInputProps) => {
  return (
    <div className="relative h-36 w-full cursor-pointer rounded-t-xl bg-muted hover:bg-muted/80 md:h-52">
      <Button
        type="button"
        size="sm"
        variant="secondary"
        className="absolute right-3 top-3 bg-card/80 hover:bg-card"
      >
        Change Cover
      </Button>
    </div>
  );
};

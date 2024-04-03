import { type HTMLAttributes } from "react";
import { CheckIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface ColorButtonProps extends HTMLAttributes<HTMLButtonElement> {
  isActive: boolean;
  colorHslValue: string;
  size?: "sm" | "md" | "lg";
}

export const ColorButton = ({
  onClick,
  isActive,
  className,
  colorHslValue,
  size = "md",
}: ColorButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "trasition flex h-full items-center justify-center rounded-full py-1.5 text-[--card-foreground] duration-200 hover:bg-[--card] hover:opacity-90",
        size === "sm" && "w-fit",
        size === "md" && "w-full",
        className,
      )}
      style={
        {
          "--theme-primary": `hsl(${colorHslValue})`,
        } as React.CSSProperties
      }
    >
      <span
        className={cn(
          "flex  shrink-0 items-center justify-center rounded-full bg-[--theme-primary] transition duration-200",
          size === "sm" && "size-5",
          size === "md" && "size-7",

          isActive && "scale-110",
        )}
      >
        {isActive && (
          <CheckIcon
            className={cn(
              "text-white",
              size === "sm" && "size-3",
              size === "md" && "size-4 ",
            )}
          />
        )}
      </span>
    </button>
  );
};

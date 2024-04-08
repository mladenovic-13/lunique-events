"use client";

import { useTheme } from "next-themes";

import { ColorButton } from "@/components/buttons/color-button";
import { Label } from "@/components/ui/label";
import { themes } from "@/lib/themes";

interface ColorInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const ColorInput = ({ value, onChange }: ColorInputProps) => {
  const { resolvedTheme: mode } = useTheme();

  <div className="text-sm">
    <Label>Tint Color</Label>
    {themes.map((theme) => {
      const isActive = value === theme.name;

      return (
        <ColorButton
          key={theme.name}
          onClick={() => {
            onChange(theme.name);
          }}
          colorHslValue={theme?.activeColor[mode === "dark" ? "dark" : "light"]}
          isActive={isActive}
        />
      );
    })}
  </div>;
};

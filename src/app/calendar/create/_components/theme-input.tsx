import { useTheme } from "next-themes";

import { ColorButton } from "@/components/buttons/color-button";
import { Label } from "@/components/ui/label";
import { themes } from "@/lib/themes";

interface ThemeInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const ThemeInput = ({ value, onChange }: ThemeInputProps) => {
  const { resolvedTheme: mode } = useTheme();

  return (
    <div>
      <Label>Theme Color</Label>
      <div className="flex gap-1.5">
        {themes.map((theme) => {
          const isActive = value === theme.name;

          return (
            <ColorButton
              size="sm"
              key={theme.name}
              onClick={() => {
                onChange(theme.name);
              }}
              colorHslValue={
                theme?.activeColor[mode === "dark" ? "dark" : "light"]
              }
              isActive={isActive}
            />
          );
        })}
      </div>
    </div>
  );
};

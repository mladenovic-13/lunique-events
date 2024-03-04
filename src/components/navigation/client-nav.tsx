"use client";
import { SparklesIcon } from "lucide-react";
import { ThemeToggle } from "../ui/theme-toggle";
import lightLogo from "../../images/light-logo.png";
import darkLogo from "../../images/dark-logo.png";
import { useTheme } from "next-themes";

export const ClientNav = () => {
  const { theme } = useTheme();
  return (
    <nav className="border-b">
      <div className="flex h-16 w-full items-center justify-between px-3">
        <img
          src={
            theme === "light"
              ? darkLogo.src
              : theme === "dark"
              ? lightLogo.src
              : lightLogo.src
          }
          width={150}
        />
        <ThemeToggle />
      </div>
    </nav>
  );
};

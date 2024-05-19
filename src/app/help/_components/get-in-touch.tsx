import React from "react";
import { SendIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { paths } from "@/routes/paths";

const GetInTouch = () => {
  const router = useRouter();
  const { theme } = useTheme();
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-4 rounded-lg  px-0 py-4 md:flex-row md:justify-between md:px-8",
        theme === "dark" &&
          "border-none bg-gradient-to-r from-primary to-transparent",
        theme === "light" && "bg-gradient-to-r from-background to-gray-200",
      )}
    >
      <div className="flex flex-col gap-1 px-2 text-center md:px-0 md:text-left">
        <h1 className="text-lg font-semibold capitalize text-accent-foreground md:text-xl">
          Still have question?
        </h1>
        <p className="text-sm text-accent-foreground/60 md:text-base">
          Can{"'"} find the answer you are looking for? Please send email to{" "}
          <strong>Lunique team.</strong>
        </p>
      </div>
      <Button
        onClick={() => router.push(paths.contact)}
        className={cn(
          "mr-2 gap-2 border-2 border-primary bg-background text-sm capitalize text-accent-foreground transition-all hover:mr-0 md:text-base",
          theme === "light" && "hover:text-accent-foreground",
        )}
      >
        Get in touch
        <SendIcon className="size-4" />
      </Button>
    </div>
  );
};

export default GetInTouch;

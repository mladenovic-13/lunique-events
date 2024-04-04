import { forwardRef, type HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export const MainPage = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(
  ({ children, className, ...props }, ref) => (
    <main
      ref={ref}
      className={cn(
        "mx-auto min-h-96 max-w-4xl space-y-5 p-3 md:space-y-8 md:px-0",
        className,
      )}
      {...props}
    >
      {children}
    </main>
  ),
);
MainPage.displayName = "MainPage";

import React, { type CSSProperties } from "react";
import { color } from "framer-motion";

import { cn } from "@/lib/utils";

// Modify these
const MAIN_CIRCLE_SIZE = 210;
const MAIN_CIRCLE_OPACITY = 0.24;
const NUM_CIRCLES = 8;
interface RippleProps {
  color?: string;
}
// eslint-disable-next-line react/display-name
const Ripple = React.memo(({ color }: RippleProps) => {
  return (
    <div className="absolute left-1/2 top-1/2 size-full overflow-visible">
      {Array.from({ length: NUM_CIRCLES }, (_, i) => (
        <div
          key={i}
          // eslint-disable-next-line tailwindcss/classnames-order
          className={cn(
            `absolute -translate-x-1/2 -translate-y-1/2 animate-ripple rounded-full bg-neutral-400`,
            color && color,
          )}
          style={
            {
              width: MAIN_CIRCLE_SIZE + i * 70,
              height: MAIN_CIRCLE_SIZE + i * 70,
              opacity: MAIN_CIRCLE_OPACITY - i * 0.03,
              animationDelay: `${i * 0.06}s`,
            } as CSSProperties
          }
        ></div>
      ))}
    </div>
  );
});

export default Ripple;

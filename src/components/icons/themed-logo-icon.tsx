"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

// import darkLogo from "@/public/images/logo-dark.webp";
// import lightLogo from "@/public/images/logo-light.webp";
import redDarkLogo from "@/public/images/red-dark-events.webp";
import redLightLogo from "@/public/images/red-light-events.webp";

export const ThemedLogoIcon = () => {
  const { resolvedTheme } = useTheme();
  // const [src, setSrc] = useState(lightLogo.src);

  // useEffect(() => {
  //   const logoSrc = resolvedTheme === "light" ? darkLogo.src : lightLogo.src;
  //   setSrc(logoSrc);
  // }, [resolvedTheme]);
  const [src, setSrc] = useState(redLightLogo.src);

  useEffect(() => {
    const logoSrc =
      resolvedTheme === "light" ? redDarkLogo.src : redLightLogo.src;
    setSrc(logoSrc);
  }, [resolvedTheme]);

  return (
    <Image
      alt="Lunique Events Logo"
      src={src}
      width={120}
      height={30}
      className="w-24 object-contain"
    />
  );
};

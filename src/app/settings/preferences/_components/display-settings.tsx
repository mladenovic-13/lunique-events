import React from "react";

import { LanguageSelect } from "./language-select";
import { ThemesGrid } from "./themes-grid";

export const DisplaySettings = () => {
  return (
    <section className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-1.5">
        <h1 className="text-xl font-semibold capitalize text-current">
          Display
        </h1>{" "}
        <p className="text-base font-normal text-accent-foreground/60">
          Choose your desired Lunique Events interface.
        </p>
      </div>
      <ThemesGrid />
      <LanguageSelect />
    </section>
  );
};

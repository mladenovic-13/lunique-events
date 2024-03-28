import React from "react";

import { Card, CardFooter, CardHeader } from "@/components/ui/card";

export const ThemesGrid = () => {
  const themes = [{ name: "System" }, { name: "Light" }, { name: "Dark" }];

  return (
    <section className="flex justify-between gap-6">
      {themes.map((theme, idx) => (
        <Card className=" w-full overflow-hidden" key={idx}>
          <CardHeader className="h-14"></CardHeader>
          <CardFooter className="flex h-fit items-center justify-start bg-accent p-2 px-3">
            <p>{theme.name}</p>
          </CardFooter>
        </Card>
      ))}
    </section>
  );
};

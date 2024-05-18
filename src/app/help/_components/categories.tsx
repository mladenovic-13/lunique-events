import React, { useState } from "react";
import { ChevronRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
const categories = [
  {
    name: "Create Event",
    active: false,
  },
  {
    name: "Account",
    active: false,
  },
  {
    name: "Billing",
    active: false,
  },
  {
    name: "Lunique Events Premium",
    active: false,
  },
];
const Categories = () => {
  const [selected, setSelected] = useState<string>("Create Event");
  return (
    <Card className="rounded-md bg-muted/10 md:w-[350px]">
      <CardHeader className="py-4 text-xl text-accent-foreground/80">
        <CardTitle className="">Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          {categories.map((cat, idx) => (
            <Button
              key={idx}
              className={cn(
                "flex items-center  justify-between rounded-lg bg-muted/90 px-4 py-1 text-accent-foreground",
                selected === cat.name && "bg-primary",
              )}
              onClick={() => setSelected(cat.name)}
            >
              {cat.name}
              <ChevronRightIcon className="md:size-4" />
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Categories;

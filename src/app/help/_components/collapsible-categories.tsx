import React, { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { ChevronDownIcon, ChevronRightIcon, ChevronUpIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { type QuestionCategory } from "@/types";

interface CollapsibleCategoriesProps {
  categories: QuestionCategory[];
  className?: string;
}
const CollapsibleCategories = ({
  className,
  categories,
}: CollapsibleCategoriesProps) => {
  const [selected, setSelected] = useState<string>("Create Event");
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Card
      className={cn(
        "rounded-md bg-muted/10 md:w-[350px]",
        className && className,
      )}
    >
      <Collapsible>
        <CollapsibleTrigger
          className="w-full"
          onClick={() => setIsOpen(!isOpen)}
        >
          <CardHeader className="py-4 text-base text-accent-foreground/80 md:text-xl">
            <CardTitle className="flex items-center justify-between md:justify-start">
              Categories
              <div className="block md:hidden">
                {!isOpen && <ChevronDownIcon className="size-4" />}
                {isOpen && <ChevronUpIcon className="size-4" />}
              </div>
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4">
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
                  <ChevronRightIcon className="size-4" />
                </Button>
              ))}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default CollapsibleCategories;

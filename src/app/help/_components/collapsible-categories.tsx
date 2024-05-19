import React, { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { ChevronDownIcon, ChevronRightIcon, ChevronUpIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { type QuestionCategory } from "@/types";

interface CollapsibleCategoriesProps {
  categories: QuestionCategory[];
  selectedCategory: QuestionCategory;
  onChange: (category: QuestionCategory) => void;
  className?: string;
}
const CollapsibleCategories = ({
  categories,
  selectedCategory,
  onChange,
  className,
}: CollapsibleCategoriesProps) => {
  const { theme } = useTheme();
  const onCategoryClick = (category: QuestionCategory) => {
    onChange(category);
  };
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
              {categories.map((category, idx) => (
                <Button
                  key={idx}
                  className={cn(
                    "mr-4 flex items-center  justify-between rounded-lg bg-muted/90 px-4 py-1 capitalize text-accent-foreground transition-all hover:bg-secondary-foreground/20 hover:pl-6",
                    selectedCategory === category &&
                      "mr-0 bg-primary hover:bg-primary hover:pl-4",
                    selectedCategory === category &&
                      theme === "light" &&
                      "text-accent",
                  )}
                  onClick={() => onCategoryClick(category)}
                >
                  {category}
                  <ChevronRightIcon className="md:size-4" />
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

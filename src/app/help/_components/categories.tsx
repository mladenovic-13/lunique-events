"use client";
import React from "react";
import { ChevronRightIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { type QuestionCategory } from "@/types";

import CollapsibleCategories from "./collapsible-categories";

interface CategoriesProps {
  categories: QuestionCategory[];
  selectedCategory: QuestionCategory;
  onChange: (category: QuestionCategory) => void;
}
const Categories = ({
  onChange,
  selectedCategory,
  categories,
}: CategoriesProps) => {
  const { theme } = useTheme();
  const onCategoryClick = (category: QuestionCategory) => {
    onChange(category);
  };
  return (
    <div>
      <CollapsibleCategories
        className="block md:hidden"
        categories={categories}
        onChange={(category) => onChange(category)}
        selectedCategory={selectedCategory}
      />
      <Card className="hidden rounded-md bg-muted/10 md:block md:w-[350px]">
        <CardHeader className="py-4 text-xl text-accent-foreground/80">
          <CardTitle className="">Categories</CardTitle>
        </CardHeader>
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
      </Card>
    </div>
  );
};

export default Categories;

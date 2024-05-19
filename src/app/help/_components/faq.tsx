import React, { useState } from "react";

import { Input } from "@/components/ui/input";
import { useFAQuestions } from "@/hooks/use-questions-store";
import { type QuestionCategory } from "@/types";

import Categories from "./categories";
import Questiones from "./questions";

const FAQs = () => {
  const qas = useFAQuestions();
  const [category, setCategory] = useState<QuestionCategory>("event");
  const onCategoryChange = (categoryName: QuestionCategory) => {
    setCategory(categoryName);
  };
  const onInputChange = (searchInput: string) => {
    const categoryFAQ = qas.find((categoryFAQs) =>
      categoryFAQs.faqs.some((faq) =>
        faq.question.toLowerCase().includes(searchInput.toLowerCase()),
      ),
    );
    if (categoryFAQ) setCategory(categoryFAQ.category);
  };
  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-center md:block">
        <Input
          placeholder="Ex: reset password, change event date, etc..."
          className="mt-10 w-[90%] border-DEFAULT border-accent-foreground/70 bg-muted/50 text-xs md:mt-0 md:w-2/5"
          onChange={(e) => onInputChange(e.target.value)}
        />
      </div>
      <div className="flex w-full flex-col gap-2 md:flex-row">
        <Categories
          categories={qas.map((qa) => qa.category)}
          selectedCategory={category}
          onChange={(category) => onCategoryChange(category)}
        />
        <Questiones
          qaList={
            qas.find((x) => x.category === category)?.faqs ?? [
              { question: "Is this working?", answer: "No, It doesn't!" },
            ]
          }
        />
      </div>
    </div>
  );
};

export default FAQs;

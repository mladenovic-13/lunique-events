import React from "react";

import { type QuestionAnswer } from "@/types";

import Categories from "./categories";
import Questiones from "./questions";
const qas: QuestionAnswer[] = [
  {
    question: "Is it accessible?",
    answer: "Yes. It adheres to the WAI-ARIA design pattern.",
  },
  {
    question: "Is it styled?",
    answer:
      "Yes. It comes with default styles that matches the other components aesthetic",
  },
  {
    question: "Is it animated?",
    answer:
      "Yes. It's animated by default, but you can disable it if you prefer.",
  },
];
const FAQs = () => {
  return (
    <div className="flex w-full flex-col gap-2 md:flex-row">
      <Categories />
      <Questiones qaList={qas} />
    </div>
  );
};

export default FAQs;

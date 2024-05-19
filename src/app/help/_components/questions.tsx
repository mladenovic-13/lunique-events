import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type QA } from "@/types";

interface QAsProps {
  qaList: QA[];
}
const QAs = ({ qaList }: QAsProps) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      {qaList.map((qa, idx) => (
        <AccordionItem value={`item-${idx}`} key={idx}>
          <AccordionTrigger>{qa.question}</AccordionTrigger>
          <AccordionContent>{qa.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

interface QuestionesProps {
  qaList: QA[];
}
const Questiones = ({ qaList }: QuestionesProps) => {
  return (
    <Card className="w-full rounded-md border-none">
      <CardHeader>
        <CardTitle>FAQs</CardTitle>
      </CardHeader>
      <CardContent>
        <QAs qaList={qaList} />
      </CardContent>
    </Card>
  );
};

export default Questiones;

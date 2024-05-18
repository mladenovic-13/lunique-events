"use client";
import React from "react";

import { Button } from "@/components/ui/button";

import FAQs from "./_components/faq";
import Heading from "./_components/heading";

const HelpPage = () => {
  return (
    <div className="mx-auto min-h-96 max-w-4xl  space-y-10  px-4 md:px-0">
      <Heading />
      <FAQs />
      <div className="hidden w-full items-center justify-between rounded-lg bg-gradient-to-r  from-primary to-transparent px-8 py-4 md:flex">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold capitalize text-accent-foreground">
            Stil have question?
          </h1>
          <p className="text-accent-foreground/60">
            Can{"'"} find the answer you are looking for? Please send email to{" "}
            <strong>Lunique team.</strong>
          </p>
        </div>
        <div className="rounded-md bg-gradient-to-r from-red-700/50 to-primary p-0.5 transition-all hover:bg-primary">
          <Button className="bg-background capitalize transition-all">
            Get in touch
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;

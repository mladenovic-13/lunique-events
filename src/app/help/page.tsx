"use client";
import React from "react";

import FAQs from "./_components/faq";
import GetInTouch from "./_components/get-in-touch";
import Heading from "./_components/heading";

const HelpPage = () => {
  return (
    <div className="mx-auto min-h-96 max-w-4xl  space-y-10  px-4 md:px-0">
      <Heading />
      <FAQs />
      <GetInTouch />
    </div>
  );
};

export default HelpPage;

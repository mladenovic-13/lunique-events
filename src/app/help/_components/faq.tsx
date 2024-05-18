import React from "react";

import Categories from "./categories";
import Questiones from "./questions";

const FAQs = () => {
  return (
    <div className="flex w-full flex-col gap-2 md:flex-row">
      <div className=" ">
        <Categories />
      </div>
      <Questiones />
    </div>
  );
};

export default FAQs;

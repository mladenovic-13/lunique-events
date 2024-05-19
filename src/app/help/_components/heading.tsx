import React from "react";

const Heading = () => {
  return (
    <div className="flex flex-col gap-4 pt-6 md:flex   md:flex-row md:justify-between md:gap-0 md:pt-12">
      <h1 className="text-center text-xl font-semibold capitalize md:w-[550px] md:px-0 md:text-left md:text-3xl">
        Having question about us? <br className="md:hidden" /> We have just the{" "}
        <br className="md:hidden" />
        <strong className="bg-gradient-to-r from-rose-800 to-red-500 bg-clip-text capitalize text-transparent">
          Right answers for you.
        </strong>
      </h1>
      <p className="text-center text-sm/6 font-light text-accent-foreground/70 md:w-[280px] md:pt-8 md:text-left md:text-sm">
        Everything you need to know about application.
        <br className="md:hidden" /> Cant{"'"}t find the answer you{"'"}re
        looking for? <br className="md:hidden" />
        Please contact{" "}
        <strong className="font-medium text-accent-foreground/90 underline">
          out team here
        </strong>
        .
      </p>
    </div>
  );
};

export default Heading;

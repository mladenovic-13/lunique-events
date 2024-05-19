import React from "react";

const Heading = () => {
  return (
    <div>
      <div className="flex flex-col gap-1 pt-6 md:justify-between md:gap-2 md:pt-12">
        <h1 className="text-center text-3xl font-semibold capitalize md:w-[550px] md:px-0 md:text-left md:text-5xl">
          <strong className="bg-gradient-to-r  from-rose-800 to-red-500 bg-clip-text capitalize text-transparent">
            {"Let's Talk With Us!"}
          </strong>
        </h1>
        <p className="text-center text-sm/6  text-accent-foreground/70 md:w-fit md:text-left md:text-lg">
          If you have any questions feel free to write.
        </p>
      </div>
    </div>
  );
};

export default Heading;

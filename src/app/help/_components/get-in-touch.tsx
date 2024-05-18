import React from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { paths } from "@/routes/paths";

const GetInTouch = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center gap-4 rounded-lg bg-gradient-to-r from-primary to-transparent px-0 py-4 md:flex-row md:justify-between md:px-8">
      <div className="flex flex-col gap-1 px-2 text-center md:px-0 md:text-left">
        <h1 className="text-lg font-semibold capitalize text-accent-foreground md:text-xl">
          Still have question?
        </h1>
        <p className="text-sm text-accent-foreground/60 md:text-base">
          Can{"'"} find the answer you are looking for? Please send email to{" "}
          <strong>Lunique team.</strong>
        </p>
      </div>
      <div className="rounded-md bg-gradient-to-r from-red-700/50 to-primary p-0.5 transition-all ">
        <Button
          onClick={() => router.push(paths.contact)}
          className="bg-background text-sm capitalize transition-all md:text-base"
        >
          Get in touch
        </Button>
      </div>
    </div>
  );
};

export default GetInTouch;

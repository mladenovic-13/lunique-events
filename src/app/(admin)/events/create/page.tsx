import React from "react";

import { CreateEventForm } from "./_components/create-event-form";

export default function CreateEventPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-5 p-3 pb-10 md:flex  md:space-x-8 md:space-y-0 ">
      <CreateEventForm />
    </div>
  );
}

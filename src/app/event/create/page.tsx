import React from "react";
import { redirect } from "next/navigation";

import { paths } from "@/routes/paths";
import { getServerAuthSession } from "@/server/auth";

import { CreateEventForm } from "./_components/create-event-form";

export default async function CreateEventPage() {
  const session = await getServerAuthSession();

  if (!session?.user.id) redirect(paths.signin.root);

  return (
    <div className="mx-auto max-w-4xl p-3 pb-10 ">
      <CreateEventForm />
    </div>
  );
}

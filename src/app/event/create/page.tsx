import React from "react";
import { redirect } from "next/navigation";

import { paths } from "@/routes/paths";
import { getServerAuthSession } from "@/server/auth";

import { CreateEventSteper } from "./_components/create-event-form-stepper";

export default async function CreateEventPage() {
  const session = await getServerAuthSession();

  if (!session?.user.id) redirect(paths.signin.root);

  return <CreateEventSteper />;
}

"use clients";

import { type ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type GuestStatus = "going" | "not going" | "invited";

export type Guest = {
  id: string;
  name: string;
  email: string;
  status: GuestStatus;
  date: string;
};
export const columns: ColumnDef<Guest>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
];

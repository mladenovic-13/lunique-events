"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowUpDown } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { type GuestStatus } from "../../page";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type Guest = {
  email: string;
  status: GuestStatus;
  date: Date;
};
export const columns: ColumnDef<Guest>[] = [
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex w-fit cursor-pointer px-3 transition-all hover:text-foreground"
        >
          Email
          <ArrowUpDown className="ml-2 size-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      const value = row.getValue("email");

      return <div className="px-3">{value as string}</div>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex w-fit cursor-pointer transition-all hover:text-foreground"
        >
          Status
          <ArrowUpDown className="ml-2 size-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      const value = row.getValue("status");
      const color =
        value === "GOING"
          ? "#3DC45D"
          : value === "NOT_GOING"
            ? "#64758A"
            : value === "MAYBE"
              ? "#EAB308"
              : value === "PENDING"
                ? "#2963EA"
                : "#F2FF";
      return (
        <div className="">
          <Badge
            className="w-fit justify-center whitespace-nowrap rounded-full"
            style={{
              backgroundColor: color,
            }}
          >
            <h2 className="capitalize">
              {value === "GOING"
                ? "Going"
                : value === "NOT_GOING"
                  ? "Not Going"
                  : value === "MAYBE"
                    ? "Maybe"
                    : value === "PENDING"
                      ? "Pending"
                      : "Invited"}
            </h2>
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex w-fit cursor-pointer transition-all hover:text-foreground"
        >
          Date
          <ArrowUpDown className="ml-2 size-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      const value = row.getValue("date");
      return <div>{format(value as Date, "PPP")}</div>;
    },
  },
];

import { type GuestStatus } from "../page";

import { columns } from "./data-table/columns";
import { DataTable } from "./data-table/data-table";

interface GuestsTableProps {
  guests: {
    email: string;
    status: GuestStatus;
    date: Date;
  }[];
}
export default function GuestsTable({ guests }: GuestsTableProps) {
  const data = guests;

  return (
    <div className="container mx-auto px-0 ">
      <DataTable columns={columns} data={data} />
    </div>
  );
}

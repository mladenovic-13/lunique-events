"use client";

import {
  ArrowDownNarrowWide,
  DownloadIcon,
  FilterIcon,
  Share2Icon,
  UserIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

export const GuestsTable = () => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Guest List</h1>
        <div className="flex space-x-2 ">
          <Button className="flex size-7 h-7 place-content-center items-center rounded   bg-secondary p-0 text-primary">
            <DownloadIcon className="size-4 text-primary/60" />
          </Button>
          <Button className="flex size-7 h-7  place-content-center   items-center rounded bg-secondary p-0 text-primary">
            <Share2Icon className="size-4 text-primary/60" />
          </Button>
        </div>
      </div>
      <div className="w-full">
        <Input
          className="text-lg font-medium"
          placeholder="🔎  Search for guest"
          type="search"
        />
      </div>

      <div className="flex justify-between">
        <div>
          <Select>
            <SelectTrigger className="h-7 w-fit space-x-2 bg-muted">
              <FilterIcon className="size-4 text-muted-foreground" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="allGuests">All Guests</SelectItem>
                <Separator />
                <SelectItem value="going">Going</SelectItem>
                <SelectItem value="invited">Invited</SelectItem>
                <SelectItem value="notGoing">Not Going</SelectItem>
                <Separator />
                <SelectItem value="checkedIn">Checked In</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select>
            <SelectTrigger className="h-7 w-fit space-x-2 bg-muted">
              <ArrowDownNarrowWide className="size-4 text-muted-foreground" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="going">Name</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="approvalStatus">Approval Status</SelectItem>
                <SelectItem value="registerTime">Register Time</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="text-muted-foreground ">
                <UserIcon className="size-5" />
              </TableCell>
              <TableCell className="font-bold">Luka Stojadinovic</TableCell>
              <TableCell className="text-muted-foreground">
                luka@lunique.tech
              </TableCell>
              <TableCell className="text-right">
                <div className="w-fit rounded-xl border-none bg-green-900/50">
                  <p className="px-2 py-0.5 text-green-400">Going</p>
                </div>
              </TableCell>
              <TableCell className="text-right text-muted-foreground">
                Mar 14
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground ">
                <UserIcon className="size-5" />
              </TableCell>
              <TableCell className="font-bold">Nikola Mladenovic</TableCell>
              <TableCell className="text-muted-foreground">
                nikola@lunique.tech
              </TableCell>
              <TableCell className="text-right">
                <div className="w-fit rounded-xl border-none bg-green-900/50">
                  <p className="px-2 py-0.5 text-green-400">Going</p>
                </div>
              </TableCell>
              <TableCell className="text-right text-muted-foreground">
                Mar 14
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

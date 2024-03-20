"use client";

import { CircleIcon } from "lucide-react";
import style from "styled-jsx/style";

import { cn } from "@/lib/utils";

import { type GuestStatus } from "../page";

interface GuestsProgressBarProps {
  guestStatuses: GuestStatus[];
}

export const GuestsProgressBar = ({
  guestStatuses,
}: GuestsProgressBarProps) => {
  const data = [
    {
      name: "Going",
      counts: guestStatuses.filter((s) => s === "going").length,
      color: "#3BC561",
    },
    {
      name: "Invited",
      counts: guestStatuses.filter((s) => s === "invited").length,
      color: "#2963EA",
    },
    {
      name: "Not going",
      counts: guestStatuses.filter((s) => s === "not going").length,
      color: "#64758A",
    },
  ];

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex justify-start space-x-2">
        <div>
          {guestStatuses.filter((g) => g === "going").length > 0 && (
            <p className="text-2xl text-green-500">{guestStatuses.length}</p>
          )}
          {guestStatuses.filter((g) => g === "going").length === 0 && (
            <p className="text-2xl text-foreground/50">
              {guestStatuses.length}
            </p>
          )}
        </div>
        <div className="flex flex-col-reverse">
          <p>{guestStatuses.length === 1 ? "guest" : "guests"}</p>
        </div>
      </div>

      <div className="flex  space-x-0.5 ">
        {guestStatuses.length > 0 &&
          data
            .filter((status) => status.counts > 0)
            .map((status, idx) => {
              const percentage = (
                (status.counts /
                  data.reduce(
                    (acc, currentValue) => acc + currentValue.counts,
                    0,
                  )) *
                100
              ).toFixed(0);

              console.log(data);

              const borderRadiusLeft = idx === 0 ? "4px" : "0px";
              const borderRadiusRight =
                idx === data.filter((x) => x.counts > 0).length - 1
                  ? "4px"
                  : "0px";

              return (
                <div
                  key={idx}
                  style={{
                    width: `${percentage}%`,
                    height: 8,
                    backgroundColor: `${status.color}`,
                    borderTopLeftRadius: `${borderRadiusLeft}`,
                    borderBottomLeftRadius: `${borderRadiusLeft}`,
                    borderTopRightRadius: `${borderRadiusRight}`,
                    borderBottomRightRadius: `${borderRadiusRight}`,
                  }}
                ></div>
              );
            })}
        {guestStatuses.length === 0 && (
          <div className="h-2 w-full rounded bg-foreground/50"></div>
        )}
      </div>

      <div className="flex space-x-3">
        <div className="flex items-center space-x-2 text-green-500">
          <CircleIcon className=" size-1.5 rounded-full bg-green-500 text-green-500" />
          <p>1 Going</p>
        </div>
        <div className="flex items-center space-x-2 text-muted-foreground">
          <CircleIcon className="size-1.5 rounded-full bg-muted-foreground/80 text-muted-foreground/80" />
          <p>1 Not Going</p>
        </div>
      </div>
    </div>
  );
};

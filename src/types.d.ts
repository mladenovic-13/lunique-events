import { type Event, type User } from "@prisma/client";
import { type SVGProps } from "react";

type Icon = SVGProps<SVGSVGElement>;

type ImageProps = {
  id: number;
  src: string;
};

type ImageAttributes = {
  id: number;
  src: string;
};

type EventWithOwner = Event & {
  owner: User;
};

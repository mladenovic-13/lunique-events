import { type SVGProps } from "react";
import { type Event, type User } from "@prisma/client";

type Icon = SVGProps<SVGSVGElement>;

type ImageProps = {
  id: number;
  src: string;
};

type ImageAttributes = {
  id: number;
  src: string;
};

type EventWithOwnerAndImages = Event & {
  owner: User;
};

type EventWithOwner = Event & {
  creator: User;
};

type Place = {
  placeId: string;
  description: string;
  mainText: string;
  secondaryText: string;
  position: {
    lat: number;
    lng: number;
  };
};
type Timeframe = "upcoming" | "past";
type ViewMode = "card" | "list";

type UpdateEventType = RouterOutputs["event"]["get"];

type MeetingMode = "inPerson" | "virutal";

type InviteGuestStep =
  | "search-guests"
  | "add-emails"
  | "import-CSV"
  | "generate-email"
  | "add-guests-directly"
  | "list-events";

export type QA = {
  question: string;
  answer: string;
};
export type QuestionCategory =
  | "event"
  | "account"
  | "premium-packet"
  | "billing";
export type QuestionAnswer = {
  category: QuestionCategory;
  faqs: QA[];
};

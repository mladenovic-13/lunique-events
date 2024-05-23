import React, { useState } from "react";
import { ChevronLeftIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  useEventGuests,
  useGuestEmails,
  useGuestSelectedEvent,
  useInviteGuestActions,
} from "@/hooks/use-guest-store";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";

import GuestEmail from "./guest-email";

interface SearchGuestsProps {
  className?: string;
}
const SearchGuests = ({ className }: SearchGuestsProps) => {
  const [select, setSelect] = useState<"select" | "deselect">("select");
  const eventId = useGuestSelectedEvent();
  const selectedEmails = useGuestEmails();
  const {
    setStep,
    addEmails,
    removeEmails,
    emailExists,
    addEmail,
    removeEmail,
  } = useInviteGuestActions();
  const { data: event, isLoading } = api.event.get.useQuery({
    id: eventId ?? "",
  });
  const initialGuestMails = useEventGuests();
  const [guestsEmails, setGuestsEmails] = useState<string[]>(initialGuestMails);

  const onInputchange = (searchValue: string) => {
    const searchResult = initialGuestMails.filter((email) =>
      email.includes(searchValue.toLocaleLowerCase()),
    );
    setGuestsEmails(searchResult);
  };
  const selectAllGuestsHandler = () => {
    if (select === "select") {
      addEmails(guestsEmails.length === 0 ? initialGuestMails : guestsEmails);
      setSelect("deselect");
    } else if (select === "deselect") {
      removeEmails(
        guestsEmails.length === 0 ? initialGuestMails : guestsEmails,
      );
      setSelect("select");
    }
  };

  const onEmailClick = (email: string) => {
    if (!emailExists(email)) {
      addEmail(email);
    } else if (emailExists(email)) {
      removeEmail(email);
    }
  };

  return (
    <div className={cn("h-full", className && className)}>
      <div className="flex h-[10%] w-full items-center justify-between gap-2">
        <Button
          onClick={() => setStep("list-events")}
          className="flex items-center justify-center  md:hidden"
          variant={"secondary"}
        >
          <ChevronLeftIcon className="size-4" />
        </Button>
        <Input
          className="w-full bg-muted text-base"
          placeholder={isLoading ? "Loading ..." : `Search in "${event?.name}"`}
          onChange={(e) => onInputchange(e.target.value)}
          disabled={isLoading}
        />
      </div>
      <div className="flex h-[7%] w-full items-center justify-end">
        <Button
          onClick={() => selectAllGuestsHandler()}
          variant={"ghost"}
          className="px-0 capitalize hover:bg-transparent md:text-accent-foreground/60 md:hover:text-accent-foreground"
          disabled={initialGuestMails.length === 0}
        >
          {select === "select" && "select all"}
          {select === "deselect" && "deselect all"}
        </Button>
      </div>
      <ScrollArea className="flex h-[83%] flex-col md:h-[85%]">
        {guestsEmails.length > 0 &&
          guestsEmails.map((email, idx) => (
            <GuestEmail
              email={email}
              key={idx}
              selected={selectedEmails.includes(email)}
              onClick={() => onEmailClick(email)}
            />
          ))}
        {guestsEmails.length === 0 &&
          initialGuestMails.map((email, idx) => (
            <GuestEmail
              email={email}
              key={idx}
              selected={selectedEmails.includes(email)}
              onClick={() => onEmailClick(email)}
            />
          ))}
      </ScrollArea>
    </div>
  );
};

export default SearchGuests;

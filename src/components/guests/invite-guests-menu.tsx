import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns/esm";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CircleCheckIcon,
  CircleIcon,
  FileSpreadsheetIcon,
  FileTextIcon,
  PencilLineIcon,
  SendIcon,
  TrashIcon,
} from "lucide-react";
import { z } from "zod";

import {
  useGuestEmails,
  useInviteGuestActions,
  useInviteStep,
} from "@/hooks/use-guest-store";
import { upcomingAndPastEvents } from "@/lib/mock-events";
import { cn } from "@/lib/utils";
import { type InviteGuestStep } from "@/types";

import { Button } from "../ui/button";
import { Form, FormField } from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

import { GuestEmailGenerator } from "./guest-email-generator";
import { InviteList } from "./invite-list";

interface InviteGuestsMenuProps {
  prop?: string;
}

export const InviteGuests = ({}: InviteGuestsMenuProps) => {
  // const [step, setStep] = useState<InviteGuestStep>("addEmails");
  // const [selectedEmails, setSelectedEmails] = useState<Array<string>>([]);
  const [eventGuests, setEventGuests] = useState<Array<string>>([]);
  const [eventName, setEventName] = useState<string>("");

  const step = useInviteStep();
  const selectedEmails = useGuestEmails();
  const { setStep } = useInviteGuestActions();

  const onChangeModeHandler = (mode: InviteGuestStep, eventId?: string) => {
    setStep(mode);
    if (mode === "searchGuests" && eventId) {
      // @TODO
      setEventGuests(
        upcomingAndPastEvents.upcoming
          .concat(upcomingAndPastEvents.past)
          .find((ev) => ev.id === eventId)?.guests ?? [],
      );
    }
  };

  return (
    <section className="flex w-full flex-col pb-4">
      <section className="flex size-full items-start gap-2">
        {/* Side menu */}
        <div className="max-w-[240px] pt-4">
          {step !== "sendInvites" && (
            <SideMenu
              mode={step}
              onChangeMode={(mode, eventId) =>
                onChangeModeHandler(mode, eventId)
              }
              onEventSelect={(eventName) => setEventName(eventName)}
            />
          )}
          {step === "sendInvites" && (
            <InviteList guestsEmails={selectedEmails} />
          )}
        </div>
        <Separator orientation="vertical" className="bg-accent-foreground/20" />
        {/* Add emails */}
        <div className="flex w-full flex-col pt-4">
          {step === "addEmails" && <AddEmails emails={selectedEmails} />}
          {step === "searchGuests" && (
            <div className="flex flex-col gap-4">
              <SearchGuests eventName={eventName} eventGuests={eventGuests} />
            </div>
          )}
          {step === "sendInvites" && <GuestEmailGenerator />}
          {step === "importCSV" && <ImportCSV />}
        </div>
      </section>
      <Separator className="bg-white/20" />
      <div className="pt-6">
        {step !== "sendInvites" && (
          <div className="flex justify-between">
            <Button
              variant={"ghost"}
              className={cn(
                "pl-2 text-sm font-semibold text-accent-foreground/50 transition-all hover:bg-transparent hover:text-primary",
                selectedEmails.length > 0 &&
                  step === "addEmails" &&
                  "text-primary",
              )}
              onClick={() => {
                if (step !== "addEmails") setStep("addEmails");
                else if (step === "addEmails") {
                  setStep("searchGuests");
                }
              }}
              disabled={selectedEmails.length === 0}
            >
              {selectedEmails.length} Selected
            </Button>
            <Button
              variant={"default"}
              onClick={() => setStep("sendInvites")}
              className="gap-2"
              disabled={selectedEmails.length === 0}
            >
              Next
              <ChevronRightIcon size={16} />
            </Button>
          </div>
        )}
        {step === "sendInvites" && (
          <div className="flex justify-between">
            <Button
              variant={"secondary"}
              onClick={() => setStep("addEmails")}
              className="gap-2"
            >
              <ChevronLeftIcon size={16} />
              Back
            </Button>
            <Button
              variant={"default"}
              className="gap-2"
              onClick={() => alert("@TODO")}
            >
              <SendIcon size={16} />
              Send Invites
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

interface SideMenuPros {
  mode: InviteGuestStep;
  onChangeMode: (mode: InviteGuestStep, eventId?: string) => void;
  onEventSelect: (eventName: string) => void;
}
const SideMenu = ({ mode, onChangeMode, onEventSelect }: SideMenuPros) => {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  const onEventClickHandler = (
    mode: string,
    eventId: string,
    eventName: string,
  ) => {
    onChangeMode("searchGuests", eventId);
    setSelectedEvent(eventId);
    onEventSelect(eventName);
  };

  const { setStep } = useInviteGuestActions();

  return (
    <section className="flex flex-col gap-4 md:h-[540px] md:w-[200px]">
      <div className="flex flex-col">
        <Button
          className={cn(
            "flex items-center justify-start gap-2 pl-2 font-bold text-accent-foreground hover:bg-accent-foreground/10",
            mode === "addEmails" && "bg-accent-foreground/10",
          )}
          variant={"ghost"}
          // onClick={() => onChangeMode("addEmails")}
          onClick={() => setStep("addEmails")}
        >
          <PencilLineIcon size={17} className="text-accent-foreground/60 " />
          <p>Enter Emails</p>
        </Button>
        <Button
          className={cn(
            "flex items-center justify-start gap-2 pl-2 font-bold text-accent-foreground hover:bg-accent-foreground/10",
            mode === "importCSV" && "bg-accent-foreground/10",
          )}
          variant={"ghost"}
          // onClick={() => onChangeMode("importCSV")}
          onClick={() => setStep("importCSV")}
        >
          <FileTextIcon size={17} className="text-accent-foreground/60" />
          <p>Import CSV</p>
        </Button>
      </div>
      <Separator className="bg-white/20" />
      <div className="flex flex-col gap-2">
        <Label className="px-2 pb-2 text-sm font-semibold uppercase  text-accent-foreground/50">
          Events
        </Label>
        <div className="flex h-[400px]  flex-col gap-2 overflow-y-auto">
          {upcomingAndPastEvents.upcoming
            .concat(upcomingAndPastEvents.past)
            .map((ev, idx) => (
              <EventItem
                eventName={ev.name}
                eventDate={ev.date}
                guestsCount={ev.guests.length}
                key={idx}
                onClick={() =>
                  onEventClickHandler("searchGuests", ev.id, ev.name)
                }
                selected={selectedEvent === ev.id}
              />
            ))}
        </div>
      </div>
    </section>
  );
};

interface AddEmailsProps {
  emails: Array<string>;
}
const AddEmails = ({ emails }: AddEmailsProps) => {
  const formSchema = z.object({
    email: z.string().email(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  const { addEmail } = useInviteGuestActions();
  function onSubmit(value: z.infer<typeof formSchema>) {
    addEmail(value.email);
    form.reset({ email: "" });
  }
  return (
    <section className="flex flex-col  pt-2">
      <div className="flex flex-col gap-2">
        <Label className="font-semibold capitalize">Add Emails</Label>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <Input
                    type="search"
                    className="items-center bg-muted font-medium"
                    placeholder="Paste or enter emails here"
                    {...field}
                  />
                )}
              />
              <Button variant={"secondary"} className="font-semibold">
                Add
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <div className="flex max-h-[475px]  flex-col gap-2 overflow-y-auto pt-3">
        {emails.map((email, idx) => (
          <GuestEmailItem email={email} key={idx} />
        ))}
      </div>
    </section>
  );
};

interface GuestEmailItemProps {
  email: string;
  toggle?: boolean;
}
const GuestEmailItem = ({ email, toggle }: GuestEmailItemProps) => {
  const { emailExists } = useInviteGuestActions();
  const { removeEmail, addEmail } = useInviteGuestActions();
  const step = useInviteStep();

  const onClickHandler = () => {
    console.log("mrk");
    if (!toggle) {
      addEmail(email);
    }
    if (toggle) {
      if (!emailExists(email)) addEmail(email);
      else if (emailExists(email)) removeEmail(email);
    }
  };

  return (
    <div
      className="flex items-center justify-between rounded-lg p-2 text-accent-foreground/90   transition-all hover:cursor-pointer hover:bg-accent-foreground/10"
      onClick={() => {
        onClickHandler();
      }}
    >
      <div className="flex items-center gap-2">
        <div className="flex size-8 items-center justify-center rounded-full bg-accent-foreground/10 text-center ">
          <p className="uppercase">{email[0]}</p>
        </div>
        <p className="font-semibold">{email}</p>
      </div>
      <div className="flex items-center gap-4">
        {step === "addEmails" && (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              removeEmail(email);
            }}
            className="p-0 text-red-500/80 transition-all hover:bg-transparent hover:text-red-500"
            variant={"ghost"}
          >
            <TrashIcon size={20} />
          </Button>
        )}
        {emailExists(email) && <CircleCheckIcon size={20} />}
        {!emailExists(email) && (
          <CircleIcon size={20} className="text-accent-foreground/30" />
        )}
      </div>
    </div>
  );
};

interface ImportCSVProps {
  prop?: string;
}

const ImportCSV = ({}: ImportCSVProps) => {
  return (
    <section
      className="flex flex-col  gap-4 pt-2"
      onClick={() => alert("@TODO")}
    >
      <Label className="font-semibold capitalize">Import CSV</Label>
      <div className="flex h-48 w-full flex-col items-center justify-center gap-6 rounded-lg border border-dashed border-accent-foreground/20 bg-muted transition-all hover:cursor-pointer hover:bg-accent-foreground/20">
        <FileSpreadsheetIcon size={32} className="text-accent-foreground/90" />
        <div className="flex flex-col items-center">
          <p className="text-base font-semibold text-accent-foreground">
            Import CSV File
          </p>
          <p className="text-sm font-light text-accent-foreground/80">
            Drop file or click here to chose file.
          </p>
        </div>
      </div>
    </section>
  );
};

interface EventItemProprs {
  prop?: string;
  eventName: string;
  eventDate: Date;
  onClick: () => void;
  selected: boolean;
  guestsCount: number;
}

const EventItem = ({
  eventName,
  eventDate,
  onClick,
  selected,
  guestsCount,
}: EventItemProprs) => {
  return (
    <div
      className={cn(
        "flex flex-col rounded-lg p-1 px-2  transition-all hover:cursor-pointer hover:bg-accent-foreground/10",
        selected && "bg-accent-foreground/10",
      )}
      onClick={onClick}
    >
      <h1 className="line-clamp-1 text-base font-semibold text-accent-foreground">
        {eventName}
      </h1>
      <div className="flex items-center gap-2 text-xs text-accent-foreground/50">
        <p>{format(eventDate, "PPP")}</p>
        <CircleIcon size={5} />
        <p>
          {guestsCount > 0 && guestsCount}{" "}
          {guestsCount === 1
            ? "Guest"
            : guestsCount > 0
              ? "Guests"
              : "No Guests"}
        </p>
      </div>
    </div>
  );
};

interface SearchGuestsProps {
  prop?: string;
  eventGuests: Array<string>;
  eventName: string;
}
const SearchGuests = ({ eventGuests, eventName }: SearchGuestsProps) => {
  const { addEmails } = useInviteGuestActions();
  const selectAllGuestsHandler = () => {
    // @TODO
    addEmails(eventGuests);
  };

  return (
    <section className="flex max-h-[540px]  flex-col">
      <div className="px-2">
        <Input
          type="search"
          placeholder={`Search in "${eventName}"`}
          className="w-full bg-muted"
        />
      </div>
      <div className="flex justify-end px-2">
        <Button
          variant={"ghost"}
          className="bg-none p-0 text-accent-foreground/50 transition-all hover:bg-transparent hover:text-accent-foreground"
          onClick={() => selectAllGuestsHandler()}
        >
          Select All
        </Button>
      </div>
      <div className="overflow-y-auto">
        {eventGuests?.map((guestEmail, idx) => (
          <GuestEmailItem email={guestEmail} key={idx} toggle={true} />
        ))}
      </div>
    </section>
  );
};

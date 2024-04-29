import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns/esm";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CircleCheckIcon,
  CircleIcon,
  FileTextIcon,
  PencilLineIcon,
  SendIcon,
} from "lucide-react";
import { z } from "zod";

import { upcomingAndPastEvents } from "@/lib/mock-events";
import { cn } from "@/lib/utils";
import { type InviteGuestStep } from "@/types";

import { Button } from "../ui/button";
import { Form, FormField } from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

interface InviteGuestsMenuProps {
  prop?: string;
}

export const InviteGuests = ({}: InviteGuestsMenuProps) => {
  const [step, setStep] = useState<InviteGuestStep>("addEmails");

  // const [setselectedGuest, setSetselectedGuest] = useState([]);
  const [emails, setEmails] = useState<Array<string>>([]);

  const onEmailAddedHandler = (value: string) => {
    if (!emails.includes(value)) setEmails([...emails, value]);
  };
  const onEmailRemovedHandler = (value: string) => {
    if (emails.includes(value))
      setEmails([...emails.filter((e) => e !== value)]);
  };
  const onChangeModeHandler = (mode: InviteGuestStep) => {
    setStep(mode);
  };

  return (
    <section className="flex w-full flex-col">
      <section className="flex size-full items-start gap-2">
        {/* Side menu */}
        <div className="max-w-[240px]">
          {(step === "importCSV" ||
            step === "searchGuests" ||
            step === "addEmails") && (
            <SideMenu
              mode={step}
              onChangeMode={(mode) => onChangeModeHandler(mode)}
            />
          )}
          {step === "sendInvites" && <div>Inviting </div>}
        </div>
        <Separator orientation="vertical" className="bg-accent-foreground/20" />
        {/* Search area */}
        <div className="flex w-full flex-col">
          {(step === "searchGuests" || step === "addEmails") && (
            <AddEmails
              onEmailAdd={(email) => onEmailAddedHandler(email)}
              onEmailRemove={(email) => onEmailRemovedHandler(email)}
              emails={emails}
            />
          )}
          {step === "sendInvites" && <p>Generate email for sending</p>}
        </div>
      </section>
      <Separator className="bg-white/20" />
      <div className="pt-6">
        {step !== "sendInvites" && (
          <div className="flex justify-between">
            <Button
              variant={"ghost"}
              className="pl-2 text-sm font-semibold text-accent-foreground/50 transition-all hover:bg-transparent hover:text-primary"
            >
              {emails.length} Selected
            </Button>
            <Button
              variant={"default"}
              onClick={() => setStep("sendInvites")}
              className="gap-2"
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
              onClick={() => setStep("searchGuests")}
              className="gap-2"
            >
              <ChevronLeftIcon size={16} />
              Back
            </Button>
            <Button variant={"default"} className="gap-2">
              Send Invites
              <SendIcon size={16} />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

interface SideMenuPros {
  mode: InviteGuestStep;
  onChangeMode: (mode: InviteGuestStep) => void;
}
const SideMenu = ({ mode, onChangeMode }: SideMenuPros) => {
  return (
    <section className="flex w-[200px] flex-col gap-4">
      <div className="flex flex-col">
        <Button
          className={cn(
            "flex items-center justify-start gap-2 pl-2 font-bold text-accent-foreground hover:bg-accent-foreground/10",
            mode === "addEmails" && "bg-accent-foreground/10",
          )}
          variant={"ghost"}
          onClick={() => onChangeMode("addEmails")}
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
          onClick={() => onChangeMode("importCSV")}
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
          {upcomingAndPastEvents.past
            .concat(upcomingAndPastEvents.upcoming)
            .map((ev, idx) => (
              <div
                className="flex flex-col rounded-lg p-1 px-2  transition-all hover:cursor-pointer hover:bg-accent-foreground/10"
                key={idx}
              >
                <h1 className="line-clamp-1 text-base font-semibold text-accent-foreground">
                  {ev.name}
                </h1>
                <div className="flex items-center gap-2 text-xs text-accent-foreground/50">
                  <p>{format(ev.date, "PPP")}</p>
                  <CircleIcon size={5} />
                  <p>2 Guests</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

interface AddEmailsProps {
  onEmailAdd: (email: string) => void;
  onEmailRemove: (email: string) => void;
  emails: Array<string>;
}
const AddEmails = ({ onEmailAdd, onEmailRemove, emails }: AddEmailsProps) => {
  const formSchema = z.object({
    email: z.string().email(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  function onSubmit(value: z.infer<typeof formSchema>) {
    onEmailAdd(value.email);
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
          <GuestEmailItem
            email={email}
            key={idx}
            onClick={() => onEmailRemove(email)}
          />
        ))}
      </div>
    </section>
  );
};

interface GuestEmailItemProps {
  email: string;
  onClick: () => void;
}
const GuestEmailItem = ({ email, onClick }: GuestEmailItemProps) => {
  return (
    <div
      className="flex items-center justify-between rounded-lg p-2  transition-all hover:bg-accent-foreground/10"
      onClick={onClick}
    >
      <div className="flex items-center gap-2">
        <div className="flex size-8 items-center justify-center rounded-full bg-accent-foreground/10 text-center text-accent-foreground/90">
          <p className="uppercase">{email[0]}</p>
        </div>
        <p className="font-semibold">{email}</p>
      </div>
      <CircleCheckIcon size={20} />
    </div>
  );
};

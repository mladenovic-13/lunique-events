import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CircleCheckIcon,
  CircleIcon,
  LoaderCircleIcon,
  SendIcon,
  XIcon,
} from "lucide-react";
import { z } from "zod";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  useEventGuests,
  useGuestEmails,
  useGuestSelectedEvent,
  useInviteGuestActions,
  useInviteStep,
} from "@/hooks/use-guest-store";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";

import { Button } from "../../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Separator } from "../../ui/separator";
import { toast } from "../../ui/use-toast";

import { AddGuestsDirectly } from "./add-guests-directly";
import { EventList } from "./event-list";
import { GenerateEmail } from "./generate-email";
import { ImportCSV } from "./import-csv";
import { SideBar } from "./side-bar";
import TopBar from "./top-bar";

// move outside components
const emailFormSchema = z.object({
  customMessage: z.string(),
  eventId: z.string(),
});

interface InviteGuestsProps {
  eventId: string;
  userName: string;
  onInviteComplete?: () => void;
}

const InviteGuests = ({
  eventId,
  userName,
  onInviteComplete,
}: InviteGuestsProps) => {
  const step = useInviteStep();
  const selectedEmails = useGuestEmails();
  const eventGuests = useEventGuests();
  const { setStep, resetStore } = useInviteGuestActions();
  const { mutate: sendInvites } = api.guest.invite.useMutation();
  const [isLoading, setIsLoading] = useState(false);
  const sendInvitationEmails = (emails: string[], customMessage: string) => {
    setIsLoading(true);
    sendInvites(
      { emails, customMessage, eventId },
      {
        onSuccess: () => {
          toast({ title: "Emails are succesfully sent!" });
          setIsLoading(false);
          resetStore();
          onInviteComplete && onInviteComplete();
        },
        onError: () => {
          toast({ title: "Sending emails failed.", variant: "destructive" });
          setIsLoading(false);
        },
      },
    );
  };

  const emailForm = useForm<z.infer<typeof emailFormSchema>>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      eventId: eventId,
      customMessage: "",
    },
  });
  const onSubmit = (values: z.infer<typeof emailFormSchema>) => {
    sendInvitationEmails(selectedEmails, values.customMessage);
  };
  const onErrors = (errors: unknown) => {
    toast({ title: "Frontend error, check console. Send email form" });
    console.log({ errors });
  };
  return (
    <section className="flex h-[90%] w-full flex-col md:relative md:size-full">
      {/* Desktop&Mobile design */}
      <section className="flex max-h-[95%] min-h-[95%] w-full  flex-col gap-4 md:min-h-[90%]  md:flex-row md:items-start md:gap-0">
        {/* Side bar */}
        {/* <div className="flex h-fit gap-0 md:h-full"> */}
        <SideBar className="hidden md:flex" />
        <TopBar className="flex md:hidden" />
        <Separator
          orientation="vertical"
          className="hidden bg-accent-foreground/20 md:flex"
        />
        {/* </div> */}
        {/* Add emails */}
        <div className="flex max-h-[92%] min-h-[92%]  px-4 md:size-full md:max-h-full md:px-4  md:pt-5">
          {step === "add-emails" && <AddEmails />}
          {step === "search-guests" && (
            <SearchGuests eventGuests={eventGuests} />
          )}
          {step === "generate-email" && (
            <Form {...emailForm}>
              <form
                onSubmit={emailForm.handleSubmit(onSubmit, onErrors)}
                className="flex size-full p-0"
                id="email-form"
              >
                <FormField
                  control={emailForm.control}
                  name="customMessage"
                  render={({ field }) => (
                    <FormItem className="size-full">
                      <FormControl className="size-full">
                        <GenerateEmail
                          value={field.value ?? ""}
                          onChange={field.onChange}
                          eventId={eventId}
                          userName={userName}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          )}
          {step === "add-guests-directly" && <AddGuestsDirectly />}
          {step === "import-CSV" && <ImportCSV />}
          {step === "list-events" && <EventList />}
        </div>
      </section>
      <Separator className=" bg-white/20" />
      {/* <div className="flex  items-center justify-center px-2 pt-4 md:size-full"> */}
      {step !== "generate-email" && step !== "add-guests-directly" && (
        <div className="flex  size-full items-center justify-between  px-4">
          <Button
            variant={"ghost"}
            className={cn(
              "pl-2 text-sm font-semibold text-accent-foreground/50 transition-all hover:bg-transparent hover:text-primary",
              selectedEmails.length > 0 &&
                step === "add-emails" &&
                "text-primary",
            )}
            type="button"
            onClick={() => {
              if (step !== "add-emails") setStep("add-emails");
              else if (step === "add-emails") {
                setStep("search-guests");
              }
            }}
            disabled={selectedEmails.length === 0}
          >
            {selectedEmails.length} Selected
          </Button>
          <Button
            variant={"default"}
            onClick={() => setStep("generate-email")}
            className="gap-2"
            disabled={selectedEmails.length === 0}
          >
            Next
            <ChevronRightIcon size={16} />
          </Button>
        </div>
      )}
      {(step === "generate-email" || step === "add-guests-directly") && (
        <div className="flex size-full items-center justify-between  px-4">
          <Button
            variant={"secondary"}
            onClick={() => setStep("add-emails")}
            className="gap-2"
          >
            <ChevronLeftIcon size={16} />
            Back
          </Button>
          <Button
            variant={"default"}
            className="gap-2"
            type="submit"
            form="email-form"
          >
            {!isLoading && <SendIcon size={16} />}
            {isLoading && (
              <svg
                className="size-5 animate-spin text-accent-foreground"
                viewBox="0 0 24 24"
              >
                <LoaderCircleIcon />
              </svg>
            )}
            {!isLoading && `Send Invites`}
            {isLoading && `Sending Invites...`}
          </Button>
        </div>
      )}
      {/* </div> */}
    </section>
  );
};

export default InviteGuests;

// outside component
const formSchema = z.object({
  email: z.string().email(),
});

const AddEmails = () => {
  const emails = useGuestEmails();
  const { addEmail } = useInviteGuestActions();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = (value: z.infer<typeof formSchema>) => {
    console.log(value);
    addEmail(value.email);
    form.reset({ email: "" });
  };
  const onErrors = (errors: unknown) => {
    toast({ title: "Frontend error, check console" });
    console.log({ errors });
  };
  return (
    <section className="flex max-h-full flex-col md:size-full">
      <div className="flex flex-col gap-2">
        <Label className="font-semibold capitalize">Add Emails</Label>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, onErrors)}
            id="add-email-form"
            className="flex "
          >
            <div className="flex size-full gap-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex w-full gap-2">
                    <Input
                      type="search"
                      className="items-center bg-muted font-medium"
                      placeholder="Paste or enter emails here"
                      {...field}
                    />
                  </FormItem>
                )}
              />
              <Button
                variant={"secondary"}
                className="font-semibold"
                type="submit"
                form="add-email-form"
              >
                Add
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <ScrollArea className="flex h-full flex-col-reverse md:h-full">
        {emails.map((email, idx) => (
          <InviteEmail email={email} key={idx} />
        ))}
      </ScrollArea>
    </section>
  );
};

interface GuestEmailProps {
  email: string;
}

const GuestEmail = ({ email }: GuestEmailProps) => {
  const { emailExists } = useInviteGuestActions();
  const { removeEmail, addEmail } = useInviteGuestActions();
  const onClick = () => {
    if (!emailExists(email)) addEmail(email);
    else if (emailExists(email)) removeEmail(email);
  };

  return (
    <div
      className="flex items-center justify-between rounded-lg p-2 text-accent-foreground/90 transition-all hover:cursor-pointer hover:bg-accent-foreground/10"
      onClick={onClick}
    >
      <div className="flex items-center gap-2">
        <div className="flex size-6 items-center justify-center rounded-full bg-accent-foreground/10 text-center">
          <p className="uppercase">{email[0]}</p>
        </div>
        <p className="text-sm font-medium">{email}</p>
      </div>
      <div className="flex items-center gap-4">
        {emailExists(email) && <CircleCheckIcon size={20} />}
        {!emailExists(email) && (
          <CircleIcon size={20} className="text-accent-foreground/30" />
        )}
      </div>
    </div>
  );
};

interface InviteEmailProps {
  email: string;
}
const InviteEmail = ({ email }: InviteEmailProps) => {
  const { removeEmail } = useInviteGuestActions();
  return (
    <div className="flex items-center justify-between rounded-lg p-2 text-accent-foreground/90 transition-all">
      <div className="flex items-center gap-2">
        <div className="flex size-6 items-center justify-center rounded-full bg-accent-foreground/10 text-center">
          <p className="uppercase">{email[0]}</p>
        </div>
        <p className="text-sm font-medium">{email}</p>
      </div>
      <Button
        onClick={() => {
          removeEmail(email);
        }}
        className="flex size-fit items-center justify-center rounded-full bg-transparent p-2 text-destructive hover:bg-destructive hover:text-accent-foreground"
      >
        <XIcon size={20} className="m-0" />
      </Button>
    </div>
  );
};
interface SearchGuestsProps {
  eventGuests: Array<string>;
}
const SearchGuests = ({ eventGuests }: SearchGuestsProps) => {
  const [select, setSelect] = useState<"select" | "deselect">("select");

  const { addEmails, removeEmails } = useInviteGuestActions();
  const eventName = useGuestSelectedEvent();
  const selectAllGuestsHandler = () => {
    if (select === "select") {
      addEmails(eventGuests);
      setSelect("deselect");
    }
    if (select === "deselect") {
      removeEmails(eventGuests);
      setSelect("select");
    }
  };

  return (
    <section className="flex w-full  flex-col gap-2">
      <Label className="font-semibold capitalize">Search Guests</Label>
      <div className="">
        <Input
          type="search"
          placeholder={`Search in "${eventName}"`}
          className="w-full bg-muted"
        />
      </div>
      <div className="flex justify-end px-2">
        <Button
          variant={"ghost"}
          className="bg-none p-0 capitalize text-accent-foreground/50 transition-all hover:bg-transparent hover:text-accent-foreground"
          onClick={() => selectAllGuestsHandler()}
        >
          <p>
            {select === "select" && "select all"}
            {select === "deselect" && "deselect all"}
          </p>
        </Button>
      </div>
      <div className="flex w-full flex-col gap-2">
        {eventGuests?.map((guestEmail, idx) => (
          <GuestEmail email={guestEmail} key={idx} />
        ))}
      </div>
    </section>
  );
};

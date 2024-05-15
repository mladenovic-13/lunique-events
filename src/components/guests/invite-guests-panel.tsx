import React from "react";
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
import { useParams } from "next/navigation";
import { z } from "zod";

import {
  useEventGuests,
  useGuestEmails,
  useGuestSelectedEvent,
  useInviteGuestActions,
  useInviteStep,
} from "@/hooks/use-guest-store";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { toast } from "../ui/use-toast";

import { AddGuestsDirectly } from "./add-guests-directly";
import { GenerateEmail } from "./generate-email";
import { ImportCSV } from "./import-csv";
import { SideBar } from "./side-bar";

// move outside components
const emailFormSchema = z.object({
  customMessage: z.string(),
  eventId: z.string(),
});

interface InviteGuestsMenuProps {
  prop?: string;
}

export const InviteGuests = ({}: InviteGuestsMenuProps) => {
  // Internal states on start
  const step = useInviteStep();
  const selectedEmails = useGuestEmails();
  const eventGuests = useEventGuests();
  const { setStep, resetStore } = useInviteGuestActions();
  const { mutate: sendInvites, isLoading: sendingEmails } =
    api.guest.invite.useMutation();

  const sendInvitationEmails = (
    emails: string[],
    customMessage: string,
    eventId: string,
  ) => {
    sendInvites(
      { emails, customMessage, eventId },
      {
        onSuccess: () => {
          toast({ title: "Emails are succesfully sent!" });
          resetStore();
        },
        onError: () =>
          toast({ title: "Sending emails failed.", variant: "destructive" }),
      },
    );
  };

  const emailForm = useForm<z.infer<typeof emailFormSchema>>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      eventId: useParams().eventId as string,
      customMessage: "",
    },
  });
  // rename -> onSubmit
  const onSubmit = (values: z.infer<typeof emailFormSchema>) => {
    sendInvitationEmails(selectedEmails, values.customMessage, values.eventId);
  };
  const onErrors = (errors: unknown) => {
    toast({ title: "Frontend error, check console. Send email form" });
    console.log({ errors });
  };
  return (
    <section className="flex w-full flex-col pb-4">
      <section className="flex items-start gap-2">
        {/* Side menu */}
        <div className="max-w-[240px] pt-4">
          <SideBar />
        </div>
        <Separator orientation="vertical" className="bg-accent-foreground/20" />
        {/* Add emails */}
        <div className="flex w-full flex-col pt-4">
          {step === "add-emails" && <AddEmails emails={selectedEmails} />}
          {step === "search-guests" && (
            <div className="flex flex-col gap-4">
              <SearchGuests eventGuests={eventGuests} />
            </div>
          )}
          {step === "generate-email" && (
            // Wrap whole "invite-guests-menu" with form provider
            <Form {...emailForm}>
              <form
                onSubmit={emailForm.handleSubmit(onSubmit, onErrors)}
                className="flex w-full"
                id="email-form"
              >
                <FormField
                  control={emailForm.control}
                  name="customMessage"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <GenerateEmail
                          value={field.value ?? ""}
                          onChange={field.onChange}
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
        </div>
      </section>
      <Separator className="bg-white/20" />
      <div className="pt-6">
        {step !== "generate-email" && step !== "add-guests-directly" && (
          <div className="flex justify-between">
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
          <div className="flex justify-between">
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
              // onClick={() => sendInvitationEmails(selectedEmails)}
              disabled={sendingEmails}
              type="submit"
              form="email-form"
            >
              {!sendingEmails && <SendIcon size={16} />}
              {sendingEmails && (
                <svg
                  className="size-5 animate-spin text-accent-foreground"
                  viewBox="0 0 24 24"
                >
                  <LoaderCircleIcon />
                </svg>
              )}
              {!sendingEmails && `Send Invites`}
              {sendingEmails && `Sending Invites...`}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

// outside component
const formSchema = z.object({
  email: z.string().email(),
});

interface AddEmailsProps {
  emails: Array<string>;
}
const AddEmails = ({ emails }: AddEmailsProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const { addEmail } = useInviteGuestActions();

  // const fnName = () => {}
  const onSubmit = (value: z.infer<typeof formSchema>) => {
    addEmail(value.email);
    form.reset({ email: "" });
  };
  const onErrors = (errors: unknown) => {
    toast({ title: "Frontend error, check console" });
    console.log({ errors });
  };
  return (
    <section className="flex flex-col  pt-2">
      <div className="flex flex-col gap-2">
        <Label className="font-semibold capitalize">Add Emails</Label>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, onErrors)}
            id="add-email-form"
          >
            <div className="flex gap-2">
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
      <div className="flex max-h-[475px]  flex-col gap-2 overflow-y-auto pt-3">
        {emails.map((email, idx) => (
          <InviteEmail email={email} key={idx} />
        ))}
      </div>
    </section>
  );
};

interface GuestEmailProps {
  email: string;
}

// create different components -> rm toggle
// get necessery data from parent component
// GuestEmailItem should be "dummy" component -> only display stuff
// remove check icon when adding emails one by one, replace TrachIcon with XIcon (<Button size="icon"><XIcon className="size-4"></Button>)
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
        <div className="flex size-8 items-center justify-center rounded-full bg-accent-foreground/10 text-center ">
          <p className="uppercase">{email[0]}</p>
        </div>
        <p className="font-semibold">{email}</p>
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
    <div className="flex items-center justify-between rounded-lg p-2 text-accent-foreground/90 transition-all hover:cursor-pointer hover:bg-accent-foreground/10">
      <div className="flex items-center gap-2">
        <div className="flex size-8 items-center justify-center rounded-full bg-accent-foreground/10 text-center ">
          <p className="uppercase">{email[0]}</p>
        </div>
        <p className="font-semibold">{email}</p>
      </div>
      <Button
        onClick={() => {
          removeEmail(email);
        }}
        className="flex size-fit  items-center justify-center rounded-full bg-transparent p-2 text-destructive hover:bg-destructive hover:text-accent-foreground"
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
  const { addEmails } = useInviteGuestActions();
  const eventName = useGuestSelectedEvent();
  const selectAllGuestsHandler = () => {
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
      <div className="flex flex-col gap-2 overflow-y-auto">
        {eventGuests?.map((guestEmail, idx) => (
          <GuestEmail email={guestEmail} key={idx} />
        ))}
      </div>
    </section>
  );
};

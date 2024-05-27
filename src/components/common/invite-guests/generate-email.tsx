import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TicketIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { z } from "zod";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { env } from "@/env.mjs";
import { useGuestEmails, useInviteGuestActions } from "@/hooks/use-guest-store";
import { cn } from "@/lib/utils";
import { paths } from "@/routes/paths";
import { api } from "@/trpc/react";

const emailFormSchema = z.object({
  customMessage: z.string(),
  eventId: z.string(),
});

interface GenerateEmailProps {
  eventId: string;
  onInviteComplete?: () => void;
  className?: string;
}

function GenerateEmail({
  className,
  onInviteComplete,
  eventId,
}: GenerateEmailProps) {
  const userName = useSession().data?.user.name;
  const selectedEmails = useGuestEmails();
  const { setStep, setEmailSending, resetStore } = useInviteGuestActions();
  const eventLandingPage = `${env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}${paths.event.landing.root(eventId)}`;

  const { mutate: sendInvites } = api.invite.send.useMutation();
  const sendInvitationEmails = (emails: string[], customMessage: string) => {
    setEmailSending(true);
    sendInvites(
      { emails, customMessage, eventId },
      {
        onSuccess: () => {
          toast({ title: "Emails are succesfully sent!" });
          resetStore();
          onInviteComplete && onInviteComplete();
        },
        onError: () => {
          toast({ title: "Sending emails failed.", variant: "destructive" });
          setEmailSending(false);
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
    <div
      className={cn(
        "flex flex-col gap-2 text-sm md:gap-4 md:text-base",
        className && className,
      )}
    >
      <div className="flex w-full flex-col rounded-lg border-[1.5px] border-accent-foreground/10 bg-muted ">
        <p className="p-4">
          Hello, <br />
          <strong>{userName}</strong> has invited you to the event.
        </p>
        <Form {...emailForm}>
          <form
            onSubmit={emailForm.handleSubmit(onSubmit, onErrors)}
            className=""
            id="new-send-invites-form"
          >
            <FormField
              control={emailForm.control}
              name="customMessage"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      className="min-h-28 rounded-none border-none bg-accent-foreground/10"
                      placeholder="Add a custom message here..."
                      value={field.value ?? ""}
                      onChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
        <div className="p-4">
          <strong>RVSP:</strong>
          <br />
          <p className="line-clamp-2">{eventLandingPage}</p>
        </div>
      </div>
      <div className="flex w-full items-center justify-between gap-2 md:justify-start">
        <div className="flex size-8 items-center justify-center rounded-md bg-accent-foreground/10  p-1.5">
          <TicketIcon className="text-accent-foreground/80" />
        </div>
        <p>We will send guests an invite link to register for the event.</p>
      </div>
      <Separator />
      <p className="text-xs font-medium leading-6 text-accent-foreground/50">
        You can bypass registration and payment by adding guests directly to the
        guest list.{" "}
        <a
          className="text-primary/50 transition-all hover:cursor-pointer hover:text-primary "
          onClick={() => {
            setStep("add-guests-directly");
          }}
        >
          Add Guests Directly
        </a>{" "}
      </p>
    </div>
  );
}

export default GenerateEmail;

"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/trpc/react";
import {
  type RegistrationData,
  registrationDefaultValues,
  registrationSchema,
} from "@/validation/register-guest";

interface RegisterGuestProps {
  eventId: string;
  inviteId: string | null;
}

export const RegisterGuest = ({ eventId, inviteId }: RegisterGuestProps) => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const { data: rules, isLoading: isLoadingRules } =
    api.event.getRegistration.useQuery({
      eventId: eventId,
    });
  const { data: invite, isLoading: isLoadingInvite } = api.invite.get.useQuery(
    { id: inviteId },
    { enabled: !!inviteId },
  );

  const { mutate: updateStatus } = api.invite.updateStatus.useMutation();

  const onGuestRegistered = () => {
    if (inviteId) updateStatus({ id: inviteId, status: "GOING" });

    setIsRegistered(true);
    setIsOpen(false);
    router.refresh();
  };

  const isLoadingForm = isLoadingInvite || isLoadingRules;
  const isGuestRegistered = isRegistered || invite?.status === "GOING";

  if (isLoadingRules || isLoadingInvite)
    return <div>TODO: Loading Skeleton...</div>;

  return (
    <Card>
      <CardHeader className="rounded-t-lg bg-card-foreground/5 px-3 py-2">
        <CardTitle className="text-sm">Registration</CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        {!isGuestRegistered && (
          <p>Welcome! To join the event, please register below.</p>
        )}
        {isGuestRegistered && (
          <p>You have successfully registered for the event</p>
        )}
      </CardContent>
      {!isGuestRegistered && (
        <CardFooter className="p-3">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="w-full">Register</Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm">
              <DialogHeader>
                <DialogTitle>Your info</DialogTitle>
              </DialogHeader>

              {!isLoadingForm && (
                <RegistrationForm
                  eventId={eventId}
                  email={invite?.email}
                  fields={{
                    name: rules?.name,
                    linkedIn: rules?.linkedIn,
                    website: rules?.website,
                  }}
                  onSuccess={onGuestRegistered}
                />
              )}
            </DialogContent>
          </Dialog>
        </CardFooter>
      )}
    </Card>
  );
};

interface RegistrationFormProps {
  eventId: string;
  onSuccess: () => void;
  email?: string;
  fields?: {
    name?: boolean;
    website?: boolean;
    linkedIn?: boolean;
  };
}

const RegistrationForm = ({
  eventId,
  fields,
  email = "",
  onSuccess,
}: RegistrationFormProps) => {
  const form = useForm<RegistrationData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: { ...registrationDefaultValues },
  });

  const { mutate: registerGuest } = api.guest.create.useMutation();

  const { toast } = useToast();

  useEffect(() => {
    if (email) form.setValue("email", email);
  }, [email, form]);

  const onSubmit = (values: RegistrationData) => {
    let hasErrors = false;

    if (fields) {
      if (fields.name && !values.name) {
        form.setError("name", { message: "Please enter your name" });
        hasErrors = true;
      }
      if (fields.website && !values.website) {
        form.setError("website", { message: "Please enter your website" });
        hasErrors = true;
      }
      if (fields.linkedIn && !values.linkedIn) {
        form.setError("linkedIn", {
          message: "Please enter your LinkedIn profile",
        });
        hasErrors = true;
      }
    }

    if (hasErrors) return;

    registerGuest(
      { eventId, ...values },
      {
        onSuccess: () => {
          onSuccess();

          toast({
            title: "You have successfully registered for the event",
          });
        },
        onError: () =>
          toast({
            variant: "destructive",
            title: "Failed to register for event",
          }),
      },
    );
  };

  const onErrors = (errors: unknown) => {
    console.log({ errors });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onErrors)}
        className="space-y-5"
      >
        <div className="space-y-3">
          {fields?.name && (
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="you@email.com"
                    type="email"
                    {...field}
                    value={email ? email : field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {fields?.website && (
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="www.website.com"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {fields?.linkedIn && (
            <FormField
              control={form.control}
              name="linkedIn"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>LinkedIn</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://www.linkedin.com/in/your-id"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
        <Button className="w-full">Register</Button>
      </form>
    </Form>
  );
};

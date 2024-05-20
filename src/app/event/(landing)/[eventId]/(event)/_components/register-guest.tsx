"use client";

import React, { useState } from "react";
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

  const { data: rules, isLoading: isLoadingRules } =
    api.event.getRegistration.useQuery({
      eventId: eventId,
    });
  const { data: invite, isLoading: isLoadingInvite } = api.invite.get.useQuery(
    { id: inviteId },
    { enabled: !!inviteId },
  );

  const router = useRouter();

  const isLoadingForm = isLoadingInvite || isLoadingRules;

  if (isLoadingRules || isLoadingInvite)
    return <div>TODO: Loading Skeleton...</div>;

  return (
    <Card>
      <CardHeader className="rounded-t-lg bg-card-foreground/5 px-3 py-2">
        <CardTitle className="text-sm">Registration</CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        {!isRegistered && (
          <p>Welcome! To join the event, please register below.</p>
        )}
        {isRegistered && <p>You have successfully registered for the event</p>}
      </CardContent>
      {!isRegistered && (
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
                  fields={{
                    name: rules?.name,
                    linkedIn: rules?.linkedIn,
                    website: rules?.website,
                  }}
                  onSuccess={() => {
                    setIsRegistered(true);
                    setIsOpen(false);
                    router.refresh();
                  }}
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
  onSuccess: (args: { name?: string | null; email?: string | null }) => void;
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
}: RegistrationFormProps) => {
  const form = useForm<RegistrationData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: { ...registrationDefaultValues, email },
  });

  const { mutate: registerGuest } = api.guest.create.useMutation();

  const { toast } = useToast();

  const onSubmit = (values: RegistrationData) => {
    registerGuest(
      { eventId, ...values },
      {
        onSuccess: (guest) => {
          // onSuccess({ name: guest?.name, email: guest?.email });
          toast({
            title:
              "You have successfully registered for the event" +
              guest?.id.toString(),
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
                  <Input placeholder="you@email.com" type="email" {...field} />
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
          {fields?.website && (
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

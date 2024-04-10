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

export const RegisterGuest = ({ eventId }: { eventId: string }) => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

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

              <RegistrationForm
                eventId={eventId}
                onSuccess={() => {
                  setIsRegistered(true);
                  setIsOpen(false);
                  router.refresh();
                }}
              />
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
}

const RegistrationForm = ({ onSuccess, eventId }: RegistrationFormProps) => {
  const form = useForm<RegistrationData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: registrationDefaultValues,
  });

  const { mutate: registerGuest } = api.guest.create.useMutation();

  const { toast } = useToast();

  const onSubmit = (values: RegistrationData) => {
    registerGuest(
      { eventId, ...values },
      {
        onSuccess: (guest) => {
          onSuccess({ name: guest?.name, email: guest?.email });
          toast({ title: "You have successfully registered for the event" });
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
        </div>
        <Button className="w-full">Register</Button>
      </form>
    </Form>
  );
};

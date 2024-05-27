import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Guest } from "@prisma/client";

import { Button } from "@/components/ui/button";
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

interface RegistrationFormProps {
  eventId: string;
  onSuccess: (guest: Guest) => void;
  email?: string;
  isInvited: boolean;
  fields?: {
    name?: boolean;
    website?: boolean;
    linkedIn?: boolean;
  };
}

export const RegistrationForm = ({
  eventId,
  fields,
  email = "",
  onSuccess,
  isInvited,
}: RegistrationFormProps) => {
  const form = useForm<RegistrationData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: { ...registrationDefaultValues },
  });

  const { mutate: registerGuest } = api.guest.create.useMutation();

  const { toast } = useToast();

  const utils = api.useUtils();

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
      { eventId, ...values, isInvited },
      {
        onSuccess: (guest) => {
          utils.invalidate().catch(() => ({}));
          onSuccess(guest);

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

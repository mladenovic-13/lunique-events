import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/use-toast";
import { useGuestEmails, useInviteGuestActions } from "@/hooks/use-guest-store";
import { cn } from "@/lib/utils";

import AddedEmail from "./added-email";

const formSchema = z.object({
  email: z.string().email(),
});

interface AddEmailsProps {
  className?: string;
}
function AddEmails({ className }: AddEmailsProps) {
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
    <div className={cn("h-full", className && className)}>
      <h1 className="h-[7%] text-base font-medium md:text-base">Add Emails</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onErrors)}
          id="form-add-email"
          className="flex h-[10%] w-full gap-2 md:h-[9%]"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <Input
                  className="w-full bg-muted text-base"
                  placeholder="Paste or enter emails here"
                  {...field}
                />
              </FormItem>
            )}
          />
          <Button
            variant={"secondary"}
            type="submit"
            form="form-add-email"
            className="bg-muted text-accent-foreground/80"
          >
            Add
          </Button>
        </form>
      </Form>
      <ScrollArea className="h-[83%] md:h-[86%]">
        {emails.map((email, idx) => (
          <AddedEmail email={email} key={idx} />
        ))}
      </ScrollArea>
    </div>
  );
}

export default AddEmails;

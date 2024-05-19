import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, SendIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { type z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { contactFormSchema } from "@/lib/validation";
import { api } from "@/trpc/react";

const ContactForm = () => {
  const userEmail = useSession().data?.user.email ?? "";
  const userName = useSession().data?.user.name ?? "";

  const { mutate: sendMessage } = api.contact.send.useMutation();

  const contactForm = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      email: userEmail,
      fullname: userName,
    },
  });
  const onSubmit = (values: z.infer<typeof contactFormSchema>) => {
    sendMessage(
      { ...values },
      {
        onSuccess: () => {
          toast({ title: "Message is succesfully sent!" });
        },
        onError: () => {
          toast({ title: "Sending message failed.", variant: "destructive" });
        },
      },
    );
  };
  return (
    <Form {...contactForm}>
      <form
        onSubmit={contactForm.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 md:w-2/5 md:gap-4"
      >
        <FormField
          control={contactForm.control}
          name="fullname"
          render={({ field }) => (
            <FormItem className="transition-all md:hover:pl-2">
              <FormLabel className="md:text-xs">Full name</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Daniel Dalen" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={contactForm.control}
          name="email"
          render={({ field }) => (
            <FormItem className="transition-all md:hover:pl-2">
              <FormLabel className="md:text-xs">Email</FormLabel>
              <FormControl>
                <Input placeholder="Ex: danieldalen@gmail.com" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={contactForm.control}
          name="message"
          render={({ field }) => (
            <FormItem className="transition-all md:hover:pl-2">
              <FormLabel className="md:text-xs">Message</FormLabel>
              <FormControl>
                <Textarea
                  className="md:min-h-32"
                  placeholder="Type your question..."
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="flex w-full justify-center gap-2 transition-all md:w-fit md:justify-start md:hover:gap-4"
        >
          Send message
          <SendIcon className="block size-4 md:hidden" />
          <ArrowRight className="hidden size-5 md:block" />
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;

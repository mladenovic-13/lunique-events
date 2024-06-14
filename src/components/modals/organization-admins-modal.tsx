"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UsersRoundIcon } from "lucide-react";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useModal } from "@/hooks/use-modal-store";
import { api } from "@/trpc/react";

import { toast } from "../ui/use-toast";

const formSchema = z.object({
  email: z.string().email(),
});

export const OrganizationAdminsModal = () => {
  const { isOpen, type, onClose, data } = useModal();
  const { organizationId } = data;

  const { mutate: addAdmin } = api.organization.addAdmin.useMutation();

  const isModalOpen = isOpen && type === "org-admins";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!organizationId) return;

    addAdmin(
      { organizationId, ...values },
      {
        onSuccess: () => {
          toast({ title: "Admin succesfully added" });
        },
        onError: () => toast({ title: "Failed to add admin" }),
      },
    );
  }
  const onErrors = (errors: unknown) => {
    console.log({ errors });
  };

  if (!organizationId) return null;

  return (
    <Form {...form}>
      <Dialog open={isModalOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-[350]">
          <form
            onSubmit={form.handleSubmit(onSubmit, onErrors)}
            className="flex flex-col space-y-4"
          >
            <DialogHeader className="space-y-4 text-left">
              <div className="size-fit rounded-full bg-muted p-2">
                <UsersRoundIcon size={40} />
              </div>
              <DialogTitle className="text-xl">Add Admin</DialogTitle>
              <DialogDescription>
                Add admins by entering their email addresses. They don’t need to
                have an existing LuniqueEvents account.
              </DialogDescription>
            </DialogHeader>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter email here" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="flex-row gap-1.5">
              <Button className=" flex-1">Add Admin</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Form>
  );
};

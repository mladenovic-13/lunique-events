"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { paths } from "@/routes/paths";
import { api } from "@/trpc/react";

import { CoverInput } from "./cover-input";
import { SlugInput } from "./slug-input";
import { ThemeInput } from "./theme-input";
import { ThumbnailInput } from "./thumbnail-input";
import {
  type CalendarSchema,
  calendarSchema,
  defaultValues,
} from "./validation";

export const CreateCalendarForm = () => {
  const methods = useForm({
    resolver: zodResolver(calendarSchema),
    defaultValues: defaultValues,
  });

  const { mutate: organizationCreate } = api.organization.create.useMutation();
  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = (data: CalendarSchema) => {
    organizationCreate(data, {
      onSuccess: (calendar) => {
        toast({ title: "Calendar created" });
        router.push(paths.calendar.manage.events(calendar.id));
      },
      onError: () =>
        toast({ variant: "destructive", title: "Failed to create calendar" }),
    });
  };

  const onErrors = (errors: unknown) => {
    console.log({ errors });
  };

  return (
    <form
      onSubmit={methods.handleSubmit(onSubmit, onErrors)}
      className="space-y-5"
    >
      <Card>
        <Controller
          control={methods.control}
          name="coverImageUrl"
          render={({ field }) => (
            <CoverInput value={field.value} onChange={field.onChange} />
          )}
        />

        <div className="space-y-3 p-3 pt-16">
          <Controller
            control={methods.control}
            name="thumbnailImageUrl"
            render={({ field }) => (
              <ThumbnailInput value={field.value} onChange={field.onChange} />
            )}
          />

          <Input
            type="text"
            placeholder="Calendar Name"
            className="rounded-none border-x-0 border-b border-t-0 bg-transparent text-xl shadow-none transition duration-300 hover:border-accent-foreground/80 focus-visible:ring-0 md:text-2xl"
            {...methods.register("name")}
          />
          <Input
            placeholder="Add a short description"
            className="border-none text-sm shadow-none transition duration-300 hover:placeholder:text-accent-foreground/80 focus-visible:ring-0"
            {...methods.register("description")}
          />
        </div>
      </Card>
      <Card className="space-y-3 p-3">
        <h2 className="font-semibold">Customization</h2>
        <div className="flex flex-col gap-5 md:flex-row">
          <div className="flex flex-1 flex-col gap-3">
            <Controller
              control={methods.control}
              name="theme"
              render={({ field }) => (
                <ThemeInput value={field.value} onChange={field.onChange} />
              )}
            />
            <Controller
              control={methods.control}
              name="slug"
              render={({ field }) => (
                <SlugInput value={field.value} onChange={field.onChange} />
              )}
            />
          </div>
        </div>
      </Card>
      <Button className="w-full md:w-fit" type="submit">
        Create Calendar
      </Button>
    </form>
  );
};

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import * as z from "zod";

import { useStepper } from "@/components/common/stepper";
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

import { ImageUpload } from "../image-upload";

import {
  StepContent,
  StepDescriptiom,
  StepFooter,
  StepFormContainer,
  StepHeader,
  StepTitle,
} from "./common";

const formSchema = z.object({
  name: z.string(),
  thumbnailUrl: z.string(),
  description: z.string(),
  public: z.boolean(),
});

type BasicDetails = z.infer<typeof formSchema>;

const defaultValues: BasicDetails = {
  name: "",
  description: "",
  public: true,
  thumbnailUrl: "",
};

export const EventBasicDetailsStep = () => {
  const { isDisabledStep, nextStep, prevStep } = useStepper();

  const form = useForm({
    defaultValues,
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: BasicDetails) => {
    console.log({ values });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <StepContent>
          <StepFormContainer className="grid grid-cols-1 gap-3 md:grid-cols-5 md:gap-16">
            <div className="md:col-span-2">
              <FormField
                control={form.control}
                name="thumbnailUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ImageUpload
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-2 md:col-span-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter youre event name" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={10}
                        placeholder="Enter youre event short description..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </StepFormContainer>
          <StepFooter className="justify-between pt-10">
            <Button
              type="button"
              disabled={isDisabledStep}
              onClick={prevStep}
              variant="secondary"
              size="sm"
            >
              <ChevronLeftIcon className="mr-1.5 size-4" /> Back
            </Button>
            <Button type="button" size="sm" onClick={nextStep}>
              Continue
              <ChevronRightIcon className="ml-1.5 size-4" />
            </Button>
          </StepFooter>
        </StepContent>
      </form>
    </Form>
  );
};

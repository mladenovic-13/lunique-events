"use client";

import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Libraries, useLoadScript } from "@react-google-maps/api";
import { ChevronRightIcon } from "lucide-react";
import * as z from "zod";

import { useStepper } from "@/components/common/stepper";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { env } from "@/env.mjs";

import { EventLocationInput } from "../inputs/event-location-input";
import { LocationMap } from "../location-map";

import {
  StepContainer,
  StepContent,
  StepDescription,
  StepFooter,
  StepHeader,
  StepTitle,
} from "./common";

const formSchema = z.object({
  // input: z.string().min(3, { message: "Please enter event location" }),
  map: z
    .object({
      placeId: z.string(),
      description: z.string(),
      mainText: z.string(),
      secondaryText: z.string(),
      position: z.object({
        lat: z.number(),
        lng: z.number(),
      }),
    })
    .nullable(),
});

type Location = z.infer<typeof formSchema>;

const defaultValues: Location = {
  // input: "",
  map: null,
};

const defaultPosition = { lat: 52.3676, lng: 4.9041 };

export const EventLocationStep = () => {
  const { isDisabledStep, nextStep } = useStepper();

  const libraries = useMemo<Libraries>(() => ["places"], []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    preventGoogleFontsLoading: true,
    libraries,
  });

  const onSubmit = (values: Location) => {
    console.log({ values });
    nextStep();
  };

  const map = form.watch("map");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <StepContainer>
          <StepHeader>
            <StepTitle>Location</StepTitle>
            <StepDescription>
              Enter event location. Offline location or virtual link
            </StepDescription>
          </StepHeader>
          {isLoaded && (
            <StepContent className="grid gap-3 md:grid-cols-2 md:gap-5">
              <div className="order-2 md:order-1">
                <LocationMap position={map?.position ?? defaultPosition} />
              </div>
              <div className="order-1 md:order-2">
                <FormField
                  control={form.control}
                  name="map"
                  render={({ field }) => (
                    <FormItem className="mx-auto max-w-lg">
                      <FormControl>
                        <EventLocationInput
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </StepContent>
          )}
          <StepFooter className="justify-end gap-3">
            <Button
              type="button"
              size="sm"
              disabled={isDisabledStep}
              onClick={nextStep}
              variant="ghost"
            >
              Skip for now
            </Button>
            <Button size="sm">
              Continue
              <ChevronRightIcon className="ml-1.5 size-4" />
            </Button>
          </StepFooter>
        </StepContainer>
      </form>
    </Form>
  );
};

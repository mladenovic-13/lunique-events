"use client";

import React, { type HTMLAttributes, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { MapPinIcon, SearchIcon, XIcon } from "lucide-react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import { Button } from "@/components/ui/button";
import { useFormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { type Place } from "@/types";

export const EventLocationInput = (props: {
  value: Place | null | undefined;
  onChange: (place: Place | null) => void;
  className?: string;
}) => {
  const { onChange, className } = props;

  const field = useFormField();
  const form = useFormContext();

  const {
    ready,
    value: autocompleteValue,
    setValue: setAutocompleteValue,
    suggestions: { status, data },
    clearCache,
    clearSuggestions,
  } = usePlacesAutocomplete();

  const onSelect = useCallback(
    async (value: string) => {
      const place = data.find((item) => item.place_id === value);
      if (!place) return;

      const results = await getGeocode({ placeId: value });

      if (!results[0]) return;

      const position = getLatLng(results[0]);

      onChange({
        placeId: place.place_id,
        description: place.description,
        mainText: place.structured_formatting.main_text,
        secondaryText: place.structured_formatting.secondary_text,
        position,
      });

      clearSuggestions();
      clearCache();
      form.clearErrors();
    },
    [onChange, data, clearSuggestions, clearCache, form],
  );

  const handleClearLocation = () => {
    setAutocompleteValue("");
    onChange(null);
  };

  const isOpen = status === "OK" || status === "ZERO_RESULTS";

  return (
    <div className="relative">
      <div className="relative">
        <AutocompleteInput
          value={props.value ? props.value.description : autocompleteValue}
          onValueChange={setAutocompleteValue}
          disabled={!ready || !!props.value}
          placeholder="Enter location..."
          error={!!field.error}
          className={cn("w-full", className && className)}
        />
        {field.error && (
          <p className="text-[0.8rem] font-medium text-destructive">
            {field.error.message}
          </p>
        )}

        {props.value && (
          <div className="absolute right-0 top-0 flex size-9 items-center justify-center">
            <button
              onClick={handleClearLocation}
              className="flex size-6 items-center justify-center rounded-full bg-destructive transition duration-200 hover:scale-110"
            >
              <XIcon className="size-4 text-destructive-foreground" />
            </button>
          </div>
        )}
      </div>
      {isOpen && (
        <div className="absolute top-10 w-full rounded-md border">
          {!props.value && status === "OK" && (
            <AutocompleteResult>
              {data.map(({ place_id, description }) => (
                <AutocompleteResultItem
                  key={place_id}
                  value={place_id}
                  onSelect={onSelect}
                >
                  <MapPinIcon className="mr-1.5 size-4 min-w-fit" />
                  {description}
                </AutocompleteResultItem>
              ))}
            </AutocompleteResult>
          )}

          {status === "ZERO_RESULTS" && <AutocompleteResultEmpty />}
        </div>
      )}
    </div>
  );
};

interface AutocompleteInputProps extends HTMLAttributes<HTMLInputElement> {
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  error?: boolean;
}

const AutocompleteInput = ({
  value,
  onValueChange,
  className,
  disabled,
  placeholder,
  error,
  ...props
}: AutocompleteInputProps) => {
  return (
    <div className="relative w-full">
      <Input
        disabled={disabled}
        placeholder={placeholder}
        className={cn(
          "h-9 pl-10 disabled:opacity-100",
          error && "border-destructive",
          className,
        )}
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        {...props}
      />
      <div className="absolute left-0 top-0 flex size-10 items-center justify-center">
        <SearchIcon className="size-4" />
      </div>
    </div>
  );
};

const AutocompleteResultEmpty = () => (
  <div className="bg-popover px-3 py-2 text-sm text-muted-foreground">
    Looks like there is no results. Try again with different terms.
  </div>
);

interface AutocompleteResultProps {
  children: React.ReactNode;
}

const AutocompleteResult = (props: AutocompleteResultProps) => (
  <div className="space-y-1.5 overflow-x-auto rounded-b-md bg-popover p-1.5">
    {props.children}
  </div>
);

interface AutocompleteResultItemProps {
  value: string;
  onSelect: (value: string) => void;
  children?: React.ReactNode;
  disabled?: boolean;
}

const AutocompleteResultItem = (props: AutocompleteResultItemProps) => {
  const { value, onSelect, disabled } = props;

  return (
    <Button
      type="button"
      disabled={disabled}
      variant="ghost"
      onClick={() => onSelect(value)}
      className="flex w-full items-center justify-start px-3 hover:bg-accent/50"
    >
      {props.children}
    </Button>
  );
};

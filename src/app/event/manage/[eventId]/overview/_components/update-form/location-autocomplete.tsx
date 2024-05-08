import { type HTMLAttributes, useCallback, useEffect, useState } from "react";
import { MapPinIcon, SearchIcon } from "lucide-react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { type Place } from "@/types";

export const PlacesAutocomplete = (props: {
  onChange: (place: Place) => void;
  defaultValue?: string;
}) => {
  const { onChange, defaultValue } = props;
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
  } = usePlacesAutocomplete();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setValue(defaultValue ?? "");
  }, [defaultValue, setValue]);

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
      setValue(place.description);
      setOpen(false);
    },
    [onChange, data, setOpen, setValue],
  );

  const isResultOpen = !!status;
  return (
    <div>
      <AutocompleteInput
        value={value}
        onValueChange={(val) => {
          setValue(val);
          setOpen(true);
        }}
        disabled={!ready}
        placeholder="Enter a location..."
      />
      {open && isResultOpen && (
        <AutocompleteResult>
          {open && isResultOpen && status === "OK" && (
            <AutocompleteResultGroup heading="Locations">
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
            </AutocompleteResultGroup>
          )}
          {open && isResultOpen && status === "ZERO_RESULTS" && (
            <AutocompleteResultEmpty />
          )}
        </AutocompleteResult>
      )}
    </div>
  );
};

interface AutocompleteInputProps extends HTMLAttributes<HTMLInputElement> {
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

const AutocompleteInput = ({
  value,
  onValueChange,
  className,
  disabled,
  placeholder,
  ...props
}: AutocompleteInputProps) => {
  return (
    <span className="relative">
      <Input
        disabled={disabled}
        placeholder={placeholder}
        className={cn(
          "h-10 items-center pl-10 shadow-none focus-visible:ring-0",
          className,
        )}
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        {...props}
      />
      <div className="absolute left-0 top-0 flex size-10 items-center justify-center">
        <SearchIcon className="size-4" />
      </div>
    </span>
  );
};

const AutocompleteResultEmpty = () => (
  <div className="px-3 py-2 text-sm text-muted-foreground">
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

interface AutocompleteResultGroupProps {
  heading?: string;
  children?: React.ReactNode;
}

const AutocompleteResultGroup = (props: AutocompleteResultGroupProps) => (
  <div>
    {props.heading && (
      <p className="px-3 py-2 text-sm font-semibold text-muted-foreground">
        {props.heading}
      </p>
    )}
    <div>{props.children}</div>
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

import { AvatarIcon } from "@/components/icons/avatar-icon";
import { CalendarIcon } from "@/components/icons/calendar-icon";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type EventWithOwner } from "@/types";
import { format } from "date-fns";
import {
  DownloadIcon,
  MapPinIcon,
  ShareIcon,
  SparklesIcon,
} from "lucide-react";

interface GallerySidebarProps {
  event: EventWithOwner;
}

export const GallerySidebar = ({ event }: GallerySidebarProps) => (
  <div className="space-y-3">
    <DetailsWidget event={event} />
    <ImageUploadWidget />
  </div>
);

const DetailsWidget = ({ event }: { event: EventWithOwner }) => (
  <Card className="w-full">
    <CardHeader>
      <CardTitle className="text-2xl font-bold">{event.name}</CardTitle>
      {event.owner && (
        <CardDescription>Hosted by {event.owner.name}</CardDescription>
      )}
    </CardHeader>
    <CardContent className="space-y-5 pb-10">
      <div className="flex items-center gap-3">
        <CalendarIcon date={event.date} />
        <div className="flex flex-col text-xl font-medium">
          <span>{format(event.date, "eeee, d MMMM")}</span>
          <span className="text-sm text-muted-foreground">
            {event.date.getFullYear()}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-md border">
          <MapPinIcon />
        </div>
        <div>
          <p className="text-xl font-medium">{event.location}</p>
          <span className="text-sm text-muted-foreground">
            {event.location}
          </span>
        </div>
      </div>
    </CardContent>
  </Card>
);

const ImageUploadWidget = () => (
  <Card className="w-full">
    <CardHeader>
      <CardTitle className="text-2xl font-bold">Upload Your Image</CardTitle>
      <CardDescription>
        We utilize facial recognition to find all your images
      </CardDescription>
    </CardHeader>
    <CardContent className="flex flex-col items-center gap-8">
      <div className="flex flex-col gap-5">
        <div className="flex cursor-pointer flex-col items-center gap-3">
          <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-muted-foreground">
            <AvatarIcon className="h-24 w-24 fill-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">
            Drag n drop or click here to upload image
          </p>
        </div>
        <Button className="mx-auto">
          <SparklesIcon className="mr-1.5 h-4 w-4" />
          Find My Images
        </Button>
      </div>
      <div className="flex gap-1.5">
        <Button size="icon" variant="secondary" className="rounded-full ">
          <DownloadIcon className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="secondary" className="rounded-full">
          <ShareIcon className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="secondary" className="rounded-full">
          <DownloadIcon className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="secondary" className="rounded-full">
          <ShareIcon className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="secondary" className="rounded-full">
          <ShareIcon className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="secondary" className="rounded-full">
          <ShareIcon className="h-4 w-4" />
        </Button>
      </div>
    </CardContent>
  </Card>
);

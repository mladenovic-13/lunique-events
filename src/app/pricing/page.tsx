import { CheckIcon, XIcon } from "lucide-react";

import { MainPage } from "@/components/layout/main-page";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PricingPage() {
  return (
    <MainPage>
      <div className="space-y-2 py-5">
        <h1 className="text-center text-3xl font-semibold">Pricing</h1>
        <p className="text-center text-muted-foreground">
          Use Lunique Events for free, forever. <br /> No credit card
          information asked. No trial period.
        </p>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        <Card>
          <CardHeader className="border-b">
            <p className="text-xl font-semibold">Personal</p>
            <CardTitle className="text-4xl">$0</CardTitle>
          </CardHeader>
          <CardContent className="py-10">
            <ul className="space-y-2">
              <li className="flex items-center gap-3">
                <CheckIcon className="size-5" />
                Unlimited events
              </li>
              <li className="flex items-center gap-3">
                <CheckIcon className="size-5" />
                Beautiful event pages
              </li>
              <li className="flex items-center gap-3">
                <CheckIcon className="size-5" />
                Unlimited event guests
              </li>
              <li className="flex items-center gap-3">
                <CheckIcon className="size-5" />
                Up to 500 weekly invites
              </li>
              <li className="flex items-center gap-3">
                <XIcon className="size-5 text-muted" />
                Create up to 3 organizations
              </li>
              <li className="flex items-center gap-3">
                <XIcon className="size-5 text-muted" />
                Event gallery
              </li>
              <li className="flex items-center gap-3">
                <XIcon className="size-5 text-muted" />
                Upload up to 1000 pictures
              </li>
              <li className="flex items-center gap-3">
                <XIcon className="size-5 text-muted" />
                Unlimited selfie searches
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="secondary" className="w-full">
              Get Started
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="border-b">
            <p className="text-xl font-semibold">Lunique Events Plus</p>
            <CardTitle className="text-4xl">$19</CardTitle>
          </CardHeader>
          <CardContent className="py-10">
            <ul className="space-y-2">
              <li className="flex items-center gap-3">
                <CheckIcon className="size-5" />
                Unlimited events
              </li>
              <li className="flex items-center gap-3">
                <CheckIcon className="size-5" />
                Beautiful event pages
              </li>
              <li className="flex items-center gap-3">
                <CheckIcon className="size-5" />
                Unlimited event guests
              </li>
              <li className="flex items-center gap-3">
                <CheckIcon className="size-5" />
                Up to 500 weekly invites
              </li>
              <li className="flex items-center gap-3">
                <CheckIcon className="size-5" />
                Create up to 3 organizations
              </li>
              <li className="flex items-center gap-3">
                <CheckIcon className="size-5" />
                Event gallery
              </li>
              <li className="flex items-center gap-3">
                <CheckIcon className="size-5" />
                Upload up to 1000 pictures
              </li>
              <li className="flex items-center gap-3">
                <CheckIcon className="size-5" />
                Unlimited selfie searches
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Get Now</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="border-b">
            <p className="text-xl font-semibold">Enterprise</p>
            <CardTitle className="text-4xl">Custom</CardTitle>
          </CardHeader>
          <CardContent className="py-10">
            <p className="text-muted-foreground">
              If you have more complex requests, please contact us.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="secondary" className="w-full">
              Contact Us
            </Button>
          </CardFooter>
        </Card>
      </div>
    </MainPage>
  );
}

import { MainPage } from "@/components/layout/main-page";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { UserDetailsForm } from "./_components/user-details-form";

export default function WelcomePage() {
  return (
    <MainPage>
      <h1 className="py-3 text-center text-3xl font-bold">
        Welcome to Events by Lunique
      </h1>
      <Card>
        <CardHeader>
          <CardTitle>Let&apos;s personalize Your Experience</CardTitle>
          <CardDescription>
            Welcome to our event organization platform! We&apos;re thrilled to
            have you join us. Your experience here matters, so let&apos;s make
            it uniquely yours. Take a moment to add more details about yourself.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <UserDetailsForm />
        </CardContent>
      </Card>
    </MainPage>
  );
}

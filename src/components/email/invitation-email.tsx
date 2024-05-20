import { Body } from "@react-email/body";
import { Button, Img, Link } from "@react-email/components";
import { Container } from "@react-email/container";
import { Head } from "@react-email/head";
import { Heading } from "@react-email/heading";
import { Hr } from "@react-email/hr";
import { Html } from "@react-email/html";
import { Preview } from "@react-email/preview";
import { Section } from "@react-email/section";
import { Tailwind } from "@react-email/tailwind";
import { Text } from "@react-email/text";

interface InvitationEmailProps {
  customMessage: string;
  eventLandingPage: string;
  userName: string | null | undefined;
  logo: string;
}

export const InvitationEmail = ({
  customMessage,
  eventLandingPage,
  userName,
  logo,
}: InvitationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Preview text, change this</Preview>
      <Tailwind>
        <Body className="m-auto bg-white px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src={logo}
                alt="Lunique Events"
                width="40"
                height="37"
                className="object-cover"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              Be Part of the <strong>Story</strong>
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              Hello, <br />
              <strong>{userName}</strong> has invited you to the event.
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              {customMessage}
            </Text>
            <Section className="my-[32px]  text-center">
              <Button
                className="rounded bg-[#000000] px-5 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={`http://${eventLandingPage}`}
              >
                Register Now
              </Button>
            </Section>
            <Text className="text-[14px] leading-[24px] text-black">
              or copy and paste this URL into your browser:{" "}
              <Link
                href={`http://${eventLandingPage}`}
                className="text-blue-600 no-underline"
              >
                {`http://${eventLandingPage}`}
              </Link>
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <Text className="text-[12px] leading-[24px] text-[#666666]">
              This invitation, sent by{" "}
              <span className="text-black">{userName}</span>, comes to you from{" "}
              <span className="text-black">Lunique Events App.</span>
              If you were not expecting this invitation, you can ignore this
              email. If you are concerned about your account s safety, please
              reply to this email to get in touch with us.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

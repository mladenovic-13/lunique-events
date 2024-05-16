import { Body } from "@react-email/body";
import { Button, Img } from "@react-email/components";
import { Container } from "@react-email/container";
import { Head } from "@react-email/head";
import { Heading } from "@react-email/heading";
import { Hr } from "@react-email/hr";
import { Html } from "@react-email/html";
import { Preview } from "@react-email/preview";
import { Section } from "@react-email/section";
import { Tailwind } from "@react-email/tailwind";
import { Text } from "@react-email/text";

interface VerificationEmail {
  magicLink: string;
  logo: string;
}

export const VerificationEmail = ({ magicLink, logo }: VerificationEmail) => (
  <Html>
    <Head />
    <Preview>Your Access to Lunique Events is Ready!</Preview>
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
            <strong>We’re Excited You’re Here! </strong>
          </Heading>
          <Text className="text-[14px] leading-[24px] text-black">
            Hello,
            <strong>Lunique Events</strong> is ready for You!
          </Text>
          <Text className="text-[14px] leading-[24px] text-black">
            Create your next unforgettable event now.
          </Text>
          <Text className="text-[14px] leading-[24px] text-black">
            By clicking this button, you will be redirected to your account
            page.
          </Text>
          <Section className="my-[32px]  text-center">
            <Button
              className="rounded bg-[#000000] px-5 py-3 text-center text-[12px] font-semibold text-white no-underline"
              href={magicLink}
            >
              Sign In
            </Button>
          </Section>

          <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
          <Text className="text-[12px] leading-[24px] text-[#666666]">
            This link will only be valid for the next 5 minutes.
            <br />
            If you {"didn't"} try to login, you can safely ignore this email.
          </Text>
          <Text className="text-[12px] leading-[24px] text-[#666666]">
            Best, <br />
            <strong>Lunique Team</strong>
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

import { Body } from "@react-email/body";
import { Img } from "@react-email/components";
import { Container } from "@react-email/container";
import { Head } from "@react-email/head";
import { Heading } from "@react-email/heading";
import { Hr } from "@react-email/hr";
import { Html } from "@react-email/html";
import { Preview } from "@react-email/preview";
import { Section } from "@react-email/section";
import { Tailwind } from "@react-email/tailwind";
import { Text } from "@react-email/text";

interface CustomerSupportEmailProps {
  customerMessage: string;
  customerName: string | null | undefined;
  customerEmail: string | null | undefined;
  logo: string;
}

export const CustomerSupportEmail = ({
  customerMessage,
  customerName,
  customerEmail,
  logo,
}: CustomerSupportEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Customer sent a message</Preview>
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
              Here{"'"}s what <strong>{customerName}</strong> wrote
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              From <strong>{customerName}</strong> {`<${customerEmail}>`}
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              {customerMessage}
            </Text>

            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <Text className="text-[12px] leading-[24px] text-[#666666]">
              This email has been sent through the{" "}
              <strong>Lunique Events </strong> application. If this message
              seems suspicious to you or if you have any doubts, please feel
              free to contact us.
            </Text>
            <Text className="text-[12px] leading-[24px] text-[#666666]">
              Best, <br />
              <strong>Lunique Development Team</strong>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

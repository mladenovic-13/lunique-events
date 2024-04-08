import {
  Averia_Libre,
  Baumans,
  Limelight,
  Mallanna,
  Potta_One,
  Roboto,
} from "next/font/google";

import { type EventSchema } from "@/app/event/create/_components/validation";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});
const averiaLibre = Averia_Libre({
  weight: ["400"],
  subsets: ["latin"],
});
const limelight = Limelight({
  weight: ["400"],
  subsets: ["latin"],
});
const mallanna = Mallanna({
  weight: ["400"],
  subsets: ["latin"],
});
const baumans = Baumans({
  weight: ["400"],
  subsets: ["latin"],
});
const pottaOne = Potta_One({
  weight: ["400"],
  subsets: ["latin"],
});

type Font = {
  name: EventSchema["theme"]["font"];
  className: string;
};

export const fonts: Font[] = [
  { name: "ROBOTO", className: roboto.className },
  { name: "BOREL", className: averiaLibre.className },
  { name: "LIMELIGHT", className: limelight.className },
  { name: "MALLANNA", className: mallanna.className },
  { name: "BAUMANS", className: baumans.className },
  { name: "POTTA_ONE", className: pottaOne.className },
];

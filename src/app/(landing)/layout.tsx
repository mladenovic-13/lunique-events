import { Footer } from "@/components/navigation/footer";
import { Navbar } from "@/components/navigation/navbar";

export default function ExploreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

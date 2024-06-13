export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <Navbar /> */}
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  );
}

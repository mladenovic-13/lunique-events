import { StepIndicator } from "./_components/step-indicator";

export default function ExploreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-4xl">
      <StepIndicator />
      {children}
    </div>
  );
}

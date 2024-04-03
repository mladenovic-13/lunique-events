import { Input } from "@/components/ui/input";

export const NameInput = () => {
  return (
    <Input
      type="text"
      placeholder="Calendar Name"
      className="rounded-none border-x-0 border-b border-t-0 bg-transparent text-xl shadow-none transition duration-300 hover:border-accent-foreground/80 focus-visible:ring-0 md:text-2xl"
    />
  );
};

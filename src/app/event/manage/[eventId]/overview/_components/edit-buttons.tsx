import { Button } from "@/components/ui/button";

interface EditButtonsProps {
  onClick: () => void;
}
export const EditButtons = ({ onClick }: EditButtonsProps) => {
  return (
    <div className="flex w-1/2  items-center justify-between pl-2">
      <Button
        variant={"secondary"}
        // onClick={() => setIsEditable(true)}
        className="w-[49%]"
      >
        Change Photo
      </Button>
      <Button onClick={onClick} className="w-[49%]">
        Edit Event
      </Button>
    </div>
  );
};

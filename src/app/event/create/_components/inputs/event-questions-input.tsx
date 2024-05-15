import { useEffect, useState } from "react";
import { PlusIcon, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface EventQuestionsInputProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export const EventQuestionsInput = ({
  value,
  onChange,
}: EventQuestionsInputProps) => {
  const [question, setQuestion] = useState("");
  const [error, setError] = useState("");

  const handleAddQuestion = () => {
    if (value.length === 3) {
      setError("You can have maximum 3 custom questions");
      return;
    }
    if (!question) return;

    onChange([...value, question]);
    setQuestion("");
  };

  const handleDeleteQuestion = (idx: number) => {
    onChange(value.filter((_, _idx) => _idx !== idx));
  };

  useEffect(() => {
    if (value.length < 3) setError("");
  }, [value]);

  return (
    <div className="flex w-full flex-col gap-3">
      {value.length > 0 && (
        <ul className="flex flex-col gap-2">
          {value.map((question, idx) => (
            <QuestionItem
              key={idx}
              label={question}
              onDelete={() => handleDeleteQuestion(idx)}
            />
          ))}
        </ul>
      )}
      {error && <p className="text-center text-sm text-destructive">{error}</p>}

      <div className="flex w-full flex-col gap-3 md:flex-row">
        <Input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter your custom question here"
          className="h-8 w-full"
        />
        <Button type="button" size="sm" onClick={handleAddQuestion}>
          <PlusIcon className="mr-1.5 size-4" />
          Add Question
        </Button>
      </div>
    </div>
  );
};

const QuestionItem = ({
  label,
  onDelete,
}: {
  label: string;
  onDelete: () => void;
}) => {
  return (
    <li className="flex items-center gap-3 text-sm">
      <Button type="button" size="icon" variant="ghost" onClick={onDelete}>
        <XIcon className="size-4" />
      </Button>
      <span>{label}</span>
    </li>
  );
};

import { useEffect, useState } from "react";

interface UseActionKeyProps {
  onArrowRight: () => void;
  onArrowLeft: () => void;
  onImageSelect: () => void;
}

export const useActionKeys = ({
  onArrowLeft,
  onArrowRight,
  onImageSelect,
}: UseActionKeyProps) => {
  const [state, setState] = useState<boolean>(false);

  useEffect(() => {
    if (!onArrowLeft || !onArrowRight) return;

    const handleArrowKeyDown = (event: KeyboardEvent) => {
      const { key } = event;
      if (key === "ArrowLeft") onArrowLeft();
      if (key === "ArrowRight") onArrowRight();
      if (key === "s") onImageSelect();
    };

    setState(true);

    window.addEventListener("keydown", handleArrowKeyDown);

    return () => window.removeEventListener("keydown", handleArrowKeyDown);
  }, [onArrowLeft, onArrowRight, onImageSelect]);

  return state;
};

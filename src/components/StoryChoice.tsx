
import { useState } from "react";
import { Choice } from "@/data/stories";
import { cn } from "@/lib/utils";

interface StoryChoiceProps {
  choices: Choice[];
  onSelect: (choice: Choice) => void;
}

const StoryChoice = ({ choices, onSelect }: StoryChoiceProps) => {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);

  const handleSelect = (choice: Choice) => {
    setSelectedChoice(choice.id);
    // Add a small delay to show the selection before moving to next node
    setTimeout(() => {
      onSelect(choice);
    }, 500);
  };

  return (
    <div className="mt-8 space-y-4 animate-fade-in">
      <h3 className="text-xl font-display font-semibold mb-4">What will you do?</h3>
      {choices.map((choice) => (
        <button
          key={choice.id}
          onClick={() => handleSelect(choice)}
          disabled={selectedChoice !== null}
          className={cn(
            "choice-button",
            selectedChoice === choice.id && "selected"
          )}
        >
          {choice.text}
        </button>
      ))}
    </div>
  );
};

export default StoryChoice;

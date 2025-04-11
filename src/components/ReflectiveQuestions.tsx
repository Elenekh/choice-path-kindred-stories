
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ReflectiveQuestionsProps {
  questions: string[];
  reflection?: string;
  onComplete: (answers: Record<string, string>) => void;
}

const ReflectiveQuestions = ({ 
  questions, 
  reflection, 
  onComplete 
}: ReflectiveQuestionsProps) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleAnswer = (question: string, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [question]: answer
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onComplete(answers);
    }
  };

  // Show custom reflection question if provided
  const allQuestions = reflection 
    ? [reflection, ...questions.slice(0, 2)] 
    : questions.slice(0, 3);

  const currentQuestion = allQuestions[currentIndex];

  return (
    <div className="mt-8 animate-fade-in">
      <h3 className="text-xl font-display font-semibold mb-2">
        Thoughts & Reflections
      </h3>
      <p className="text-muted-foreground mb-6">
        Take a moment to think about the story and share your thoughts.
      </p>
      
      <div className="bg-story-soft p-6 rounded-xl">
        <h4 className="text-lg mb-4">{currentQuestion}</h4>
        <Textarea
          value={answers[currentQuestion] || ''}
          onChange={(e) => handleAnswer(currentQuestion, e.target.value)}
          placeholder="Type your thoughts here..."
          className="min-h-[120px] mb-4"
        />
        <Button 
          onClick={handleNext}
          disabled={!answers[currentQuestion]}
          className="w-full"
        >
          {currentIndex < allQuestions.length - 1 ? "Next Question" : "Complete Reflection"}
        </Button>
      </div>
      
      <div className="mt-4 flex justify-center">
        <div className="flex gap-2">
          {allQuestions.map((_, index) => (
            <div 
              key={index} 
              className={`h-2 w-8 rounded-full ${
                index === currentIndex ? "bg-story-primary" : 
                index < currentIndex ? "bg-story-secondary" : "bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReflectiveQuestions;

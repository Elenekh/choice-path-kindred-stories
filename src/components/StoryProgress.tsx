
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface StoryProgressProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  disableNext?: boolean;
}

const StoryProgress = ({ 
  currentStep, 
  totalSteps, 
  onNext, 
  onPrevious, 
  disableNext = false 
}: StoryProgressProps) => {
  const [animating, setAnimating] = useState(false);

  // Animation effect when changing steps
  useEffect(() => {
    setAnimating(true);
    const timer = setTimeout(() => setAnimating(false), 300);
    return () => clearTimeout(timer);
  }, [currentStep]);

  const progress = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-muted-foreground">Step {currentStep} of {totalSteps}</span>
        <span className="text-sm font-medium">{progress}% Complete</span>
      </div>
      
      <div className="w-full bg-muted rounded-full h-2.5 mb-4">
        <div 
          className="bg-story-primary h-2.5 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onPrevious}
          disabled={currentStep === 1}
          className="flex items-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" />
          Previous
        </Button>
        
        <Button 
          size="sm" 
          onClick={onNext}
          disabled={disableNext || currentStep === totalSteps}
          className={`flex items-center gap-1 ${animating ? 'animate-pulse' : ''}`}
        >
          Next
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default StoryProgress;

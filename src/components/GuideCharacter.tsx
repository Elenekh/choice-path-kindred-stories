
import React from 'react';
import { Tooltip } from "@/components/ui/tooltip";
import { TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface GuideCharacterProps {
  message?: string;
  mood?: 'happy' | 'curious' | 'thoughtful' | 'excited';
}

const GuideCharacter: React.FC<GuideCharacterProps> = ({ 
  message = "I'm here to guide you through the story!",
  mood = 'happy'
}) => {
  // Character images based on mood
  const characterImages = {
    happy: "/guide-happy.png",
    curious: "/guide-curious.png",
    thoughtful: "/guide-thoughtful.png",
    excited: "/guide-excited.png"
  };

  // Default to a placeholder image if no character images are available yet
  const imageSrc = characterImages[mood] || "/placeholder.svg";

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-bounce-slow">
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="relative cursor-pointer">
            <div className="w-20 h-20 overflow-hidden rounded-full bg-story-soft border-2 border-story-primary shadow-lg">
              <img 
                src={imageSrc} 
                alt="Guide Character" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent side="left" className="max-w-xs p-4 bg-white text-foreground">
          <p>{message}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default GuideCharacter;

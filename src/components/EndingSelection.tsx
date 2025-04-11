
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EndingImage } from "@/data/stories";
import { cn } from "@/lib/utils";

interface EndingSelectionProps {
  images: EndingImage[];
  onSelect: (image: EndingImage) => void;
}

const EndingSelection = ({ images, onSelect }: EndingSelectionProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (image: EndingImage) => {
    setSelectedId(image.id);
  };

  const handleConfirm = () => {
    if (selectedId) {
      const selected = images.find(img => img.id === selectedId);
      if (selected) {
        onSelect(selected);
      }
    }
  };

  return (
    <div className="mt-8 animate-fade-in">
      <h3 className="text-xl font-display font-semibold mb-4">
        Choose an image that shows how you would continue the story:
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {images.map((image) => (
          <Card 
            key={image.id}
            className={cn(
              "overflow-hidden cursor-pointer transition-all duration-300 hover:ring-2 hover:ring-story-primary",
              selectedId === image.id ? "ring-2 ring-story-primary" : "ring-transparent"
            )}
            onClick={() => handleSelect(image)}
          >
            <div className="aspect-video relative">
              <img 
                src={image.src} 
                alt={image.description} 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="p-4">
              <p className="text-sm">{image.description}</p>
            </div>
          </Card>
        ))}
      </div>
      
      <Button 
        onClick={handleConfirm} 
        disabled={!selectedId}
        className="w-full"
      >
        Confirm Selection
      </Button>
    </div>
  );
};

export default EndingSelection;

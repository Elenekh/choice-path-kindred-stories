
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Smile, Frown, Meh, ThumbsUp, Heart, HeartCrack } from 'lucide-react';
import { toast } from 'sonner';

type Mood = 'happy' | 'sad' | 'neutral' | 'excited' | 'loving' | 'hurt';

interface MoodOption {
  value: Mood;
  label: string;
  icon: React.ReactNode;
  color: string;
}

const MoodDashboard = () => {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);

  const moodOptions: MoodOption[] = [
    { value: 'happy', label: 'Happy', icon: <Smile size={32} />, color: 'text-yellow-500' },
    { value: 'sad', label: 'Sad', icon: <Frown size={32} />, color: 'text-blue-500' },
    { value: 'neutral', label: 'Neutral', icon: <Meh size={32} />, color: 'text-gray-500' },
    { value: 'excited', label: 'Excited', icon: <ThumbsUp size={32} />, color: 'text-green-500' },
    { value: 'loving', label: 'Loving', icon: <Heart size={32} />, color: 'text-red-500' },
    { value: 'hurt', label: 'Hurt', icon: <HeartCrack size={32} />, color: 'text-purple-500' },
  ];

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
    toast.success(`You're feeling ${mood}!`);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center">How are you feeling today?</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          {moodOptions.map((mood) => (
            <Button
              key={mood.value}
              variant="outline"
              className={`flex flex-col items-center p-4 h-auto ${selectedMood === mood.value ? 'ring-2 ring-story-primary' : ''}`}
              onClick={() => handleMoodSelect(mood.value)}
            >
              <div className={`mb-2 ${mood.color}`}>{mood.icon}</div>
              <span>{mood.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MoodDashboard;

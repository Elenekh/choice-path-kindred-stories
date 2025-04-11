
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Compass, Map, MapPin, Rocket, Star } from "lucide-react";
import { useAuth } from "@/App";
import { toast } from "@/components/ui/use-toast";

const storyLevels = [
  {
    id: "forest-adventure",
    title: "Forest Adventure",
    description: "Explore the enchanted forest and make new friends along the way.",
    icon: <Map className="h-12 w-12 text-emerald-600" />,
    color: "bg-emerald-100 hover:bg-emerald-200",
    textColor: "text-emerald-800",
    iconBg: "bg-emerald-50",
    available: true,
  },
  {
    id: "magic-castle",
    title: "Magic Castle",
    description: "Discover the secrets hidden inside the mysterious castle.",
    icon: <Star className="h-12 w-12 text-indigo-600" />,
    color: "bg-indigo-100 hover:bg-indigo-200",
    textColor: "text-indigo-800",
    iconBg: "bg-indigo-50",
    available: true,
  },
  {
    id: "space-journey",
    title: "Space Journey",
    description: "Blast off to the stars and explore distant planets.",
    icon: <Rocket className="h-12 w-12 text-purple-600" />,
    color: "bg-purple-100 hover:bg-purple-200",
    textColor: "text-purple-800",
    iconBg: "bg-purple-50",
    available: false,
  },
];

const ChildLanding = () => {
  const navigate = useNavigate();
  const { userType } = useAuth();
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  // Redirect to child portal with the selected story
  const startStory = (levelId: string) => {
    setSelectedLevel(levelId);
    setTimeout(() => {
      navigate(`/child?story=${levelId}`);
    }, 500);
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center pt-8 pb-16"
      style={{ 
        backgroundImage: "url('https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&q=80')",
        backgroundAttachment: "fixed"
      }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 mb-8 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="h-8 w-8 text-story-primary" />
              <h1 className="text-3xl font-display font-bold">Choose Your Adventure</h1>
            </div>
            <p className="text-lg text-gray-700">
              Select the story path you'd like to explore today. Each journey offers unique challenges and discoveries.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {storyLevels.map((level) => (
              <Card 
                key={level.id} 
                className={`transition-all duration-300 ${
                  selectedLevel === level.id ? "ring-4 ring-story-primary" : ""
                } ${level.available ? "opacity-100" : "opacity-60"}`}
              >
                <CardHeader className={`${level.color} rounded-t-lg`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className={`text-xl ${level.textColor}`}>{level.title}</CardTitle>
                      <CardDescription className="text-black/70 mt-1">
                        {level.description}
                      </CardDescription>
                    </div>
                    <div className={`${level.iconBg} p-3 rounded-full`}>
                      {level.icon}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4" />
                    <span>New adventure awaiting</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Compass className="h-4 w-4" />
                    <span>Multiple paths to explore</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => level.available && startStory(level.id)} 
                    disabled={!level.available}
                    className="w-full"
                    variant={level.available ? "default" : "outline"}
                  >
                    {level.available ? "Begin Journey" : "Coming Soon"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChildLanding;

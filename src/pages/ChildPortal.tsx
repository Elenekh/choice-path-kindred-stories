
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Story, 
  StoryNode, 
  Choice, 
  EndingImage,
  sampleStory, 
  endingImages,
  reflectiveQuestions 
} from "@/data/stories";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StoryContent from "@/components/StoryContent";
import StoryChoice from "@/components/StoryChoice";
import EndingSelection from "@/components/EndingSelection";
import ReflectiveQuestions from "@/components/ReflectiveQuestions";
import StoryProgress from "@/components/StoryProgress";
import GuideCharacter from "@/components/GuideCharacter";
import MoodDashboard from "@/components/MoodDashboard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

type StoryState = {
  currentNodeId: string;
  visitedNodes: string[];
  choices: Record<string, Choice>;
  endingImage?: EndingImage;
  reflections: Record<string, string>;
};

// Main story steps
type StoryStep = 'mood' | 'story' | 'question' | 'ending-selection' | 'reflection' | 'completed';

const ChildPortal = () => {
  const navigate = useNavigate();
  const [story, setStory] = useState<Story>(sampleStory);
  const [storyState, setStoryState] = useState<StoryState>({
    currentNodeId: story.startNodeId,
    visitedNodes: [story.startNodeId],
    choices: {},
    reflections: {}
  });
  const [currentNode, setCurrentNode] = useState<StoryNode | null>(null);
  const [storyStep, setStoryStep] = useState<StoryStep>('mood');
  const [storyPage, setStoryPage] = useState<number>(1);
  const [guideMessage, setGuideMessage] = useState("Hello! How are you feeling today?");
  const [guideMood, setGuideMood] = useState<'happy' | 'curious' | 'thoughtful' | 'excited'>('happy');

  // Load the current node based on storyState
  useEffect(() => {
    const node = story.nodes.find(n => n.id === storyState.currentNodeId);
    if (node) {
      setCurrentNode(node);
      
      if (node.type === 'ending' && storyStep === 'story') {
        setStoryStep('ending-selection');
      }
    }
  }, [storyState.currentNodeId, story.nodes, storyStep]);

  // Update guide character based on story step
  useEffect(() => {
    switch (storyStep) {
      case 'mood':
        setGuideMessage("Hello! How are you feeling today?");
        setGuideMood('happy');
        break;
      case 'story':
        setGuideMessage("Let me tell you a story. You'll get to make choices!");
        setGuideMood('excited');
        break;
      case 'question':
        setGuideMessage("What do you think happens next?");
        setGuideMood('curious');
        break;
      case 'ending-selection':
        setGuideMessage("How would you like the story to end?");
        setGuideMood('thoughtful');
        break;
      case 'reflection':
        setGuideMessage("Let's think about the story together.");
        setGuideMood('thoughtful');
        break;
      case 'completed':
        setGuideMessage("Thank you for sharing your thoughts!");
        setGuideMood('happy');
        break;
    }
  }, [storyStep]);

  const handleChoiceSelected = (choice: Choice) => {
    setStoryState(prev => ({
      ...prev,
      currentNodeId: choice.nextNodeId,
      visitedNodes: [...prev.visitedNodes, choice.nextNodeId],
      choices: {
        ...prev.choices,
        [prev.currentNodeId]: choice
      }
    }));
    setStoryStep('story');
  };

  const handleEndingSelected = (image: EndingImage) => {
    setStoryState(prev => ({
      ...prev,
      endingImage: image
    }));
    setStoryStep('reflection');
  };

  const handleReflectionComplete = (answers: Record<string, string>) => {
    setStoryState(prev => ({
      ...prev,
      reflections: answers
    }));
    setStoryStep('completed');
    
    // Here we'd normally save the data to a database
    // For now, we'll just show a success message and redirect
    toast.success("Story completed! Your responses have been saved.");
    
    // In a real app, we'd send this data to the parent's dashboard
    console.log("Story data collected:", {
      storyId: story.id,
      choices: storyState.choices,
      endingImage: storyState.endingImage,
      reflections: answers
    });
    
    // Redirect to the completion page or back to home
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  const handleNextPage = () => {
    // If we're in the story step, advance to the question step after page 2
    if (storyStep === 'story' && storyPage === 2) {
      setStoryStep('question');
      return;
    }
    
    setStoryPage(prev => prev + 1);
  };

  const handlePrevPage = () => {
    if (storyStep === 'question') {
      setStoryStep('story');
      setStoryPage(2);
      return;
    }
    setStoryPage(prev => Math.max(1, prev - 1));
  };

  const handleMoodComplete = () => {
    setStoryStep('story');
  };

  // Get total steps for the progress component
  const getTotalSteps = () => {
    if (storyStep === 'story') return 3; // Two story pages + question page
    if (storyStep === 'question') return 3; // Same total steps for question page
    return 1; // Default
  };

  // Get current step for the progress component
  const getCurrentStep = () => {
    if (storyStep === 'story') return storyPage;
    if (storyStep === 'question') return 3; // Question is the 3rd step
    return 1; // Default
  };

  return (
    <div className="min-h-screen flex flex-col bg-cover bg-center" 
         style={{ backgroundImage: "url('https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1600&q=80')" }}>
      <Header />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="story-container backdrop-blur-sm bg-white/95">
            <h1 className="text-3xl font-bold mb-2 text-story-primary">
              {story.title}
            </h1>
            
            <div className="mt-8">
              {storyStep === 'mood' && (
                <div className="animate-fade-in">
                  <p className="text-lg mb-6">Before we begin our adventure, let's check in on how you're feeling today!</p>
                  <MoodDashboard />
                  <Button onClick={handleMoodComplete} className="mt-6 w-full">
                    Start the Story
                  </Button>
                </div>
              )}
              
              {currentNode && storyStep === 'story' && (
                <div className="animate-fade-in">
                  <StoryContent node={currentNode} />
                  
                  <div className="mt-6">
                    <StoryProgress 
                      currentStep={getCurrentStep()} 
                      totalSteps={getTotalSteps()}
                      onNext={handleNextPage}
                      onPrevious={handlePrevPage}
                    />
                  </div>
                </div>
              )}
              
              {storyStep === 'question' && currentNode && (
                <div className="animate-fade-in">
                  <Card className="p-6 border-story-primary">
                    <h3 className="text-xl font-bold mb-4">What happens next?</h3>
                    <p className="mb-6">{currentNode.content}</p>
                    
                    {currentNode.choices && currentNode.choices.length > 0 && (
                      <StoryChoice 
                        choices={currentNode.choices} 
                        onSelect={handleChoiceSelected} 
                      />
                    )}
                  </Card>
                  
                  <div className="mt-6">
                    <StoryProgress 
                      currentStep={getCurrentStep()} 
                      totalSteps={getTotalSteps()}
                      onNext={() => {}}
                      onPrevious={handlePrevPage}
                      disableNext={true}
                    />
                  </div>
                </div>
              )}
              
              {storyStep === 'ending-selection' && (
                <div>
                  <StoryContent node={currentNode!} />
                  <EndingSelection 
                    images={endingImages} 
                    onSelect={handleEndingSelected} 
                  />
                </div>
              )}
              
              {storyStep === 'reflection' && currentNode && (
                <div>
                  <StoryContent node={currentNode} />
                  <ReflectiveQuestions 
                    questions={reflectiveQuestions}
                    reflection={currentNode.reflection}
                    onComplete={handleReflectionComplete}
                  />
                </div>
              )}
              
              {storyStep === 'completed' && (
                <div className="text-center py-10 animate-fade-in">
                  <h2 className="text-2xl font-bold mb-4">
                    Thanks for completing the story!
                  </h2>
                  <p className="mb-6">
                    Your responses have been saved. A report has been generated for your parents.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Redirecting you to the home page...
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <GuideCharacter message={guideMessage} mood={guideMood} />
      <Footer />
    </div>
  );
};

export default ChildPortal;

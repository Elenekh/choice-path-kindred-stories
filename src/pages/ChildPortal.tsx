
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
import { toast } from "sonner";

type StoryState = {
  currentNodeId: string;
  visitedNodes: string[];
  choices: Record<string, Choice>;
  endingImage?: EndingImage;
  reflections: Record<string, string>;
};

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
  const [storyPhase, setStoryPhase] = useState<'story' | 'ending-selection' | 'reflection' | 'completed'>('story');

  // Load the current node based on storyState
  useEffect(() => {
    const node = story.nodes.find(n => n.id === storyState.currentNodeId);
    if (node) {
      setCurrentNode(node);
      
      if (node.type === 'ending' && storyPhase === 'story') {
        setStoryPhase('ending-selection');
      }
    }
  }, [storyState.currentNodeId, story.nodes, storyPhase]);

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
  };

  const handleEndingSelected = (image: EndingImage) => {
    setStoryState(prev => ({
      ...prev,
      endingImage: image
    }));
    setStoryPhase('reflection');
  };

  const handleReflectionComplete = (answers: Record<string, string>) => {
    setStoryState(prev => ({
      ...prev,
      reflections: answers
    }));
    setStoryPhase('completed');
    
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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="story-container">
            <h1 className="text-3xl font-bold mb-2 text-story-primary">
              {story.title}
            </h1>
            
            <div className="mt-8">
              {currentNode && storyPhase === 'story' && (
                <>
                  <StoryContent node={currentNode} />
                  {currentNode.choices && currentNode.choices.length > 0 && (
                    <StoryChoice 
                      choices={currentNode.choices} 
                      onSelect={handleChoiceSelected} 
                    />
                  )}
                </>
              )}
              
              {storyPhase === 'ending-selection' && (
                <div>
                  <StoryContent node={currentNode!} />
                  <EndingSelection 
                    images={endingImages} 
                    onSelect={handleEndingSelected} 
                  />
                </div>
              )}
              
              {storyPhase === 'reflection' && currentNode && (
                <div>
                  <StoryContent node={currentNode} />
                  <ReflectiveQuestions 
                    questions={reflectiveQuestions}
                    reflection={currentNode.reflection}
                    onComplete={handleReflectionComplete}
                  />
                </div>
              )}
              
              {storyPhase === 'completed' && (
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
      
      <Footer />
    </div>
  );
};

export default ChildPortal;

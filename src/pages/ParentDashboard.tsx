
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ParentInsightReport from "@/components/ParentInsightReport";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BookOpen, BookOpenCheck, BarChart3 } from "lucide-react";

// Mock data for parent dashboard
const mockChildData = {
  name: "Alex",
  age: 10,
  completedStories: [
    {
      id: "story1",
      title: "The Lost Treasure",
      completionDate: "April 10, 2025",
      traits: [
        { 
          name: "Empathy", 
          value: 75, 
          description: "Shows strong ability to understand others' feelings" 
        },
        { 
          name: "Caution", 
          value: 60, 
          description: "Tends to consider potential risks before acting" 
        },
        { 
          name: "Social Interest", 
          value: 85, 
          description: "Highly interested in social connection and cooperation" 
        },
        { 
          name: "Adventure", 
          value: 45, 
          description: "Moderate interest in new experiences and challenges" 
        },
      ],
      observations: [
        "Tends to consider others' feelings when making decisions",
        "Shows preference for cooperation over individual achievement",
        "Evaluates risks but is willing to try new experiences",
        "Values friendships and social connections highly"
      ],
      reflections: {
        "Have you ever found something unexpected that made you happy?": "Yes, I found a bird nest in our backyard and watched the baby birds grow up. It wasn't what I expected but it made me really happy to see them learn to fly.",
        "Do you prefer exploring with friends or by yourself?": "I like having friends with me because it's more fun to share discoveries and they might see things I miss.",
        "What's the most interesting place you've discovered?": "There's a hollow tree in the park that has all kinds of interesting bugs and plants growing inside it. It's like a tiny ecosystem!"
      }
    }
  ]
};

const ParentDashboard = () => {
  const [activeStory, setActiveStory] = useState(mockChildData.completedStories[0]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Parent Dashboard</h1>
          <p className="text-muted-foreground mb-8">
            View insights and reports from your child's story experiences
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div className="md:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Child Profile</CardTitle>
                  <CardDescription>Information about your child</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium">Name</p>
                      <p className="text-muted-foreground">{mockChildData.name}</p>
                    </div>
                    <div>
                      <p className="font-medium">Age</p>
                      <p className="text-muted-foreground">{mockChildData.age} years old</p>
                    </div>
                    <div>
                      <p className="font-medium">Stories Completed</p>
                      <p className="text-muted-foreground">{mockChildData.completedStories.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Completed Stories</CardTitle>
                  <CardDescription>Stories your child has experienced</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockChildData.completedStories.map((story) => (
                      <div 
                        key={story.id}
                        className="bg-story-soft hover:bg-story-soft/80 p-4 rounded-lg cursor-pointer"
                        onClick={() => setActiveStory(story)}
                      >
                        <div className="flex items-start gap-3">
                          <BookOpenCheck className="text-story-primary h-5 w-5 mt-1" />
                          <div>
                            <p className="font-medium">{story.title}</p>
                            <p className="text-sm text-muted-foreground">
                              Completed on {story.completionDate}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Professional Support</CardTitle>
                  <CardDescription>Connect with licensed professionals</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">
                    If you'd like professional insights about your child's story responses, 
                    you can schedule a session with a licensed child psychotherapist.
                  </p>
                  <Button className="w-full">
                    Schedule Consultation
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            {/* Main content */}
            <div className="md:col-span-2">
              <Tabs defaultValue="report" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="report" className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    <span>Story Report</span>
                  </TabsTrigger>
                  <TabsTrigger value="trends" className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    <span>Behavioral Trends</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="report">
                  <ParentInsightReport
                    childName={mockChildData.name}
                    storyTitle={activeStory.title}
                    completionDate={activeStory.completionDate}
                    traits={activeStory.traits}
                    observations={activeStory.observations}
                    reflections={activeStory.reflections}
                  />
                </TabsContent>
                
                <TabsContent value="trends">
                  <Card className="p-8 text-center">
                    <h3 className="text-xl font-semibold mb-4">Behavioral Trends Coming Soon</h3>
                    <p className="text-muted-foreground">
                      This feature will be available once your child completes more stories, 
                      allowing us to track changes and patterns over time.
                    </p>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ParentDashboard;

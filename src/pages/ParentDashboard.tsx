
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BookOpenCheck, FileSearch, RefreshCcw } from "lucide-react";

const ParentDashboard = () => {
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
                      <p className="text-muted-foreground">Alex</p>
                    </div>
                    <div>
                      <p className="font-medium">Age</p>
                      <p className="text-muted-foreground">10 years old</p>
                    </div>
                    <div>
                      <p className="font-medium">Stories Completed</p>
                      <p className="text-muted-foreground">1</p>
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
                    <div className="bg-story-soft hover:bg-story-soft/80 p-4 rounded-lg cursor-pointer">
                      <div className="flex items-start gap-3">
                        <BookOpenCheck className="text-story-primary h-5 w-5 mt-1" />
                        <div>
                          <p className="font-medium">The Lost Treasure</p>
                          <p className="text-sm text-muted-foreground">
                            Completed on April 10, 2025
                          </p>
                        </div>
                      </div>
                    </div>
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
            
            {/* Main content - AI Report only, removed behavioral trends */}
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>AI-Generated Insights</CardTitle>
                  <CardDescription>Based on your child's story choices and responses</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-8 rounded-lg bg-story-soft flex flex-col items-center justify-center min-h-[300px]">
                    <RefreshCcw className="h-12 w-12 text-muted-foreground mb-4 animate-spin" />
                    <h3 className="text-xl font-semibold mb-2">Generating Insights</h3>
                    <p className="text-center text-muted-foreground">
                      Our AI is analyzing your child's responses to generate personalized insights.
                      This process helps identify behavioral patterns and emotional tendencies.
                    </p>
                  </div>
                  
                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">About AI-Generated Reports</h3>
                    <p className="text-sm text-muted-foreground">
                      These reports use advanced AI to analyze your child's story choices and reflective answers.
                      They provide observations about potential behavioral traits, not clinical diagnoses.
                      Reports are generated securely with complete privacy protection.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ParentDashboard;

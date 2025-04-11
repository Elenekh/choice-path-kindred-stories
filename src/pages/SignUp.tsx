
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

// Form schema
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const SignUp = () => {
  const [isParent, setIsParent] = useState(true);
  const navigate = useNavigate();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // This is where you would typically integrate with your backend
    console.log(values, isParent ? "parent" : "child");
    
    // For the prototype, just show a success message and redirect
    toast({
      title: "Account created!",
      description: `You've successfully signed up as a ${isParent ? "parent" : "child"}.`,
    });
    
    // Redirect to the appropriate dashboard
    setTimeout(() => {
      navigate(isParent ? "/parent" : "/child");
    }, 1500);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ 
        backgroundImage: "url('https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      <div className="container max-w-md px-4 py-8">
        <Card className="bg-white/95 backdrop-blur-sm shadow-xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-2">
              <BookOpen className="h-10 w-10 text-story-primary" />
            </div>
            <CardTitle className="text-2xl font-display">Join Secretia</CardTitle>
            <CardDescription>Create your account to get started</CardDescription>
          </CardHeader>
          
          <Tabs defaultValue="parent" className="w-full" onValueChange={(value) => setIsParent(value === "parent")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="parent">Parent</TabsTrigger>
              <TabsTrigger value="child">Child</TabsTrigger>
            </TabsList>
            
            <TabsContent value="parent">
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="yourname@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="w-full">Create Parent Account</Button>
                  </form>
                </Form>
              </CardContent>
            </TabsContent>
            
            <TabsContent value="child">
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Parent's Email</FormLabel>
                          <FormControl>
                            <Input placeholder="parent@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Choose a Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="w-full">Create Child Account</Button>
                  </form>
                </Form>
              </CardContent>
            </TabsContent>
          </Tabs>
          
          <CardFooter className="flex justify-center">
            <div className="text-sm text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-story-primary hover:underline">
                Log In
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;

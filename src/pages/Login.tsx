
import { useNavigate, Link } from "react-router-dom";
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
import { BookOpen } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

// Form schema
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

const Login = () => {
  const navigate = useNavigate();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // This is where you would typically integrate with your backend
    console.log(values);
    
    // Mock login logic for prototype
    const isParentEmail = values.email.includes("parent") || !values.email.includes("child");
    
    // Show success message
    toast({
      title: "Welcome back!",
      description: "You've successfully logged in.",
    });
    
    // Redirect to the appropriate dashboard
    setTimeout(() => {
      navigate(isParentEmail ? "/parent" : "/child");
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
            <CardTitle className="text-2xl font-display">Welcome Back</CardTitle>
            <CardDescription>Log in to your Secretia account</CardDescription>
          </CardHeader>
          
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
                
                <div className="text-sm">
                  <Link to="/forgot-password" className="text-story-primary hover:underline">
                    Forgot your password?
                  </Link>
                </div>
                
                <Button type="submit" className="w-full">Log In</Button>
              </form>
            </Form>
          </CardContent>
          
          <CardFooter className="flex justify-center">
            <div className="text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="text-story-primary hover:underline">
                Sign Up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;

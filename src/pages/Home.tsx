
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, HeartHandshake, ShieldCheck } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section with forest background */}
        <section 
          className="py-20 bg-cover bg-center text-white"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1600&q=80')", 
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="container mx-auto px-4 text-center">
            <div className="backdrop-blur-sm bg-black/30 p-8 rounded-xl max-w-2xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Discover Your Child's Mind
              </h1>
              <p className="text-xl max-w-2xl mx-auto mb-8">
                Interactive stories that help children express emotions while giving parents 
                valuable psychological insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-story-primary hover:bg-story-vivid">
                  <Link to="/child">Start a Story</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white/20">
                  <Link to="/parent">Parent Dashboard</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <div className="bg-story-soft p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="text-story-primary h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Interactive Stories</h3>
                <p className="text-muted-foreground">
                  Children navigate through engaging stories, making choices that reflect their thought processes.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <div className="bg-story-soft p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="text-story-primary h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Multiple Paths</h3>
                <p className="text-muted-foreground">
                  Stories branch into different endings based on choices, revealing personality traits and tendencies.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <div className="bg-story-soft p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <HeartHandshake className="text-story-primary h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Reflective Questions</h3>
                <p className="text-muted-foreground">
                  Gentle, therapist-designed questions encourage children to express their thoughts and feelings.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <div className="bg-story-soft p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck className="text-story-primary h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Parent Insights</h3>
                <p className="text-muted-foreground">
                  Parents receive meaningful reports about their child's behavioral traits and emotional responses.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section with forest background */}
        <section 
          className="py-16 bg-cover bg-center text-white"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=1600&q=80')", 
            backgroundSize: 'cover'
          }}
        >
          <div className="container mx-auto px-4 text-center">
            <div className="backdrop-blur-sm bg-black/30 p-8 rounded-xl max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-6">
                Begin Your Journey Today
              </h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
                Discover your child's emotional world through the power of interactive storytelling.
              </p>
              <Button asChild size="lg" variant="secondary">
                <Link to="/child">Start Your First Story</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;

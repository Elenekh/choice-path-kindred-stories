
import { Link } from "react-router-dom";
import { Shield, Heart, ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-story-soft py-8 mt-16">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-2">KindredStories</h3>
            <p className="text-sm text-muted-foreground max-w-md">
              Helping children express their emotions through interactive storytelling.
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-2">
            <div className="flex items-center gap-1 text-sm">
              <Shield className="h-4 w-4 text-story-primary" />
              <span>GDPR Compliant</span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Heart className="h-4 w-4 text-story-primary" />
              <span>Child-safety Focused</span>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              <Link to="/privacy" className="hover:underline flex items-center gap-1">
                Privacy Policy <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} KindredStories. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

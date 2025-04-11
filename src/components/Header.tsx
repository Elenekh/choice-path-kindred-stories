
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, User, LogIn } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white shadow-sm py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-story-primary" />
          <span className="text-xl font-display font-semibold">Secretia</span>
        </Link>
        <div className="flex gap-4">
          <Button asChild variant="outline">
            <Link to="/login" className="flex items-center gap-2">
              <LogIn className="h-4 w-4" />
              <span>Log In</span>
            </Link>
          </Button>
          <Button asChild>
            <Link to="/signup" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Sign Up</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;

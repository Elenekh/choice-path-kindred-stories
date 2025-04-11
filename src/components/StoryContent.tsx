
import { StoryNode } from "@/data/stories";

interface StoryContentProps {
  node: StoryNode;
}

const StoryContent = ({ node }: StoryContentProps) => {
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <img 
          src={node.image || "/placeholder.svg"} 
          alt="Story illustration" 
          className="w-full h-64 object-cover rounded-xl mb-4" 
        />
      </div>
      
      <div className="prose max-w-none">
        <p className="text-lg leading-relaxed">{node.content}</p>
      </div>
    </div>
  );
};

export default StoryContent;

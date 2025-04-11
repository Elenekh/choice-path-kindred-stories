
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface Trait {
  name: string;
  value: number;
  description: string;
}

interface ParentInsightReportProps {
  childName: string;
  storyTitle: string;
  completionDate: string;
  traits: Trait[];
  observations: string[];
  reflections: Record<string, string>;
}

const ParentInsightReport = ({
  childName,
  storyTitle,
  completionDate,
  traits,
  observations,
  reflections
}: ParentInsightReportProps) => {
  return (
    <div className="space-y-8">
      <div className="bg-story-soft p-6 rounded-xl">
        <h2 className="text-2xl font-semibold mb-2">Story Insights: {storyTitle}</h2>
        <p className="text-muted-foreground">
          Completed by {childName} on {completionDate}
        </p>
      </div>
      
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-6">Observed Traits</h3>
        <div className="space-y-6">
          {traits.map((trait) => (
            <div key={trait.name} className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">{trait.name}</span>
                <span>{trait.value}%</span>
              </div>
              <Progress value={trait.value} className="h-2" />
              <p className="text-sm text-muted-foreground">{trait.description}</p>
            </div>
          ))}
        </div>
      </Card>
      
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Behavioral Observations</h3>
        <ul className="space-y-2 list-disc pl-5">
          {observations.map((observation, index) => (
            <li key={index}>{observation}</li>
          ))}
        </ul>
      </Card>
      
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Reflection Responses</h3>
        <div className="space-y-4">
          {Object.entries(reflections).map(([question, answer]) => (
            <div key={question}>
              <p className="font-medium">{question}</p>
              <p className="text-muted-foreground mt-1 pl-4 border-l-2 border-story-primary">
                "{answer}"
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ParentInsightReport;

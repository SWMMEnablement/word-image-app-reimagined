import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Target, Layers, DollarSign } from "lucide-react";

interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: FeatureItem[] = [
  {
    icon: <Target className="w-5 h-5" />,
    title: "Who it's for",
    description: "If you primarily work with sewer networks, either on-site or on a regional scale, then InfoWorks ICM Sewer is made for you"
  },
  {
    icon: <CheckCircle className="w-5 h-5" />,
    title: "Same powerful features",
    description: "The features and capabilities of InfoWorks ICM Sewer remain identical to the (now-legacy) InfoWorks ICM Standard offering"
  },
  {
    icon: <Layers className="w-5 h-5" />,
    title: "Unlimited 1D modeling",
    description: "InfoWorks ICM Sewer offers unlimited 1D modeling capabilities for sewer and riverine networks"
  },
  {
    icon: <DollarSign className="w-5 h-5" />,
    title: "Lower price",
    description: "Along with the new name, the annual subscription pricing has been reduced from $7,500 to $5,500 per year. For Autodesk Flex users, daily usage token rates will decrease"
  }
];

export const FeatureCard = () => {
  return (
    <Card className="bg-gradient-card shadow-medium border-0">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="text-center space-y-3">
            <Badge variant="feature" className="text-lg px-4 py-2">
              InfoWorks ICM Sewer
            </Badge>
            <p className="text-sm text-muted-foreground">(formerly Standard)</p>
          </div>

          <div className="space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex gap-3 p-3 rounded-lg bg-background/50 transition-all duration-200 hover:bg-background/80">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  {feature.icon}
                </div>
                <div className="space-y-1">
                  <h4 className="font-medium text-foreground">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
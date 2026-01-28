import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Building2, 
  Waves, 
  Mountain, 
  CloudRain, 
  Droplets, 
  Map,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  ClipboardList
} from "lucide-react";

interface ProjectType {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  features: string[];
  recommendedProduct: string;
  complexity: "low" | "medium" | "high";
}

const projectTypes: ProjectType[] = [
  {
    id: "urban-drainage",
    name: "Urban Drainage",
    icon: <Building2 className="w-6 h-6" />,
    description: "Stormwater collection, combined sewers, and urban runoff management",
    features: ["Pipe network modeling", "Pump stations", "CSO analysis", "Catchment hydrology"],
    recommendedProduct: "ICM Sewer",
    complexity: "medium"
  },
  {
    id: "flood-risk",
    name: "Flood Risk Assessment",
    icon: <Waves className="w-6 h-6" />,
    description: "2D surface water flooding, floodplain mapping, and risk analysis",
    features: ["2D mesh modeling", "Floodplain delineation", "Hazard mapping", "Breach analysis"],
    recommendedProduct: "ICM Flood",
    complexity: "high"
  },
  {
    id: "watershed",
    name: "Watershed Modeling",
    icon: <Mountain className="w-6 h-6" />,
    description: "Large-scale catchment hydrology and river basin management",
    features: ["Rainfall-runoff", "River routing", "Water quality", "Climate scenarios"],
    recommendedProduct: "ICM Ultimate",
    complexity: "high"
  },
  {
    id: "coastal-flooding",
    name: "Coastal & Tidal",
    icon: <CloudRain className="w-6 h-6" />,
    description: "Tidal boundaries, storm surge, and coastal flood modeling",
    features: ["Tidal boundaries", "Storm surge", "Sea level rise", "Wave overtopping"],
    recommendedProduct: "ICM Flood",
    complexity: "high"
  },
  {
    id: "combined-systems",
    name: "Integrated Systems",
    icon: <Droplets className="w-6 h-6" />,
    description: "Combined 1D/2D modeling with sewers and surface water interaction",
    features: ["1D/2D coupling", "Manhole surcharge", "Surface flooding", "Network optimization"],
    recommendedProduct: "ICM Ultimate",
    complexity: "high"
  },
  {
    id: "results-review",
    name: "Results Review Only",
    icon: <Map className="w-6 h-6" />,
    description: "View and analyze existing ICM model results without editing",
    features: ["Result visualization", "Map exports", "Report generation", "Data queries"],
    recommendedProduct: "ICM Viewer",
    complexity: "low"
  }
];

export const ProjectPlanner = () => {
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);

  const toggleProject = (projectId: string) => {
    setSelectedProjects(prev => 
      prev.includes(projectId) 
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  const recommendation = useMemo(() => {
    if (selectedProjects.length === 0) return null;

    const selected = projectTypes.filter(p => selectedProjects.includes(p.id));
    const allFeatures = [...new Set(selected.flatMap(p => p.features))];
    
    // Determine best product
    const hasFlood = selected.some(p => p.id === "flood-risk" || p.id === "coastal-flooding");
    const hasSewer = selected.some(p => p.id === "urban-drainage");
    const hasWatershed = selected.some(p => p.id === "watershed");
    const hasIntegrated = selected.some(p => p.id === "combined-systems");
    const onlyViewer = selected.length === 1 && selected[0].id === "results-review";

    let recommendedProduct = "ICM Sewer";
    let reason = "";

    if (onlyViewer) {
      recommendedProduct = "ICM Viewer";
      reason = "For viewing results only, ICM Viewer provides the most cost-effective solution.";
    } else if (hasIntegrated || (hasFlood && hasSewer) || hasWatershed || selectedProjects.length >= 3) {
      recommendedProduct = "ICM Ultimate";
      reason = "Your project scope requires integrated 1D/2D capabilities. ICM Ultimate provides the complete toolkit and best value for complex projects.";
    } else if (hasFlood) {
      recommendedProduct = "ICM Flood";
      reason = "Primary focus on 2D surface water flooding makes ICM Flood the ideal choice.";
    } else {
      recommendedProduct = "ICM Sewer";
      reason = "Urban drainage and pipe network modeling is best handled by ICM Sewer.";
    }

    const maxComplexity = selected.reduce((max, p) => {
      const order = { low: 0, medium: 1, high: 2 };
      return order[p.complexity] > order[max] ? p.complexity : max;
    }, "low" as "low" | "medium" | "high");

    return {
      product: recommendedProduct,
      reason,
      features: allFeatures,
      complexity: maxComplexity,
      projectCount: selected.length
    };
  }, [selectedProjects]);

  const getComplexityColor = (complexity: "low" | "medium" | "high") => {
    switch (complexity) {
      case "low": return "bg-green-500/10 text-green-600 dark:text-green-400";
      case "medium": return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400";
      case "high": return "bg-red-500/10 text-red-600 dark:text-red-400";
    }
  };

  return (
    <Card className="bg-gradient-card shadow-large border-0">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
            <ClipboardList className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-2xl">Project Planner</CardTitle>
            <p className="text-muted-foreground">Select your project types to get a tailored recommendation</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Project Type Selection */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projectTypes.map((project) => {
            const isSelected = selectedProjects.includes(project.id);
            return (
              <div
                key={project.id}
                onClick={() => toggleProject(project.id)}
                className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                  isSelected 
                    ? "border-primary bg-primary/5 shadow-soft" 
                    : "border-border hover:border-primary/50 hover:bg-muted/50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}>
                    {project.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">{project.name}</h3>
                      <Checkbox checked={isSelected} className="ml-auto" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary" className="text-xs">
                        {project.recommendedProduct}
                      </Badge>
                      <Badge className={`text-xs ${getComplexityColor(project.complexity)}`}>
                        {project.complexity}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recommendation Result */}
        {recommendation && (
          <div className="mt-6 p-6 rounded-xl bg-primary/5 border border-primary/20">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-7 h-7 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="text-xl font-bold text-foreground">
                    Recommended: {recommendation.product}
                  </h3>
                  <Badge className={getComplexityColor(recommendation.complexity)}>
                    {recommendation.complexity} complexity
                  </Badge>
                </div>
                <p className="text-muted-foreground mt-2">{recommendation.reason}</p>
                
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-foreground mb-2">
                    Required Features ({recommendation.features.length})
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {recommendation.features.map((feature, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button className="gap-2">
                    View Detailed Comparison
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Get Quote
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {!recommendation && (
          <div className="text-center py-8 text-muted-foreground">
            <ClipboardList className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Select one or more project types above to get your personalized ICM recommendation</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

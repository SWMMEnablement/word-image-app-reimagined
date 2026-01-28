import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Check, X, HelpCircle, Sparkles, Copy, CheckCheck } from "lucide-react";
import { toast } from "@/hooks/use-toast";

type Feature = {
  name: string;
  description: string;
  category: "modeling" | "analysis" | "visualization" | "data";
  sewer: boolean;
  flood: boolean;
  ultimate: boolean;
  viewer: boolean;
};

const features: Feature[] = [
  // Modeling Features
  { name: "Sewer Network Modeling", description: "Design and simulate sewer collection systems", category: "modeling", sewer: true, flood: false, ultimate: true, viewer: false },
  { name: "Stormwater Modeling", description: "Model stormwater drainage and runoff", category: "modeling", sewer: true, flood: true, ultimate: true, viewer: false },
  { name: "2D Surface Flooding", description: "Simulate overland flow and surface flooding", category: "modeling", sewer: false, flood: true, ultimate: true, viewer: false },
  { name: "Integrated 1D/2D Modeling", description: "Combined pipe network and surface flow simulation", category: "modeling", sewer: false, flood: true, ultimate: true, viewer: false },
  { name: "River/Channel Modeling", description: "Open channel and river hydraulics", category: "modeling", sewer: false, flood: true, ultimate: true, viewer: false },
  { name: "InfoWorks Network Support", description: "Native InfoWorks ICM network format", category: "modeling", sewer: true, flood: true, ultimate: true, viewer: true },
  { name: "SWMM Network Support", description: "EPA SWMM model compatibility", category: "modeling", sewer: true, flood: true, ultimate: true, viewer: true },
  
  // Analysis Features
  { name: "Hydraulic Analysis", description: "Steady-state and dynamic hydraulic calculations", category: "analysis", sewer: true, flood: true, ultimate: true, viewer: false },
  { name: "Water Quality Modeling", description: "Pollutant transport and treatment simulation", category: "analysis", sewer: true, flood: false, ultimate: true, viewer: false },
  { name: "Scenario Management", description: "Create and compare multiple design scenarios", category: "analysis", sewer: true, flood: true, ultimate: true, viewer: false },
  { name: "Risk Assessment", description: "Flood risk and asset criticality analysis", category: "analysis", sewer: false, flood: true, ultimate: true, viewer: false },
  { name: "Real-Time Control", description: "RTC simulation and optimization", category: "analysis", sewer: true, flood: false, ultimate: true, viewer: false },
  
  // Visualization Features
  { name: "3D Visualization", description: "Three-dimensional model viewing", category: "visualization", sewer: true, flood: true, ultimate: true, viewer: true },
  { name: "Animation Playback", description: "Time-series result animation", category: "visualization", sewer: true, flood: true, ultimate: true, viewer: true },
  { name: "Thematic Mapping", description: "Color-coded results display", category: "visualization", sewer: true, flood: true, ultimate: true, viewer: true },
  { name: "Profile Plots", description: "Longitudinal section views", category: "visualization", sewer: true, flood: true, ultimate: true, viewer: true },
  
  // Data Features
  { name: "Model Editing", description: "Create and modify network elements", category: "data", sewer: true, flood: true, ultimate: true, viewer: false },
  { name: "Data Import/Export", description: "GIS and CAD data exchange", category: "data", sewer: true, flood: true, ultimate: true, viewer: false },
  { name: "Report Generation", description: "Automated technical reports", category: "data", sewer: true, flood: true, ultimate: true, viewer: false },
  { name: "View-Only Access", description: "Open and view models without editing", category: "data", sewer: false, flood: false, ultimate: false, viewer: true },
];

const categories = [
  { id: "modeling", label: "Modeling Capabilities" },
  { id: "analysis", label: "Analysis Tools" },
  { id: "visualization", label: "Visualization" },
  { id: "data", label: "Data Management" },
];

const products = [
  { id: "sewer", name: "ICM Sewer", description: "Sewer & stormwater networks", color: "bg-primary" },
  { id: "flood", name: "ICM Flood", description: "2D surface flooding", color: "bg-secondary" },
  { id: "ultimate", name: "ICM Ultimate", description: "Complete suite - 4 in 1", color: "bg-accent" },
  { id: "viewer", name: "ICM Viewer", description: "View-only access", color: "bg-muted" },
];

const shortcutCommands = [
  { product: "ICM Sewer", command: '"/ADSK:Sewer"' },
  { product: "ICM Flood", command: '"/ADSK:Flood"' },
  { product: "ICM Ultimate", command: '"/ADSK:Ultimate"' },
  { product: "ICM Viewer", command: '"/ADSK:Viewer"' },
];

type NeedKey = "sewerModeling" | "floodModeling" | "riverModeling" | "viewOnly" | "swmmSupport" | "waterQuality";

const userNeeds: { id: NeedKey; label: string; description: string }[] = [
  { id: "sewerModeling", label: "Sewer Network Design", description: "Design and analyze sewer collection systems" },
  { id: "floodModeling", label: "Surface Flood Modeling", description: "2D overland flow and flood risk analysis" },
  { id: "riverModeling", label: "River/Channel Modeling", description: "Open channel hydraulics" },
  { id: "viewOnly", label: "View-Only Access", description: "Review models without editing capabilities" },
  { id: "swmmSupport", label: "SWMM Compatibility", description: "Work with EPA SWMM models" },
  { id: "waterQuality", label: "Water Quality Analysis", description: "Pollutant transport modeling" },
];

export const ICMComparisonTool = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(categories.map(c => c.id));
  const [selectedNeeds, setSelectedNeeds] = useState<Set<NeedKey>>(new Set());
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(c => c !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleNeed = (needId: NeedKey) => {
    setSelectedNeeds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(needId)) {
        newSet.delete(needId);
      } else {
        newSet.add(needId);
      }
      return newSet;
    });
  };

  const copyCommand = async (command: string) => {
    await navigator.clipboard.writeText(command);
    setCopiedCommand(command);
    toast({
      title: "Copied to clipboard!",
      description: `Command ${command} copied successfully.`,
    });
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  const getRecommendation = (): string[] => {
    if (selectedNeeds.size === 0) return [];
    
    const needs = Array.from(selectedNeeds);
    
    // View-only need
    if (needs.includes("viewOnly") && needs.length === 1) {
      return ["viewer"];
    }
    
    // Check for flood-specific needs
    const needsFlood = needs.includes("floodModeling") || needs.includes("riverModeling");
    
    // Check for sewer-specific needs
    const needsSewer = needs.includes("sewerModeling") || needs.includes("waterQuality");
    
    // If both flood and sewer needs, recommend Ultimate
    if (needsFlood && needsSewer) {
      return ["ultimate"];
    }
    
    // Pure flood needs
    if (needsFlood && !needsSewer) {
      return ["flood", "ultimate"];
    }
    
    // Pure sewer needs
    if (needsSewer && !needsFlood) {
      return ["sewer", "ultimate"];
    }
    
    // SWMM only - all support it
    if (needs.includes("swmmSupport") && needs.length === 1) {
      return ["sewer", "flood", "ultimate"];
    }
    
    return ["ultimate"];
  };

  const recommendations = getRecommendation();
  const filteredFeatures = features.filter(f => selectedCategories.includes(f.category));

  const FeatureIcon = ({ supported }: { supported: boolean }) => {
    if (supported) {
      return <Check className="w-5 h-5 text-primary" />;
    }
    return <X className="w-5 h-5 text-muted-foreground/40" />;
  };

  return (
    <div className="space-y-8">
      {/* Needs Assessment */}
      <Card className="bg-gradient-card shadow-medium border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            What do you need?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {userNeeds.map(need => (
              <div
                key={need.id}
                className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  selectedNeeds.has(need.id)
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                }`}
                onClick={() => toggleNeed(need.id)}
              >
                <Checkbox
                  checked={selectedNeeds.has(need.id)}
                  onCheckedChange={() => toggleNeed(need.id)}
                  className="mt-0.5"
                />
                <div>
                  <Label className="font-medium cursor-pointer">{need.label}</Label>
                  <p className="text-sm text-muted-foreground mt-1">{need.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Recommendation */}
          {recommendations.length > 0 && (
            <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                Recommended for you:
              </h4>
              <div className="flex flex-wrap gap-2 mt-2">
                {recommendations.map(rec => {
                  const product = products.find(p => p.id === rec);
                  return product ? (
                    <Badge key={rec} variant="feature" className="text-sm py-1 px-3">
                      {product.name}
                    </Badge>
                  ) : null;
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Shortcut Commands */}
      <Card className="bg-gradient-card shadow-medium border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-primary" />
            Shortcut Commands
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Set these flags in your shortcut properties to launch different ICM modes:
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {shortcutCommands.map(({ product, command }) => (
              <button
                key={command}
                onClick={() => copyCommand(command)}
                className="flex items-center justify-between gap-2 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors group text-left"
              >
                <div>
                  <div className="text-sm font-medium text-foreground">{product}</div>
                  <code className="text-xs text-primary font-mono">{command}</code>
                </div>
                {copiedCommand === command ? (
                  <CheckCheck className="w-4 h-4 text-primary" />
                ) : (
                  <Copy className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                )}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <Button
            key={category.id}
            variant={selectedCategories.includes(category.id) ? "default" : "outline"}
            size="sm"
            onClick={() => toggleCategory(category.id)}
          >
            {category.label}
          </Button>
        ))}
      </div>

      {/* Feature Comparison Matrix */}
      <Card className="bg-gradient-card shadow-medium border-0 overflow-hidden">
        <CardHeader>
          <CardTitle>Feature Comparison Matrix</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-left p-4 font-semibold">Feature</th>
                  {products.map(product => (
                    <th key={product.id} className="p-4 text-center min-w-[100px]">
                      <div className="flex flex-col items-center gap-1">
                        <Badge
                          variant="feature"
                          className={`${
                            recommendations.includes(product.id)
                              ? "ring-2 ring-primary ring-offset-2"
                              : ""
                          }`}
                        >
                          {product.name}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{product.description}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredFeatures.map((feature, idx) => (
                  <tr
                    key={feature.name}
                    className={`border-b last:border-0 ${idx % 2 === 0 ? "bg-background" : "bg-muted/10"}`}
                  >
                    <td className="p-4">
                      <div className="font-medium text-foreground">{feature.name}</div>
                      <div className="text-sm text-muted-foreground">{feature.description}</div>
                    </td>
                    <td className="p-4 text-center">
                      <FeatureIcon supported={feature.sewer} />
                    </td>
                    <td className="p-4 text-center">
                      <FeatureIcon supported={feature.flood} />
                    </td>
                    <td className="p-4 text-center">
                      <FeatureIcon supported={feature.ultimate} />
                    </td>
                    <td className="p-4 text-center">
                      <FeatureIcon supported={feature.viewer} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

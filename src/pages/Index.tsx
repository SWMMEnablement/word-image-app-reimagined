import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProfileCard } from "@/components/ProfileCard";
import { ICMComparisonTool } from "@/components/ICMComparisonTool";
import { KnowledgeBase } from "@/components/KnowledgeBase";
import { PricingCalculator } from "@/components/PricingCalculator";
import { ProjectPlanner } from "@/components/ProjectPlanner";
import { Header } from "@/components/Header";
import { Heart, MessageCircle, Share2, Bookmark, ExternalLink, Layers } from "lucide-react";
import heroBg from "@/assets/hero-water-modeling.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/70 to-transparent dark:from-background/95 dark:via-background/80" />
        <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl space-y-6">
            <div className="flex flex-col items-start gap-3">
              <Badge variant="glass" className="mb-2">
                <Layers className="w-4 h-4 mr-2" />
                Interactive Comparison Tool
              </Badge>
              <a 
                href="https://www.linkedin.com/pulse/eight-icms-one-icm-ultimate-sewer-flood-viewer-swmm-robert-dickinson-13bae/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm backdrop-blur-sm bg-card/40 px-3 py-1 rounded-full border border-border/40"
              >
                <ExternalLink className="w-4 h-4" />
                Based on LinkedIn Article by Robert Dickinson
              </a>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-foreground">
              ICM Software
              <span className="block bg-gradient-primary bg-clip-text text-transparent">
                Guide
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
              Compare ICM Ultimate, Sewer, Flood, and Viewer to find the right solution for your water modeling needs
            </p>
            <div className="flex flex-wrap gap-3 pt-4">
              <Button variant="default" size="lg">
                <Heart className="w-5 h-5 mr-2" />
                51 Likes
              </Button>
              <Button variant="outline" size="lg">
                <MessageCircle className="w-5 h-5 mr-2" />
                Comment
              </Button>
              <Button variant="outline" size="lg">
                <Share2 className="w-5 h-5 mr-2" />
                Share
              </Button>
              <Button variant="ghost" size="lg">
                <Bookmark className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Tool */}
          <div className="lg:col-span-3 space-y-8">
            <section id="project-planner" className="scroll-mt-20">
              <ProjectPlanner />
            </section>
            <section id="comparison-tool" className="scroll-mt-20">
              <ICMComparisonTool />
            </section>
            <section id="pricing" className="scroll-mt-20">
              <PricingCalculator />
            </section>
            <section id="knowledge-base" className="scroll-mt-20">
              <KnowledgeBase />
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <ProfileCard />
            
            {/* Quick Summary */}
            <Card className="bg-gradient-card shadow-medium border-0">
              <CardContent className="p-6">
                <Badge variant="feature" className="mb-4">Quick Summary</Badge>
                <p className="text-foreground leading-relaxed text-sm">
                  The Autodesk Water Lifecycle team has evolved ICM Standard into ICM Flood and ICM Sewer. 
                  ICM Ultimate uniquely integrates four ICM functionalities into a single purchase for enhanced flexibility.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
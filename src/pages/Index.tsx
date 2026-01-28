import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProfileCard } from "@/components/ProfileCard";
import { ICMComparisonTool } from "@/components/ICMComparisonTool";
import { Heart, MessageCircle, Share2, Bookmark, Calendar, ExternalLink, Layers } from "lucide-react";
import heroBg from "@/assets/hero-cover.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-hero/80" />
        <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center text-primary-foreground space-y-6">
            <div className="flex flex-col items-center gap-3">
              <Badge variant="glass" className="mb-2">
                <Layers className="w-4 h-4 mr-2" />
                Interactive Comparison Tool
              </Badge>
              <a 
                href="https://www.linkedin.com/pulse/eight-icms-one-icm-ultimate-sewer-flood-viewer-swmm-robert-dickinson-13bae/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200 text-sm backdrop-blur-sm bg-card/20 px-3 py-1 rounded-full border border-primary-foreground/20"
              >
                <ExternalLink className="w-4 h-4" />
                Based on LinkedIn Article by Robert Dickinson
              </a>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              ICM Software Guide
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 leading-relaxed max-w-3xl mx-auto">
              Compare ICM Ultimate, Sewer, Flood, and Viewer to find the right solution for your water modeling needs
            </p>
            <div className="flex flex-wrap gap-3 justify-center pt-6">
              <Button variant="glass" size="lg">
                <Heart className="w-5 h-5 mr-2" />
                51 Likes
              </Button>
              <Button variant="glass" size="lg">
                <MessageCircle className="w-5 h-5 mr-2" />
                Comment
              </Button>
              <Button variant="glass" size="lg">
                <Share2 className="w-5 h-5 mr-2" />
                Share
              </Button>
              <Button variant="glass" size="lg">
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
          <div className="lg:col-span-3">
            <ICMComparisonTool />
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
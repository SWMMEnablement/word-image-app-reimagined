import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProfileCard } from "@/components/ProfileCard";
import { FeatureCard } from "@/components/FeatureCard";
import { RelatedContent } from "@/components/RelatedContent";
import { Heart, MessageCircle, Share2, Bookmark, Calendar, ExternalLink } from "lucide-react";
import heroBg from "@/assets/hero-cover.jpg";
import icmShortcut from "@/assets/icm-shortcut-flags.jpg";
import icmUltimate from "@/assets/icm-ultimate.jpg";
import icmSewer from "@/assets/icm-sewer.jpg";
import icmViewer from "@/assets/icm-viewer.jpg";
import icmUltimate2 from "@/assets/icm-ultimate-2.jpg";

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
        <div className="relative z-10 container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto text-center text-primary-foreground space-y-6">
            <div className="flex flex-col items-center gap-3">
              <Badge variant="glass" className="mb-2">
                <Calendar className="w-4 h-4 mr-2" />
                2 months ago • Edited
              </Badge>
              <a 
                href="https://www.linkedin.com/pulse/eight-icms-one-icm-ultimate-sewer-flood-viewer-swmm-robert-dickinson-13bae/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200 text-sm backdrop-blur-sm bg-card/20 px-3 py-1 rounded-full border border-primary-foreground/20"
              >
                <ExternalLink className="w-4 h-4" />
                View Original LinkedIn Article
              </a>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Eight ICMs in One
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 leading-relaxed max-w-3xl mx-auto">
              ICM Ultimate, Sewer, Flood, and Viewer for InfoWorks and SWMM Networks
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
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Article */}
          <div className="lg:col-span-2 space-y-8">
            {/* Summary Cards */}
            <div className="space-y-6">
              <Card className="bg-gradient-card shadow-medium border-0">
                <CardContent className="p-6">
                  <Badge variant="feature" className="mb-4">One Sentence Summary</Badge>
                  <p className="text-foreground leading-relaxed">
                    The Autodesk Water Lifecycle team has announced the evolution of ICM Standard into ICM Flood and ICM Sewer, while highlighting the versatility of ICM Ultimate, which combines four ICM functionalities, with more details available in the One Water Blog.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card shadow-medium border-0">
                <CardContent className="p-6">
                  <Badge variant="feature" className="mb-4">One-Paragraph Summary</Badge>
                  <p className="text-foreground leading-relaxed">
                    The Autodesk Water Lifecycle team has shared an update on the transformation of ICM Standard into specialized versions, ICM Flood and ICM Sewer, alongside the continued excellence of ICM Ultimate, which uniquely integrates four ICM functionalities into a single purchase, offering enhanced flexibility for users. This evolution is detailed further in the insightful One Water Blog from Autodesk Water, providing additional insights into the product's capabilities. Users can customize their experience by adjusting settings in the shortcut properties, with specific commands such as "/ADSK:Sewer," "/ADSK:Flood," "/ADSK:Viewer," and "/ADSK:Ultimate" allowing access to the respective modes of the InfoWorks ICM 2026 software located at "C:\Program Files\Autodesk\InfoWorks ICM Sewer 2026\InfoWorksICM.exe."
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Command Line Instructions */}
            <Card className="bg-gradient-card shadow-medium border-0">
              <CardContent className="p-6">
                <Badge variant="feature" className="mb-4">Shortcut Configuration</Badge>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-foreground leading-relaxed mb-4">
                      You can change what you see by setting a flag in the shortcut properties:
                    </p>
                    <div className="space-y-2 text-sm font-mono bg-muted/30 p-4 rounded-lg">
                      <div>"/ADSK:Sewer" - ICM Sewer</div>
                      <div>"/ADSK:Flood" - ICM Flood</div>
                      <div>"/ADSK:Viewer" - ICM Viewer</div>
                      <div>"/ADSK:Ultimate" - ICM Ultimate</div>
                    </div>
                  </div>
                  <div>
                    <img 
                      src={icmShortcut} 
                      alt="ICM Shortcut Configuration Flags"
                      className="w-full h-auto rounded-lg shadow-soft"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* ICM Variants Gallery */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-center text-foreground">ICM Variants Showcase</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="bg-gradient-card shadow-medium border-0 overflow-hidden">
                  <div className="aspect-[4/3] relative">
                    <img 
                      src={icmUltimate} 
                      alt="ICM Ultimate Interface"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-foreground mb-2">ICM Ultimate</h3>
                    <p className="text-sm text-muted-foreground">Complete suite with all features</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-card shadow-medium border-0 overflow-hidden">
                  <div className="aspect-[4/3] relative">
                    <img 
                      src={icmSewer} 
                      alt="ICM Sewer Interface"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-foreground mb-2">ICM Sewer</h3>
                    <p className="text-sm text-muted-foreground">Specialized for sewer network design</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-card shadow-medium border-0 overflow-hidden">
                  <div className="aspect-[4/3] relative">
                    <img 
                      src={icmViewer} 
                      alt="ICM Viewer Interface"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-foreground mb-2">ICM Viewer</h3>
                    <p className="text-sm text-muted-foreground">View and analyze existing models</p>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-center">
                <Card className="bg-gradient-card shadow-medium border-0 overflow-hidden max-w-md">
                  <div className="aspect-[4/3] relative">
                    <img 
                      src={icmUltimate2} 
                      alt="ICM Ultimate Interface Alternative View"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-foreground mb-2">ICM Ultimate</h3>
                    <p className="text-sm text-muted-foreground">Alternative interface view</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Feature Details */}
            <FeatureCard />
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <ProfileCard />
            <RelatedContent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProfileCard } from "@/components/ProfileCard";
import { FeatureCard } from "@/components/FeatureCard";
import { RelatedContent } from "@/components/RelatedContent";
import { Heart, MessageCircle, Share2, Bookmark, Calendar } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import icmFeatures from "@/assets/icm-features.jpg";

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
            <Badge variant="glass" className="mb-4">
              <Calendar className="w-4 h-4 mr-2" />
              2 months ago • Edited
            </Badge>
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

            {/* Feature Image */}
            <div className="relative rounded-lg overflow-hidden shadow-large">
              <img 
                src={icmFeatures} 
                alt="Eight ICMs in One - ICM Ultimate, Sewer, Flood, and Viewer for InfoWorks and SWMM Networks"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
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
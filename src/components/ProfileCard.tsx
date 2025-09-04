import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, FileText, Calendar } from "lucide-react";
import robertProfile from "@/assets/robert-profile.jpg";

export const ProfileCard = () => {
  return (
    <Card className="bg-gradient-card shadow-medium border-0">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <Avatar className="w-24 h-24 shadow-soft">
            <AvatarImage src={robertProfile} alt="Robert Dickinson" />
            <AvatarFallback>RD</AvatarFallback>
          </Avatar>
          
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-foreground">Robert Dickinson</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Autodesk Technologist, models ICM InfoWorks and SWMM Networks with Ruby, Python and AI Agents
            </p>
            <Badge variant="tech" className="mt-2">
              20 Years at Innovyze/Autodesk
            </Badge>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground pt-4">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>18,583 followers</span>
            </div>
            <div className="flex items-center gap-1">
              <FileText className="w-4 h-4" />
              <span>3000+ Posts</span>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button variant="hero" size="sm">
              View Profile
            </Button>
            <Button variant="ghost" size="sm">
              Connect
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
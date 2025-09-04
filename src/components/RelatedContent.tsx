import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Clock } from "lucide-react";

interface Article {
  title: string;
  timeAgo: string;
  href: string;
}

const articles: Article[] = [
  {
    title: "InfoSewer to ICM InfoWorks App (for AI and Humans)",
    timeAgo: "1w",
    href: "#"
  },
  {
    title: "EPA SWMM5 Inp File Reader App for Stats and Images of the Network Elements",
    timeAgo: "3w", 
    href: "#"
  },
  {
    title: "Level Up Your ICM InfoWorks Skills: Try This Interactive Technical Quiz App on Replit",
    timeAgo: "1mo",
    href: "#"
  }
];

export const RelatedContent = () => {
  return (
    <Card className="bg-gradient-card shadow-medium border-0">
      <CardContent className="p-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">More from this author</h3>
          
          <div className="space-y-3">
            {articles.map((article, index) => (
              <div key={index} className="group p-3 rounded-lg bg-background/30 hover:bg-background/60 transition-all duration-200 cursor-pointer">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 space-y-2">
                    <h4 className="font-medium text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2">
                      {article.title}
                    </h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{article.timeAgo}</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors duration-200 flex-shrink-0" />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <h4 className="text-base font-medium text-foreground mb-3">Explore content categories</h4>
            <div className="flex flex-wrap gap-2">
              {["Career", "Productivity", "Technology", "Project Management", "Education"].map((category) => (
                <Badge key={category} variant="outline" className="hover:bg-accent transition-colors duration-200 cursor-pointer">
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
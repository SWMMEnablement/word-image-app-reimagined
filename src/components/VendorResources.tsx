import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ExternalLink, 
  Download, 
  BookOpen, 
  Phone, 
  Globe, 
  PlayCircle,
  FileText,
  Users,
  HelpCircle
} from "lucide-react";

const officialLinks = [
  {
    title: "Free Trial",
    description: "30-day free trial of InfoWorks ICM",
    url: "https://www.autodesk.com/products/infoworks-icm/free-trial",
    icon: Download,
    badge: "Try Free",
    badgeVariant: "default" as const,
  },
  {
    title: "Product Page",
    description: "Official InfoWorks ICM product information",
    url: "https://www.autodesk.com/products/infoworks-icm/overview",
    icon: Globe,
    badge: null,
    badgeVariant: "secondary" as const,
  },
  {
    title: "Documentation",
    description: "Technical documentation and user guides",
    url: "https://help.autodesk.com/view/IWICMS/ENU/",
    icon: BookOpen,
    badge: null,
    badgeVariant: "secondary" as const,
  },
  {
    title: "Video Tutorials",
    description: "Official training videos and webinars",
    url: "https://www.autodesk.com/products/infoworks-icm/learn-training",
    icon: PlayCircle,
    badge: null,
    badgeVariant: "secondary" as const,
  },
];

const contactOptions = [
  {
    title: "Find a Reseller",
    description: "Locate an authorized Autodesk reseller in your region",
    url: "https://www.autodesk.com/resellers",
    icon: Users,
  },
  {
    title: "Contact Sales",
    description: "Speak directly with Autodesk sales team",
    url: "https://www.autodesk.com/company/contact-us",
    icon: Phone,
  },
  {
    title: "Technical Support",
    description: "Get help with technical questions",
    url: "https://www.autodesk.com/support",
    icon: HelpCircle,
  },
];

const resources = [
  {
    title: "System Requirements",
    url: "https://www.autodesk.com/support/technical/article/caas/sfdcarticles/sfdcarticles/System-requirements-for-InfoWorks-ICM.html",
  },
  {
    title: "Release Notes",
    url: "https://help.autodesk.com/view/IWICMS/ENU/?guid=GUID-RELEASE-NOTES",
  },
  {
    title: "Community Forums",
    url: "https://forums.autodesk.com/t5/infoworks-icm/ct-p/5998",
  },
  {
    title: "Learning Hub",
    url: "https://www.autodesk.com/certification/learning-pathways",
  },
];

export const VendorResources = () => {
  return (
    <Card className="bg-gradient-card shadow-medium border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ExternalLink className="w-5 h-5 text-primary" />
          Official Resources
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          Direct links to Autodesk resources, trials, and support channels.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Primary Actions */}
        <div className="grid sm:grid-cols-2 gap-3">
          {officialLinks.map((link) => (
            <a
              key={link.title}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-3 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all"
            >
              <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <link.icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-foreground">{link.title}</span>
                  {link.badge && (
                    <Badge variant={link.badgeVariant} className="text-xs">
                      {link.badge}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{link.description}</p>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          ))}
        </div>

        {/* Contact Options */}
        <div className="pt-4 border-t">
          <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
            <Phone className="w-4 h-4 text-primary" />
            Get in Touch
          </h4>
          <div className="grid sm:grid-cols-3 gap-3">
            {contactOptions.map((option) => (
              <a
                key={option.title}
                href={option.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-lg bg-muted/30 hover:bg-primary/10 transition-colors text-center"
              >
                <option.icon className="w-5 h-5 mx-auto mb-2 text-muted-foreground group-hover:text-primary transition-colors" />
                <div className="font-medium text-sm text-foreground">{option.title}</div>
                <div className="text-xs text-muted-foreground">{option.description}</div>
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="pt-4 border-t">
          <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            Quick Links
          </h4>
          <div className="flex flex-wrap gap-2">
            {resources.map((resource) => (
              <a
                key={resource.title}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm bg-muted/50 hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
              >
                {resource.title}
                <ExternalLink className="w-3 h-3" />
              </a>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

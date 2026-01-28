import { Droplets, ExternalLink, Linkedin, Github, Mail } from "lucide-react";

const bobswmmApps = [
  { name: "ICM Guide", href: "#", description: "Compare ICM versions" },
  { name: "SWMM5 Calculator", href: "#", description: "Hydrology calculations" },
  { name: "Rainfall Tools", href: "#", description: "IDF curves & analysis" },
  { name: "Pipe Sizing", href: "#", description: "Quick hydraulic calcs" },
  { name: "Unit Converter", href: "#", description: "CFS, MGD, L/s & more" },
  { name: "Math Puzzles", href: "#", description: "Brain teasers" },
];

const resources = [
  { name: "LinkedIn Article", href: "https://www.linkedin.com/pulse/eight-icms-one-icm-ultimate-sewer-flood-viewer-swmm-robert-dickinson-13bae/" },
  { name: "Autodesk Water", href: "https://www.autodesk.com/solutions/water-infrastructure" },
  { name: "InfoWorks ICM", href: "https://www.autodesk.com/products/infoworks-icm" },
];

const socialLinks = [
  { name: "LinkedIn", href: "https://www.linkedin.com/in/robert-dickinson-swmm/", icon: Linkedin },
  { name: "Email", href: "mailto:swmm5@gmail.com", icon: Mail },
];

export const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Droplets className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">BobSWMM</h3>
                <p className="text-xs text-muted-foreground">Digital Garden</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A curated collection of SSF (Storm Sewer Flood) modeling tools and resources from 50+ years of experience in SWMM and hydrology.
            </p>
          </div>

          {/* BobSWMM Apps */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">BobSWMM Collection</h4>
            <ul className="space-y-3">
              {bobswmmApps.map((app) => (
                <li key={app.name}>
                  <a
                    href={app.href}
                    target={app.href.startsWith("http") ? "_blank" : undefined}
                    rel={app.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex items-start gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div>
                      <span className="font-medium">{app.name}</span>
                      <p className="text-xs text-muted-foreground">{app.description}</p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-3">
              {resources.map((resource) => (
                <li key={resource.name}>
                  <a
                    href={resource.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {resource.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Connect</h4>
            <div className="flex gap-3 mb-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-muted/50 hover:bg-primary/10 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Questions about SSF modeling? Reach out on LinkedIn or email.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-border/40 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Robert Dickinson. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with expertise from 50+ years in water resources engineering
          </p>
        </div>
      </div>
    </footer>
  );
};

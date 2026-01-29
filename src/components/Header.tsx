import { Moon, Sun, Droplets } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Planner", href: "#project-planner", id: "project-planner" },
  { label: "Compare", href: "#comparison-tool", id: "comparison-tool" },
  { label: "Pricing", href: "#pricing", id: "pricing" },
  { label: "Knowledge", href: "#knowledge-base", id: "knowledge-base" },
  { label: "Guides", href: "#implementation-guides", id: "implementation-guides" },
  { label: "Quote", href: "#quote-request", id: "quote-request" },
];

export const Header = () => {
  const { theme, setTheme } = useTheme();
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    
    navItems.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveSection(id);
              }
            });
          },
          { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
        );
        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
            <Droplets className="w-6 h-6 text-primary-foreground" />
          </div>
          <div className="hidden sm:block">
            <h2 className="font-bold text-foreground">BobSWMM</h2>
            <p className="text-xs text-muted-foreground">ICM Guide</p>
          </div>
        </div>

        <nav className="flex items-center gap-1">
          {navItems.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              size="sm"
              onClick={() => scrollToSection(item.href)}
              className={cn(
                "transition-colors",
                activeSection === item.id
                  ? "text-primary bg-primary/10 hover:bg-primary/15"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.label}
            </Button>
          ))}
        </nav>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="relative"
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </header>
  );
};

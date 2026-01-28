import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Search, 
  BookOpen, 
  HelpCircle, 
  Workflow, 
  Lightbulb, 
  Play, 
  ExternalLink,
  Clock,
  CheckCircle2,
  Circle,
  Video,
  FileText,
  Code,
  Copy,
  Check,
  FolderTree,
  FileCode2
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

type ICMVersion = "sewer" | "flood" | "ultimate" | "viewer" | "all";

interface FAQItem {
  question: string;
  answer: string;
  versions: ICMVersion[];
  tags: string[];
  videoUrl?: string;
  videoTitle?: string;
  videoDuration?: string;
}

interface TutorialStep {
  text: string;
  tip?: string;
  warning?: string;
}

interface Tutorial {
  title: string;
  description: string;
  steps: TutorialStep[];
  versions: ICMVersion[];
  difficulty: "beginner" | "intermediate" | "advanced";
  tags: string[];
  estimatedTime?: string;
  videoUrl?: string;
  videoTitle?: string;
  videoDuration?: string;
  resources?: { title: string; url: string }[];
}

const faqs: FAQItem[] = [
  {
    question: "What's the difference between ICM Sewer and ICM Flood?",
    answer: "ICM Sewer is designed specifically for 1D sewer and stormwater network modeling, focusing on pipe hydraulics and collection system design. ICM Flood adds 2D surface flooding capabilities, river modeling, and integrated 1D/2D analysis for overland flow simulation. Choose Sewer for pipe-focused projects and Flood for surface water and flood risk analysis.",
    versions: ["sewer", "flood"],
    tags: ["comparison", "getting started", "selection"],
    videoUrl: "https://www.youtube.com/watch?v=example1",
    videoTitle: "ICM Product Comparison Overview",
    videoDuration: "8:24"
  },
  {
    question: "How do I switch between ICM modes using shortcut flags?",
    answer: "Right-click your ICM desktop shortcut, select Properties, and add the appropriate flag after the target path: \"/ADSK:Sewer\" for ICM Sewer mode, \"/ADSK:Flood\" for ICM Flood mode, \"/ADSK:Ultimate\" for full access, or \"/ADSK:Viewer\" for view-only mode. This allows one installation to function as multiple products.",
    versions: ["all"],
    tags: ["shortcuts", "configuration", "setup"],
    videoUrl: "https://www.youtube.com/watch?v=example2",
    videoTitle: "Setting Up ICM Shortcut Flags",
    videoDuration: "3:15"
  },
  {
    question: "Can I open InfoWorks ICM models in ICM Viewer?",
    answer: "Yes, ICM Viewer can open and display both InfoWorks ICM native network files and EPA SWMM models. However, you cannot edit or run simulations in Viewer mode—it's strictly for reviewing model geometry, data, and results that were created in other ICM versions.",
    versions: ["viewer"],
    tags: ["file formats", "compatibility", "viewing"]
  },
  {
    question: "What is the 1D/2D integrated modeling approach?",
    answer: "Integrated 1D/2D modeling combines traditional pipe network (1D) simulation with surface flow (2D) simulation. The 1D model handles sewers, culverts, and channels while the 2D mesh simulates overland flooding. They interact dynamically—water can surcharge from pipes onto surfaces and re-enter the drainage system elsewhere. This approach is essential for accurate urban flood modeling.",
    versions: ["flood", "ultimate"],
    tags: ["modeling", "2D", "flood analysis"],
    videoUrl: "https://www.youtube.com/watch?v=example3",
    videoTitle: "Understanding 1D/2D Integration in ICM",
    videoDuration: "12:45"
  },
  {
    question: "How do I import EPA SWMM models into ICM?",
    answer: "Go to File → Open, select 'SWMM Files (*.inp)' from the file type dropdown, and browse to your .inp file. ICM will parse the SWMM network, converting it to the ICM data model while preserving hydraulic parameters. Some SWMM-specific features may require manual adjustment after import.",
    versions: ["sewer", "flood", "ultimate"],
    tags: ["SWMM", "import", "file formats"],
    videoUrl: "https://www.youtube.com/watch?v=example4",
    videoTitle: "SWMM to ICM Import Tutorial",
    videoDuration: "6:30"
  },
  {
    question: "What's included in ICM Ultimate that isn't in Sewer or Flood?",
    answer: "ICM Ultimate provides access to ALL capabilities from both ICM Sewer and ICM Flood in a single license. This means you get sewer network modeling, 2D surface flooding, river hydraulics, water quality, and RTC simulation. Ultimate is ideal for organizations that work on diverse water infrastructure projects requiring both sewer and flood modeling capabilities.",
    versions: ["ultimate"],
    tags: ["comparison", "features", "licensing"]
  },
  {
    question: "How do I set up Real-Time Control (RTC) rules?",
    answer: "RTC rules are configured in the RTC Editor: Right-click your network and select 'RTC Rules'. Define control structures (pumps, gates, weirs), set trigger conditions based on levels, flows, or time, and specify actions. Test rules using the RTC simulator before running full hydraulic simulations. RTC is available in ICM Sewer and Ultimate.",
    versions: ["sewer", "ultimate"],
    tags: ["RTC", "control", "automation"],
    videoUrl: "https://www.youtube.com/watch?v=example5",
    videoTitle: "RTC Rules Configuration Guide",
    videoDuration: "15:20"
  },
  {
    question: "Can I share models with colleagues who don't have ICM?",
    answer: "Yes, you can export results to common formats (CSV, shapefiles, PDFs) for sharing. For interactive model review, colleagues can use ICM Viewer, which is a free/lower-cost option that allows opening and exploring models without editing capabilities. This is ideal for client reviews and stakeholder presentations.",
    versions: ["all"],
    tags: ["collaboration", "export", "sharing"]
  },
  {
    question: "How do I create a 2D mesh for flood modeling?",
    answer: "In ICM Flood or Ultimate: 1) Define your 2D zone boundary polygon, 2) Import terrain data (DEM/DTM), 3) Set mesh parameters (cell size, roughness zones), 4) Generate the mesh using the 2D Mesh Generator. Refine mesh density in critical areas like flow paths and around structures for accurate results.",
    versions: ["flood", "ultimate"],
    tags: ["2D", "mesh", "terrain", "setup"],
    videoUrl: "https://www.youtube.com/watch?v=example6",
    videoTitle: "Creating 2D Meshes Step-by-Step",
    videoDuration: "18:45"
  },
  {
    question: "What file formats can ICM export results to?",
    answer: "ICM can export to: CSV/Excel for tabular data, Shapefiles and GeoDatabase for GIS, AutoCAD DXF/DWG for CAD, image formats (PNG, JPG) for maps and graphs, PDF for reports, and proprietary formats for exchange with other Autodesk products. Use File → Export or right-click specific elements for export options.",
    versions: ["sewer", "flood", "ultimate"],
    tags: ["export", "file formats", "GIS", "CAD"]
  }
];

const tutorials: Tutorial[] = [
  {
    title: "Getting Started: Building Your First Sewer Network",
    description: "Learn the basics of creating a sewer collection system from scratch, including nodes, links, and catchments.",
    estimatedTime: "45 min",
    videoUrl: "https://www.youtube.com/watch?v=sewer-tutorial",
    videoTitle: "Complete Sewer Network Tutorial",
    videoDuration: "32:15",
    steps: [
      { text: "Create a new Transportable Database and Network", tip: "Use File → New → Transportable Database for portable projects" },
      { text: "Add manholes using the Node tool - set invert elevations and ground levels", tip: "Press 'N' as a keyboard shortcut for the Node tool" },
      { text: "Connect manholes with conduits using the Link tool - specify pipe diameter and material", warning: "Ensure upstream invert is higher than downstream for proper gravity flow" },
      { text: "Define subcatchments and assign runoff parameters", tip: "Use GIS import for complex catchment boundaries" },
      { text: "Add a rainfall event from the library or create a custom hyetograph" },
      { text: "Run a hydraulic simulation and review results", tip: "Start with a short simulation to verify setup before full runs" },
      { text: "Use thematic mapping to visualize pipe capacity and flooding" }
    ],
    versions: ["sewer", "ultimate"],
    difficulty: "beginner",
    tags: ["sewer", "network design", "getting started"],
    resources: [
      { title: "ICM Sewer Quick Start Guide (PDF)", url: "#" },
      { title: "Sample Sewer Network Dataset", url: "#" }
    ]
  },
  {
    title: "Setting Up a 2D Flood Model",
    description: "Complete workflow for creating an integrated 1D/2D model to simulate surface flooding.",
    estimatedTime: "90 min",
    videoUrl: "https://www.youtube.com/watch?v=2d-flood-tutorial",
    videoTitle: "2D Flood Modeling Masterclass",
    videoDuration: "48:30",
    steps: [
      { text: "Import your existing 1D sewer/drainage network or create a new one" },
      { text: "Import Digital Terrain Model (DTM) data via GIS import", tip: "Supported formats: ASCII Grid, GeoTIFF, ESRI Grid" },
      { text: "Create a 2D Zone polygon covering your study area", warning: "Keep 2D zone at least 50m from model boundaries to avoid edge effects" },
      { text: "Configure 2D mesh parameters: base cell size, refinement regions, roughness zones", tip: "Start with 5-10m cells, refine to 1-2m in critical areas" },
      { text: "Generate the 2D mesh and verify mesh quality metrics", warning: "Check for elements with poor aspect ratios (>10:1)" },
      { text: "Define 1D/2D connection points (manholes that can surcharge to surface)" },
      { text: "Set up boundary conditions and rainfall" },
      { text: "Run an integrated 1D/2D simulation", tip: "Use 2D timestep multiplier of 4-8 for stability" },
      { text: "Animate flood depth results and create flood extent maps" }
    ],
    versions: ["flood", "ultimate"],
    difficulty: "intermediate",
    tags: ["2D", "flood", "mesh", "terrain"],
    resources: [
      { title: "2D Mesh Best Practices Guide", url: "#" },
      { title: "Sample DTM Dataset", url: "#" }
    ]
  },
  {
    title: "Importing and Converting EPA SWMM Models",
    description: "How to bring existing SWMM models into ICM and validate the conversion.",
    estimatedTime: "30 min",
    videoUrl: "https://www.youtube.com/watch?v=swmm-import",
    videoTitle: "SWMM to ICM Migration Guide",
    videoDuration: "22:10",
    steps: [
      { text: "Prepare your SWMM .inp file - ensure it runs successfully in SWMM first", warning: "Fix any SWMM errors before importing" },
      { text: "Open ICM and use File → Open → SWMM Files (*.inp)" },
      { text: "Review the import log for warnings about unsupported features", tip: "Common warnings: LID controls, custom curves, and API routines" },
      { text: "Check network geometry in the GeoPlan view" },
      { text: "Verify hydraulic parameters in the Grid view (compare key values to SWMM)" },
      { text: "Run a simulation with the same rainfall event used in SWMM" },
      { text: "Compare hydrographs and peak flows at key locations", tip: "Use the Results Comparison tool for side-by-side analysis" },
      { text: "Adjust any parameters that show significant differences" }
    ],
    versions: ["sewer", "flood", "ultimate"],
    difficulty: "intermediate",
    tags: ["SWMM", "import", "conversion", "validation"],
    resources: [
      { title: "SWMM-ICM Parameter Mapping Reference", url: "#" }
    ]
  },
  {
    title: "Configuring Shortcut Flags for Multi-Mode Access",
    description: "Set up Windows shortcuts to launch different ICM modes from a single installation.",
    estimatedTime: "10 min",
    steps: [
      { text: "Locate your ICM desktop shortcut or create one from the executable" },
      { text: "Right-click the shortcut and select 'Properties'" },
      { text: "In the Target field, add a space after the .exe path" },
      { text: "Add your desired flag: /ADSK:Sewer, /ADSK:Flood, /ADSK:Ultimate, or /ADSK:Viewer", tip: "Flags are case-insensitive" },
      { text: "Example: \"C:\\Program Files\\ICM\\ICM.exe\" /ADSK:Sewer" },
      { text: "Click OK to save" },
      { text: "Create additional shortcuts with different flags for quick mode switching" },
      { text: "Rename shortcuts clearly (e.g., 'ICM Sewer Mode', 'ICM Flood Mode')" }
    ],
    versions: ["all"],
    difficulty: "beginner",
    tags: ["shortcuts", "configuration", "setup", "Windows"]
  },
  {
    title: "Real-Time Control (RTC) Simulation Setup",
    description: "Configure automated control rules for pumps, gates, and other structures.",
    estimatedTime: "60 min",
    videoUrl: "https://www.youtube.com/watch?v=rtc-setup",
    videoTitle: "Advanced RTC Configuration",
    videoDuration: "35:45",
    steps: [
      { text: "Ensure your network includes controllable assets (pumps, sluice gates, weirs)" },
      { text: "Open the RTC Editor from the Network menu" },
      { text: "Create a new RTC rule set" },
      { text: "Add sensors: select nodes/links to monitor for trigger conditions", tip: "Place sensors upstream of control points for response time" },
      { text: "Define control logic: IF (sensor condition) THEN (action)", tip: "Use hysteresis to prevent rapid on/off cycling" },
      { text: "Example: IF Level at MH001 > 2.5m THEN Open Gate G01 to 100%" },
      { text: "Add time-based rules if needed (e.g., pump schedules)" },
      { text: "Save the RTC rule set and associate it with your simulation" },
      { text: "Run simulation and review RTC log to verify rule activation", warning: "Check for conflicting rules that may cause oscillation" }
    ],
    versions: ["sewer", "ultimate"],
    difficulty: "advanced",
    tags: ["RTC", "automation", "control", "pumps", "gates"],
    resources: [
      { title: "RTC Logic Reference Sheet", url: "#" },
      { title: "Sample RTC Rule Templates", url: "#" }
    ]
  },
  {
    title: "Creating Professional Flood Maps for Reports",
    description: "Generate publication-ready flood extent and depth maps from simulation results.",
    estimatedTime: "45 min",
    videoUrl: "https://www.youtube.com/watch?v=flood-maps",
    videoTitle: "Professional Flood Mapping Tutorial",
    videoDuration: "28:20",
    steps: [
      { text: "Complete your 2D flood simulation and load results" },
      { text: "Set the timestep to maximum flood extent (or create a maximum envelope)", tip: "Use Results → Create Max Envelope for peak conditions" },
      { text: "Apply flood depth thematic styling from the Themes panel" },
      { text: "Customize color ramps and depth classification ranges", tip: "Use standard hazard classifications: <0.15m, 0.15-0.3m, 0.3-0.6m, >0.6m" },
      { text: "Add a basemap (aerial imagery or street map) for context" },
      { text: "Insert legend, scale bar, and north arrow from Map Tools" },
      { text: "Add title block with simulation metadata" },
      { text: "Export as georeferenced image (GeoTIFF) or PDF" },
      { text: "For GIS delivery, export flood polygons as shapefiles", tip: "Include depth attribute for further analysis" }
    ],
    versions: ["flood", "ultimate"],
    difficulty: "intermediate",
    tags: ["mapping", "visualization", "reports", "export"]
  },
  {
    title: "Model Review Workflow with ICM Viewer",
    description: "Efficiently review and present models to stakeholders without editing capabilities.",
    estimatedTime: "20 min",
    steps: [
      { text: "Install ICM Viewer (or launch ICM with /ADSK:Viewer flag)" },
      { text: "Open the model database shared by your team" },
      { text: "Navigate the network using GeoPlan zoom, pan, and selection tools" },
      { text: "Use the Grid view to inspect element properties (read-only)" },
      { text: "Load simulation results and animate to show dynamic behavior", tip: "Use playback speed controls for presentations" },
      { text: "Create thematic maps to highlight key results" },
      { text: "Use Profile view to examine hydraulic grade lines" },
      { text: "Take screenshots or export views for presentations" },
      { text: "Add annotations using the markup tools for discussion points" }
    ],
    versions: ["viewer"],
    difficulty: "beginner",
    tags: ["viewing", "review", "presentation", "collaboration"]
  },
  {
    title: "Water Quality Modeling Setup",
    description: "Configure pollutant transport and treatment simulation in your sewer network.",
    estimatedTime: "75 min",
    videoUrl: "https://www.youtube.com/watch?v=water-quality",
    videoTitle: "Water Quality Modeling Deep Dive",
    videoDuration: "42:15",
    steps: [
      { text: "Enable water quality modeling in your simulation options" },
      { text: "Define pollutant parameters (e.g., TSS, BOD, nutrients)", tip: "Start with conservative decay rates and adjust based on calibration" },
      { text: "Assign pollutant buildup rates to subcatchments by land use" },
      { text: "Configure washoff parameters for rainfall-driven loading" },
      { text: "Add treatment at specific nodes if applicable (e.g., BMPs, treatment plants)", warning: "Treatment efficiencies vary significantly by storm intensity" },
      { text: "Set initial conditions for pollutant concentrations" },
      { text: "Run simulation and review pollutograph results" },
      { text: "Create mass balance reports and compare to regulatory limits" },
      { text: "Visualize pollutant transport using thematic animation" }
    ],
    versions: ["sewer", "ultimate"],
    difficulty: "advanced",
    tags: ["water quality", "pollutants", "treatment", "compliance"],
    resources: [
      { title: "Pollutant Parameter Database", url: "#" },
      { title: "Regulatory Compliance Checklist", url: "#" }
    ]
  }
];

const versionLabels: Record<ICMVersion, string> = {
  sewer: "ICM Sewer",
  flood: "ICM Flood",
  ultimate: "ICM Ultimate",
  viewer: "ICM Viewer",
  all: "All Versions"
};

const difficultyColors: Record<string, string> = {
  beginner: "bg-green-500/20 text-green-700 dark:text-green-400",
  intermediate: "bg-amber-500/20 text-amber-700 dark:text-amber-400",
  advanced: "bg-red-500/20 text-red-700 dark:text-red-400"
};

export const KnowledgeBase = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVersion, setSelectedVersion] = useState<ICMVersion | "all">("all");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Source code documentation for the app
  const sourceCodeDocs = [
    {
      id: "project-structure",
      title: "Project Structure",
      description: "Main files and folders in this ICM Software Guide application",
      icon: FolderTree,
      content: `src/
├── components/
│   ├── ICMComparisonTool.tsx    # Feature comparison matrix
│   ├── KnowledgeBase.tsx        # FAQs, tutorials, and docs
│   ├── PricingCalculator.tsx    # Breakeven analysis tool
│   ├── ProjectPlanner.tsx       # Needs assessment wizard
│   ├── QuoteRequestForm.tsx     # Vendor quote form
│   ├── VendorResources.tsx      # Official links
│   ├── Header.tsx               # Navigation
│   ├── Footer.tsx               # Site footer
│   └── ui/                      # shadcn/ui components
├── pages/
│   └── Index.tsx                # Main landing page
├── assets/                      # Images and media
└── index.css                    # Global styles & design tokens`
    },
    {
      id: "icm-comparison",
      title: "ICM Comparison Component",
      description: "How the feature comparison matrix works",
      icon: FileCode2,
      content: `// ICMComparisonTool.tsx - Key Types
interface ICMFeature {
  name: string;
  category: string;
  sewer: boolean | "partial";
  flood: boolean | "partial";
  ultimate: boolean | "partial";
  viewer: boolean | "partial";
  description: string;
  shortcut?: string;
}

// Features are grouped by category
const features: ICMFeature[] = [
  {
    name: "1D Sewer Network Modeling",
    category: "Core Modeling",
    sewer: true,
    flood: false,
    ultimate: true,
    viewer: false,
    description: "Design and simulate pipe networks"
  },
  // ... more features
];

// Render with category filtering and search
const filteredFeatures = features.filter(f => 
  matchesSearch && matchesCategory
);`
    },
    {
      id: "pricing-calculator",
      title: "Pricing Calculator Logic",
      description: "Breakeven analysis between subscription and Flex tokens",
      icon: FileCode2,
      content: `// PricingCalculator.tsx - Core Logic
const calculateBreakeven = (product: string, days: number) => {
  const pricing = {
    ultimate: { annual: 5340, daily: 63 },
    sewer: { annual: 4500, daily: 53 },
    flood: { annual: 4500, daily: 53 },
    viewer: { annual: 0, daily: 0 }
  };
  
  const p = pricing[product];
  const flexCost = days * p.daily;
  const subscriptionCost = p.annual;
  
  // Breakeven point calculation
  const breakevenDays = Math.ceil(p.annual / p.daily);
  
  return {
    flexCost,
    subscriptionCost,
    breakevenDays,
    recommendation: days >= breakevenDays 
      ? "subscription" 
      : "flex"
  };
};`
    },
    {
      id: "project-planner",
      title: "Project Planner Assessment",
      description: "How needs assessment generates recommendations",
      icon: FileCode2,
      content: `// ProjectPlanner.tsx - Recommendation Logic
type ProjectNeed = 
  | "sewer_modeling" 
  | "flood_modeling"
  | "water_quality"
  | "rtc_simulation"
  | "view_only";

const getRecommendation = (needs: ProjectNeed[]) => {
  // If both sewer AND flood needed → Ultimate
  if (needs.includes("sewer_modeling") && 
      needs.includes("flood_modeling")) {
    return "ICM Ultimate";
  }
  
  // Flood-only needs
  if (needs.includes("flood_modeling")) {
    return "ICM Flood";
  }
  
  // Sewer, WQ, or RTC → Sewer
  if (needs.some(n => 
    ["sewer_modeling", "water_quality", "rtc_simulation"]
      .includes(n))) {
    return "ICM Sewer";
  }
  
  // View-only mode
  return "ICM Viewer";
};`
    },
    {
      id: "design-system",
      title: "Design System & Theming",
      description: "CSS variables and Tailwind configuration",
      icon: FileCode2,
      content: `/* index.css - Design Tokens */
:root {
  --background: 210 40% 98%;
  --foreground: 222 47% 11%;
  --primary: 199 89% 48%;
  --primary-foreground: 0 0% 100%;
  --secondary: 210 40% 96%;
  --muted: 210 40% 96%;
  --accent: 199 89% 48%;
  --card: 0 0% 100%;
  --border: 214 32% 91%;
  
  /* Custom gradients */
  --gradient-primary: linear-gradient(
    135deg, 
    hsl(var(--primary)), 
    hsl(220, 80%, 60%)
  );
}

.dark {
  --background: 222 47% 8%;
  --foreground: 210 40% 98%;
  /* ... dark mode overrides */
}`
    },
    {
      id: "tech-stack",
      title: "Technology Stack",
      description: "Core dependencies and frameworks used",
      icon: FileCode2,
      content: `// package.json - Key Dependencies
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.30.1",
    
    // UI Framework
    "@radix-ui/react-*": "various",
    "tailwindcss": "^3.x",
    "class-variance-authority": "^0.7.1",
    
    // State & Forms
    "react-hook-form": "^7.61.1",
    "@hookform/resolvers": "^3.10.0",
    "zod": "^3.25.76",
    
    // Data & Charts
    "@tanstack/react-query": "^5.83.0",
    "recharts": "^2.15.4",
    
    // Utilities
    "lucide-react": "^0.462.0",
    "date-fns": "^3.6.0",
    "sonner": "^1.7.4"
  }
}`
    }
  ];

  const filteredFAQs = useMemo(() => {
    return faqs.filter(faq => {
      const matchesSearch = searchQuery === "" ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesVersion = selectedVersion === "all" ||
        faq.versions.includes("all") ||
        faq.versions.includes(selectedVersion);
      
      return matchesSearch && matchesVersion;
    });
  }, [searchQuery, selectedVersion]);

  const filteredTutorials = useMemo(() => {
    return tutorials.filter(tutorial => {
      const matchesSearch = searchQuery === "" ||
        tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tutorial.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tutorial.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesVersion = selectedVersion === "all" ||
        tutorial.versions.includes("all") ||
        tutorial.versions.includes(selectedVersion);
      
      return matchesSearch && matchesVersion;
    });
  }, [searchQuery, selectedVersion]);

  return (
    <Card className="bg-gradient-card shadow-medium border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          Knowledge Base
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search FAQs, tutorials, and workflows..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {(["all", "sewer", "flood", "ultimate", "viewer"] as const).map((version) => (
              <Badge
                key={version}
                variant={selectedVersion === version ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/20 transition-colors"
                onClick={() => setSelectedVersion(version)}
              >
                {version === "all" ? "All" : versionLabels[version]}
              </Badge>
            ))}
          </div>
        </div>

        {/* Tabs for FAQs, Tutorials, and Docs */}
        <Tabs defaultValue="faqs" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="faqs" className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4" />
              <span className="hidden sm:inline">FAQs</span> ({filteredFAQs.length})
            </TabsTrigger>
            <TabsTrigger value="tutorials" className="flex items-center gap-2">
              <Workflow className="w-4 h-4" />
              <span className="hidden sm:inline">Tutorials</span> ({filteredTutorials.length})
            </TabsTrigger>
            <TabsTrigger value="docs" className="flex items-center gap-2">
              <Code className="w-4 h-4" />
              <span className="hidden sm:inline">Source</span> Docs
            </TabsTrigger>
          </TabsList>

          {/* FAQs Tab */}
          <TabsContent value="faqs" className="mt-4">
            {filteredFAQs.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <HelpCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No FAQs match your search criteria.</p>
              </div>
            ) : (
              <Accordion type="single" collapsible className="w-full space-y-2">
                {filteredFAQs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`faq-${index}`}
                    className="border rounded-lg px-4 bg-background/50"
                  >
                    <AccordionTrigger className="text-left hover:no-underline">
                      <div className="flex flex-col items-start gap-2 pr-4">
                        <span className="font-medium">{faq.question}</span>
                        <div className="flex flex-wrap gap-1">
                          {faq.versions.map((version) => (
                            <Badge key={version} variant="secondary" className="text-xs">
                              {versionLabels[version]}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <p className="text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </p>
                        
                        {/* Video Link */}
                        {faq.videoUrl && (
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                              <Video className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-foreground">{faq.videoTitle}</p>
                              <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {faq.videoDuration}
                              </p>
                            </div>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="gap-1"
                              onClick={() => window.open(faq.videoUrl, '_blank')}
                            >
                              <Play className="w-3 h-3" />
                              Watch
                            </Button>
                          </div>
                        )}
                        
                        <div className="flex flex-wrap gap-1 pt-2 border-t">
                          {faq.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="text-xs cursor-pointer hover:bg-primary/10"
                              onClick={() => setSearchQuery(tag)}
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </TabsContent>

          {/* Tutorials Tab */}
          <TabsContent value="tutorials" className="mt-4">
            {filteredTutorials.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Workflow className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No tutorials match your search criteria.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTutorials.map((tutorial, index) => (
                  <Card key={index} className="bg-background/50 border">
                    <CardContent className="p-4">
                      <div className="flex flex-col gap-4">
                        {/* Header */}
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <Lightbulb className="w-5 h-5 text-primary flex-shrink-0" />
                            <h4 className="font-semibold text-foreground">{tutorial.title}</h4>
                          </div>
                          <div className="flex items-center gap-2">
                            {tutorial.estimatedTime && (
                              <Badge variant="outline" className="text-xs gap-1">
                                <Clock className="w-3 h-3" />
                                {tutorial.estimatedTime}
                              </Badge>
                            )}
                            <Badge className={difficultyColors[tutorial.difficulty]}>
                              {tutorial.difficulty}
                            </Badge>
                          </div>
                        </div>
                        
                        {/* Description */}
                        <p className="text-sm text-muted-foreground">{tutorial.description}</p>
                        
                        {/* Video Link */}
                        {tutorial.videoUrl && (
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                              <Video className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-foreground">{tutorial.videoTitle}</p>
                              <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {tutorial.videoDuration}
                              </p>
                            </div>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="gap-1"
                              onClick={() => window.open(tutorial.videoUrl, '_blank')}
                            >
                              <Play className="w-3 h-3" />
                              Watch
                            </Button>
                          </div>
                        )}
                        
                        {/* Version badges */}
                        <div className="flex flex-wrap gap-1">
                          {tutorial.versions.map((version) => (
                            <Badge key={version} variant="secondary" className="text-xs">
                              {versionLabels[version]}
                            </Badge>
                          ))}
                        </div>
                        
                        {/* Steps with Progress */}
                        <Accordion type="single" collapsible>
                          <AccordionItem value="steps" className="border rounded-lg px-3 bg-muted/30">
                            <AccordionTrigger className="text-sm font-medium py-3 hover:no-underline">
                              <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4 text-primary" />
                                View {tutorial.steps.length} Step-by-Step Guide
                              </div>
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="space-y-3 pb-2">
                                {tutorial.steps.map((step, stepIndex) => (
                                  <div 
                                    key={stepIndex} 
                                    className="flex gap-3 p-3 rounded-lg bg-background/60 border border-border/50"
                                  >
                                    <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold">
                                      {stepIndex + 1}
                                    </div>
                                    <div className="flex-1 space-y-2">
                                      <p className="text-sm text-foreground leading-relaxed">
                                        {step.text}
                                      </p>
                                      {step.tip && (
                                        <div className="flex items-start gap-2 p-2 rounded bg-green-500/10 border border-green-500/20 text-xs">
                                          <Lightbulb className="w-3.5 h-3.5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                                          <span className="text-green-700 dark:text-green-300">
                                            <strong>Tip:</strong> {step.tip}
                                          </span>
                                        </div>
                                      )}
                                      {step.warning && (
                                        <div className="flex items-start gap-2 p-2 rounded bg-amber-500/10 border border-amber-500/20 text-xs">
                                          <ExternalLink className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                                          <span className="text-amber-700 dark:text-amber-300">
                                            <strong>Note:</strong> {step.warning}
                                          </span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                        
                        {/* Resources */}
                        {tutorial.resources && tutorial.resources.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {tutorial.resources.map((resource, resIndex) => (
                              <Button
                                key={resIndex}
                                variant="ghost"
                                size="sm"
                                className="text-xs gap-1 h-7"
                                onClick={() => window.open(resource.url, '_blank')}
                              >
                                <FileText className="w-3 h-3" />
                                {resource.title}
                                <ExternalLink className="w-3 h-3" />
                              </Button>
                            ))}
                          </div>
                        )}
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 pt-2 border-t">
                          {tutorial.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="text-xs cursor-pointer hover:bg-primary/10"
                              onClick={() => setSearchQuery(tag)}
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Docs Tab - Source Code Documentation */}
          <TabsContent value="docs" className="mt-4">
            <div className="space-y-4">
              {/* Intro Card */}
              <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                      <Code className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">ICM Software Guide - Source Documentation</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Explore how this SSF (Storm Sewer Flood) modeling decision tool is built. 
                        View component architecture, key algorithms, and the design system.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Source Code Sections */}
              <Accordion type="single" collapsible className="w-full space-y-2">
                {sourceCodeDocs.map((doc) => (
                  <AccordionItem
                    key={doc.id}
                    value={doc.id}
                    className="border rounded-lg px-4 bg-background/50"
                  >
                    <AccordionTrigger className="text-left hover:no-underline">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-md bg-muted">
                          <doc.icon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <span className="font-medium">{doc.title}</span>
                          <p className="text-xs text-muted-foreground">{doc.description}</p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="relative">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2 h-8 gap-1 text-xs"
                          onClick={() => copyToClipboard(doc.content, doc.id)}
                        >
                          {copiedCode === doc.id ? (
                            <>
                              <Check className="w-3 h-3" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              Copy
                            </>
                          )}
                        </Button>
                        <ScrollArea className="h-[300px] w-full rounded-md border bg-muted/30 p-4">
                          <pre className="text-xs font-mono text-foreground whitespace-pre-wrap">
                            {doc.content}
                          </pre>
                        </ScrollArea>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              {/* GitHub Link Suggestion */}
              <Card className="bg-background/50 border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileCode2 className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Full Source Code</p>
                        <p className="text-xs text-muted-foreground">View the complete repository on GitHub</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="gap-2">
                      <ExternalLink className="w-4 h-4" />
                      View Repo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

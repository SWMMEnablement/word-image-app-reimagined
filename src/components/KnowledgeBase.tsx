import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search, BookOpen, HelpCircle, Workflow, Lightbulb } from "lucide-react";

type ICMVersion = "sewer" | "flood" | "ultimate" | "viewer" | "all";

interface FAQItem {
  question: string;
  answer: string;
  versions: ICMVersion[];
  tags: string[];
}

interface Tutorial {
  title: string;
  description: string;
  steps: string[];
  versions: ICMVersion[];
  difficulty: "beginner" | "intermediate" | "advanced";
  tags: string[];
}

const faqs: FAQItem[] = [
  {
    question: "What's the difference between ICM Sewer and ICM Flood?",
    answer: "ICM Sewer is designed specifically for 1D sewer and stormwater network modeling, focusing on pipe hydraulics and collection system design. ICM Flood adds 2D surface flooding capabilities, river modeling, and integrated 1D/2D analysis for overland flow simulation. Choose Sewer for pipe-focused projects and Flood for surface water and flood risk analysis.",
    versions: ["sewer", "flood"],
    tags: ["comparison", "getting started", "selection"]
  },
  {
    question: "How do I switch between ICM modes using shortcut flags?",
    answer: "Right-click your ICM desktop shortcut, select Properties, and add the appropriate flag after the target path: \"/ADSK:Sewer\" for ICM Sewer mode, \"/ADSK:Flood\" for ICM Flood mode, \"/ADSK:Ultimate\" for full access, or \"/ADSK:Viewer\" for view-only mode. This allows one installation to function as multiple products.",
    versions: ["all"],
    tags: ["shortcuts", "configuration", "setup"]
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
    tags: ["modeling", "2D", "flood analysis"]
  },
  {
    question: "How do I import EPA SWMM models into ICM?",
    answer: "Go to File → Open, select 'SWMM Files (*.inp)' from the file type dropdown, and browse to your .inp file. ICM will parse the SWMM network, converting it to the ICM data model while preserving hydraulic parameters. Some SWMM-specific features may require manual adjustment after import.",
    versions: ["sewer", "flood", "ultimate"],
    tags: ["SWMM", "import", "file formats"]
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
    tags: ["RTC", "control", "automation"]
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
    tags: ["2D", "mesh", "terrain", "setup"]
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
    steps: [
      "Create a new Transportable Database and Network",
      "Add manholes using the Node tool - set invert elevations and ground levels",
      "Connect manholes with conduits using the Link tool - specify pipe diameter and material",
      "Define subcatchments and assign runoff parameters",
      "Add a rainfall event from the library or create a custom hyetograph",
      "Run a hydraulic simulation and review results",
      "Use thematic mapping to visualize pipe capacity and flooding"
    ],
    versions: ["sewer", "ultimate"],
    difficulty: "beginner",
    tags: ["sewer", "network design", "getting started"]
  },
  {
    title: "Setting Up a 2D Flood Model",
    description: "Complete workflow for creating an integrated 1D/2D model to simulate surface flooding.",
    steps: [
      "Import your existing 1D sewer/drainage network or create a new one",
      "Import Digital Terrain Model (DTM) data via GIS import",
      "Create a 2D Zone polygon covering your study area",
      "Configure 2D mesh parameters: base cell size, refinement regions, roughness zones",
      "Generate the 2D mesh and verify mesh quality metrics",
      "Define 1D/2D connection points (manholes that can surcharge to surface)",
      "Set up boundary conditions and rainfall",
      "Run an integrated 1D/2D simulation",
      "Animate flood depth results and create flood extent maps"
    ],
    versions: ["flood", "ultimate"],
    difficulty: "intermediate",
    tags: ["2D", "flood", "mesh", "terrain"]
  },
  {
    title: "Importing and Converting EPA SWMM Models",
    description: "How to bring existing SWMM models into ICM and validate the conversion.",
    steps: [
      "Prepare your SWMM .inp file - ensure it runs successfully in SWMM first",
      "Open ICM and use File → Open → SWMM Files (*.inp)",
      "Review the import log for warnings about unsupported features",
      "Check network geometry in the GeoPlan view",
      "Verify hydraulic parameters in the Grid view (compare key values to SWMM)",
      "Run a simulation with the same rainfall event used in SWMM",
      "Compare hydrographs and peak flows at key locations",
      "Adjust any parameters that show significant differences"
    ],
    versions: ["sewer", "flood", "ultimate"],
    difficulty: "intermediate",
    tags: ["SWMM", "import", "conversion", "validation"]
  },
  {
    title: "Configuring Shortcut Flags for Multi-Mode Access",
    description: "Set up Windows shortcuts to launch different ICM modes from a single installation.",
    steps: [
      "Locate your ICM desktop shortcut or create one from the executable",
      "Right-click the shortcut and select 'Properties'",
      "In the Target field, add a space after the .exe path",
      "Add your desired flag: /ADSK:Sewer, /ADSK:Flood, /ADSK:Ultimate, or /ADSK:Viewer",
      "Example: \"C:\\Program Files\\ICM\\ICM.exe\" /ADSK:Sewer",
      "Click OK to save",
      "Create additional shortcuts with different flags for quick mode switching",
      "Rename shortcuts clearly (e.g., 'ICM Sewer Mode', 'ICM Flood Mode')"
    ],
    versions: ["all"],
    difficulty: "beginner",
    tags: ["shortcuts", "configuration", "setup", "Windows"]
  },
  {
    title: "Real-Time Control (RTC) Simulation Setup",
    description: "Configure automated control rules for pumps, gates, and other structures.",
    steps: [
      "Ensure your network includes controllable assets (pumps, sluice gates, weirs)",
      "Open the RTC Editor from the Network menu",
      "Create a new RTC rule set",
      "Add sensors: select nodes/links to monitor for trigger conditions",
      "Define control logic: IF (sensor condition) THEN (action)",
      "Example: IF Level at MH001 > 2.5m THEN Open Gate G01 to 100%",
      "Add time-based rules if needed (e.g., pump schedules)",
      "Save the RTC rule set and associate it with your simulation",
      "Run simulation and review RTC log to verify rule activation"
    ],
    versions: ["sewer", "ultimate"],
    difficulty: "advanced",
    tags: ["RTC", "automation", "control", "pumps", "gates"]
  },
  {
    title: "Creating Professional Flood Maps for Reports",
    description: "Generate publication-ready flood extent and depth maps from simulation results.",
    steps: [
      "Complete your 2D flood simulation and load results",
      "Set the timestep to maximum flood extent (or create a maximum envelope)",
      "Apply flood depth thematic styling from the Themes panel",
      "Customize color ramps and depth classification ranges",
      "Add a basemap (aerial imagery or street map) for context",
      "Insert legend, scale bar, and north arrow from Map Tools",
      "Add title block with simulation metadata",
      "Export as georeferenced image (GeoTIFF) or PDF",
      "For GIS delivery, export flood polygons as shapefiles"
    ],
    versions: ["flood", "ultimate"],
    difficulty: "intermediate",
    tags: ["mapping", "visualization", "reports", "export"]
  },
  {
    title: "Model Review Workflow with ICM Viewer",
    description: "Efficiently review and present models to stakeholders without editing capabilities.",
    steps: [
      "Install ICM Viewer (or launch ICM with /ADSK:Viewer flag)",
      "Open the model database shared by your team",
      "Navigate the network using GeoPlan zoom, pan, and selection tools",
      "Use the Grid view to inspect element properties (read-only)",
      "Load simulation results and animate to show dynamic behavior",
      "Create thematic maps to highlight key results",
      "Use Profile view to examine hydraulic grade lines",
      "Take screenshots or export views for presentations",
      "Add annotations using the markup tools for discussion points"
    ],
    versions: ["viewer"],
    difficulty: "beginner",
    tags: ["viewing", "review", "presentation", "collaboration"]
  },
  {
    title: "Water Quality Modeling Setup",
    description: "Configure pollutant transport and treatment simulation in your sewer network.",
    steps: [
      "Enable water quality modeling in your simulation options",
      "Define pollutant parameters (e.g., TSS, BOD, nutrients)",
      "Assign pollutant buildup rates to subcatchments by land use",
      "Configure washoff parameters for rainfall-driven loading",
      "Add treatment at specific nodes if applicable (e.g., BMPs, treatment plants)",
      "Set initial conditions for pollutant concentrations",
      "Run simulation and review pollutograph results",
      "Create mass balance reports and compare to regulatory limits",
      "Visualize pollutant transport using thematic animation"
    ],
    versions: ["sewer", "ultimate"],
    difficulty: "advanced",
    tags: ["water quality", "pollutants", "treatment", "compliance"]
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

        {/* Tabs for FAQs and Tutorials */}
        <Tabs defaultValue="faqs" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="faqs" className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4" />
              FAQs ({filteredFAQs.length})
            </TabsTrigger>
            <TabsTrigger value="tutorials" className="flex items-center gap-2">
              <Workflow className="w-4 h-4" />
              Tutorials ({filteredTutorials.length})
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
                      <p className="text-muted-foreground leading-relaxed pb-2">
                        {faq.answer}
                      </p>
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
                      <div className="flex flex-col gap-3">
                        {/* Header */}
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <Lightbulb className="w-5 h-5 text-primary flex-shrink-0" />
                            <h4 className="font-semibold text-foreground">{tutorial.title}</h4>
                          </div>
                          <Badge className={difficultyColors[tutorial.difficulty]}>
                            {tutorial.difficulty}
                          </Badge>
                        </div>
                        
                        {/* Description */}
                        <p className="text-sm text-muted-foreground">{tutorial.description}</p>
                        
                        {/* Version badges */}
                        <div className="flex flex-wrap gap-1">
                          {tutorial.versions.map((version) => (
                            <Badge key={version} variant="secondary" className="text-xs">
                              {versionLabels[version]}
                            </Badge>
                          ))}
                        </div>
                        
                        {/* Steps */}
                        <Accordion type="single" collapsible>
                          <AccordionItem value="steps" className="border-0">
                            <AccordionTrigger className="text-sm font-medium py-2 hover:no-underline">
                              View {tutorial.steps.length} Steps
                            </AccordionTrigger>
                            <AccordionContent>
                              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                                {tutorial.steps.map((step, stepIndex) => (
                                  <li key={stepIndex} className="leading-relaxed">
                                    {step}
                                  </li>
                                ))}
                              </ol>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                        
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
        </Tabs>
      </CardContent>
    </Card>
  );
};

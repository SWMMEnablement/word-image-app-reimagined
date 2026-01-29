import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Workflow, 
  ArrowRight, 
  Clock, 
  Users, 
  AlertTriangle,
  CheckCircle2,
  Code,
  Copy,
  Check,
  FileText,
  ExternalLink,
  Play,
  Lightbulb,
  Wrench,
  Zap,
  BookOpen
} from "lucide-react";

interface WorkflowStep {
  step: number;
  title: string;
  description: string;
  duration: string;
  staffRole?: string;
  pitfalls?: string[];
  tips?: string[];
}

interface Workflow {
  id: string;
  title: string;
  description: string;
  totalTime: string;
  staffNeeded: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  icmVersions: string[];
  steps: WorkflowStep[];
  deliverables: string[];
}

interface Script {
  id: string;
  title: string;
  description: string;
  language: "python" | "ruby";
  useCase: string;
  code: string;
  dependencies?: string[];
}

interface MigrationStep {
  phase: string;
  tasks: string[];
  duration: string;
  validation: string[];
}

const workflows: Workflow[] = [
  {
    id: "flood-risk-study",
    title: "Complete Urban Flood Risk Study",
    description: "End-to-end workflow for producing a regulatory-compliant flood risk assessment",
    totalTime: "40-60 hours",
    staffNeeded: "1 Senior Modeler + 1 Junior",
    difficulty: "intermediate",
    icmVersions: ["ICM Flood", "ICM Ultimate"],
    steps: [
      {
        step: 1,
        title: "Data Collection & Preparation",
        description: "Gather LiDAR, survey data, sewer records, and historical flood events",
        duration: "8-12 hours",
        staffRole: "Junior Modeler",
        tips: ["Request LiDAR at minimum 1m resolution", "Collect at least 3 historical flood events for validation"],
        pitfalls: ["Missing manhole inverts cause calibration issues", "Outdated pipe diameters lead to capacity errors"]
      },
      {
        step: 2,
        title: "1D Network Construction",
        description: "Build sewer network from GIS/CAD, assign pipe properties, define catchments",
        duration: "10-15 hours",
        staffRole: "Senior Modeler",
        tips: ["Use Network Import Wizard for bulk import", "Set up consistent naming convention early"],
        pitfalls: ["Disconnected nodes won't be flagged until simulation", "Missing ground levels cause 2D coupling failures"]
      },
      {
        step: 3,
        title: "2D Mesh Generation",
        description: "Create terrain model, define 2D zone, generate and refine mesh",
        duration: "6-10 hours",
        staffRole: "Senior Modeler",
        tips: ["Start with 5m cells, refine to 2m in flow paths", "Use roughness zones to differentiate land use"],
        pitfalls: ["Mesh too coarse misses critical flow paths", "Boundary too close to area of interest causes edge effects"]
      },
      {
        step: 4,
        title: "1D/2D Integration",
        description: "Define flood types, connect manholes to 2D mesh, verify coupling",
        duration: "4-6 hours",
        staffRole: "Senior Modeler",
        tips: ["Use 'Bank' or 'Gully' flood type based on connection type", "Run short test simulation to verify coupling"],
        pitfalls: ["Wrong flood type causes unrealistic surcharge behavior", "Missing inline banks disconnect network from surface"]
      },
      {
        step: 5,
        title: "Design Storm Simulation",
        description: "Run 10, 50, 100-year storms with climate change uplifts",
        duration: "4-8 hours (run time)",
        staffRole: "Junior Modeler",
        tips: ["Use batch runs for multiple return periods", "Apply 20-40% climate change uplifts as standard"],
        pitfalls: ["Unstable 2D timestep causes premature termination", "Missing boundary conditions cause flooding at edges"]
      },
      {
        step: 6,
        title: "Results Analysis & Reporting",
        description: "Create flood maps, calculate flood depths/velocities, generate report",
        duration: "8-12 hours",
        staffRole: "Senior Modeler",
        tips: ["Use hazard classification (depth x velocity)", "Create maximum envelope for composite mapping"],
        pitfalls: ["Reporting peak without duration underestimates risk", "Missing validation section reduces report credibility"]
      }
    ],
    deliverables: [
      "Flood extent maps (10, 50, 100-year)",
      "Flood depth grids (GeoTIFF)",
      "Hazard classification maps",
      "Property-level flood risk register",
      "Technical report with methodology",
      "Model files and documentation"
    ]
  },
  {
    id: "sewer-capacity",
    title: "Sewer Capacity Assessment",
    description: "Systematic evaluation of collection system capacity for development planning",
    totalTime: "20-30 hours",
    staffNeeded: "1 Modeler",
    difficulty: "beginner",
    icmVersions: ["ICM Sewer", "ICM Ultimate"],
    steps: [
      {
        step: 1,
        title: "Network Verification",
        description: "Validate network geometry against as-built records",
        duration: "4-6 hours",
        tips: ["Run Network Validation tool first", "Flag pipes with >2% grade discrepancy"],
        pitfalls: ["Inverted pipe slopes cause reverse flow warnings"]
      },
      {
        step: 2,
        title: "Baseline Calibration",
        description: "Match model to flow monitoring data",
        duration: "6-10 hours",
        tips: ["Use dry weather flow for I&I estimation", "Target RMSE < 15% for peak flows"],
        pitfalls: ["Seasonal groundwater not captured in short monitoring"]
      },
      {
        step: 3,
        title: "Design Storm Analysis",
        description: "Run 2, 5, 10, 25-year storms, identify surcharge locations",
        duration: "4-6 hours",
        tips: ["Create summary table of pipes exceeding 80% capacity", "Identify critical paths with profile views"],
        pitfalls: ["Single-point downstream restriction can mask upstream issues"]
      },
      {
        step: 4,
        title: "Development Scenario Testing",
        description: "Add proposed development loads, re-run simulations",
        duration: "4-6 hours",
        tips: ["Use population density factors from planning docs", "Consider phased development scenarios"],
        pitfalls: ["Ignoring downstream impacts of upstream development"]
      },
      {
        step: 5,
        title: "Mitigation Options Analysis",
        description: "Test pipe upsizing, storage tanks, green infrastructure",
        duration: "4-8 hours",
        tips: ["Compare capital vs. operational costs", "Prioritize by cost-effectiveness ratio"],
        pitfalls: ["Oversized solutions may cause downstream flooding"]
      }
    ],
    deliverables: [
      "Capacity deficiency map",
      "Pipe-by-pipe capacity table",
      "Development impact analysis",
      "Mitigation options matrix",
      "Cost-benefit summary"
    ]
  }
];

const scripts: Script[] = [
  {
    id: "batch-export",
    title: "Batch Results Exporter",
    description: "Export simulation results from multiple scenarios to CSV",
    language: "ruby",
    useCase: "Automating post-processing for comparative analysis",
    code: `# ICM Ruby Script: Batch Export Results
# Export max depths from multiple scenarios to CSV

require 'csv'

scenarios = ['Baseline', '10yr', '50yr', '100yr']
output_file = 'C:/Results/max_depths_summary.csv'

CSV.open(output_file, 'wb') do |csv|
  csv << ['Node ID', 'Ground Level', *scenarios.map{|s| s + ' Max Depth'}]
  
  net = WSApplication.current_network
  net.row_objects('hw_node').each do |node|
    row = [node.id, node.ground_level]
    
    scenarios.each do |scenario|
      # Load scenario results
      results = net.load_results(scenario)
      max_depth = results.max_value(node, 'depth')
      row << (max_depth || 'N/A')
    end
    
    csv << row
  end
end

puts "Export complete: #{output_file}"`,
    dependencies: ["ICM Exchange license for Ruby scripting"]
  },
  {
    id: "qgis-export",
    title: "QGIS Flood Map Generator",
    description: "Export flood extents as styled shapefiles for GIS",
    language: "python",
    useCase: "Creating publication-ready flood maps",
    code: `# Python script for ICM flood extent processing
# Requires: geopandas, shapely

import geopandas as gpd
from shapely.geometry import Polygon
import numpy as np

def create_flood_polygons(max_depth_grid, threshold=0.15):
    """
    Convert depth grid to flood extent polygons
    threshold: minimum depth to include (meters)
    """
    # Read exported depth grid
    with rasterio.open(max_depth_grid) as src:
        depth = src.read(1)
        transform = src.transform
    
    # Create mask for flooded areas
    flooded = depth > threshold
    
    # Vectorize to polygons
    shapes = rasterio.features.shapes(
        flooded.astype(np.uint8), 
        transform=transform
    )
    
    polygons = []
    for geom, value in shapes:
        if value == 1:
            polygons.append(Polygon(geom['coordinates'][0]))
    
    # Create GeoDataFrame with hazard classification
    gdf = gpd.GeoDataFrame(
        {'geometry': polygons, 
         'hazard': classify_hazard(depth, polygons)}
    )
    
    return gdf

def classify_hazard(depth_grid, polygons):
    """Classify by maximum depth in each polygon"""
    hazards = []
    for poly in polygons:
        max_d = get_max_depth_in_poly(depth_grid, poly)
        if max_d < 0.3:
            hazards.append('Low')
        elif max_d < 0.6:
            hazards.append('Medium')
        else:
            hazards.append('High')
    return hazards`,
    dependencies: ["Python 3.8+", "geopandas", "rasterio", "shapely"]
  },
  {
    id: "rtc-optimizer",
    title: "RTC Rule Optimizer",
    description: "Analyze pump station performance and suggest RTC improvements",
    language: "ruby",
    useCase: "Optimizing real-time control strategies",
    code: `# ICM Ruby Script: RTC Performance Analyzer
# Analyze pump cycles and energy consumption

net = WSApplication.current_network
pump_stations = net.row_objects('hw_pump')

results = net.load_results('RTC_Baseline')
analysis_period = 24 * 3600  # 24 hours in seconds

report = []

pump_stations.each do |pump|
  # Get pump operation data
  on_times = results.get_ts_values(pump, 'pump_state')
  flows = results.get_ts_values(pump, 'discharge')
  
  # Calculate metrics
  cycles = count_on_off_cycles(on_times)
  total_runtime = calculate_runtime(on_times)
  avg_flow = flows.sum / flows.length
  
  # Energy estimate (simplified)
  power_kw = pump.rated_power || 50  # Default 50kW
  energy_kwh = (total_runtime / 3600.0) * power_kw
  
  report << {
    pump_id: pump.id,
    cycles: cycles,
    runtime_hrs: (total_runtime / 3600.0).round(2),
    energy_kwh: energy_kwh.round(1),
    avg_flow_lps: avg_flow.round(1),
    recommendation: generate_recommendation(cycles, total_runtime)
  }
end

# Output recommendations
report.each do |r|
  puts "#{r[:pump_id]}: #{r[:recommendation]}"
  puts "  - #{r[:cycles]} cycles, #{r[:runtime_hrs]} hrs, #{r[:energy_kwh]} kWh"
end

def generate_recommendation(cycles, runtime)
  if cycles > 20  # per day
    "HIGH CYCLING - Consider larger wet well or variable setpoints"
  elsif runtime > 20 * 3600  # 20+ hours
    "NEAR CONTINUOUS - Capacity concern, evaluate upsizing"
  else
    "Normal operation"
  end
end`,
    dependencies: ["ICM Exchange license", "RTC-enabled model"]
  }
];

const migrationGuide: MigrationStep[] = [
  {
    phase: "Phase 1: Pre-Migration Assessment",
    duration: "1-2 days",
    tasks: [
      "Run SWMM5 model to confirm baseline works",
      "Document SWMM version and any custom modifications",
      "List all external files (.dat, .ts, lookup tables)",
      "Identify LID controls, storage units, and custom curves",
      "Export key calibration targets (peak flows, timing)"
    ],
    validation: [
      "SWMM runs without errors",
      "All external files located and accessible",
      "Calibration metrics documented"
    ]
  },
  {
    phase: "Phase 2: Import & Initial Conversion",
    duration: "2-4 hours",
    tasks: [
      "Open ICM, File → Open → SWMM Files (*.inp)",
      "Review import log for warnings and errors",
      "Save as ICM transportable database",
      "Run network validation wizard",
      "Check node/link counts match SWMM"
    ],
    validation: [
      "Import log reviewed - critical errors = 0",
      "Node count matches: SWMM vs ICM",
      "Link count matches: SWMM vs ICM"
    ]
  },
  {
    phase: "Phase 3: Manual Adjustments",
    duration: "4-8 hours",
    tasks: [
      "Convert unsupported LID controls to equivalent storage",
      "Recreate custom rating curves in ICM format",
      "Update external timeseries links",
      "Adjust infiltration parameters (Green-Ampt → Horton if needed)",
      "Verify pump curves and control rules"
    ],
    validation: [
      "All LID controls have equivalent representation",
      "Custom curves recreated and validated",
      "Pump operations match expected behavior"
    ]
  },
  {
    phase: "Phase 4: Calibration Verification",
    duration: "1-2 days",
    tasks: [
      "Run same design storm used in SWMM",
      "Compare hydrographs at key locations",
      "Compare peak flows (target: <5% difference)",
      "Compare timing of peaks (target: <15 min difference)",
      "Document any systematic differences"
    ],
    validation: [
      "Peak flow difference < 5% at calibration points",
      "Peak timing difference < 15 minutes",
      "Volume balance within 10%"
    ]
  },
  {
    phase: "Phase 5: Documentation & Training",
    duration: "1-2 days",
    tasks: [
      "Document all conversion decisions",
      "Create comparison report (SWMM vs ICM results)",
      "Train team on ICM interface differences",
      "Establish ICM-specific QA/QC procedures"
    ],
    validation: [
      "Conversion log complete",
      "Comparison report approved",
      "Team trained on new workflows"
    ]
  }
];

export const ImplementationGuides = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const difficultyColors = {
    beginner: "bg-green-500/20 text-green-700 dark:text-green-400",
    intermediate: "bg-amber-500/20 text-amber-700 dark:text-amber-400",
    advanced: "bg-red-500/20 text-red-700 dark:text-red-400"
  };

  return (
    <TooltipProvider>
      <Card className="bg-gradient-card shadow-medium border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wrench className="w-5 h-5 text-primary" />
            Implementation Guides
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Deep technical content for serious practitioners - workflows, scripts, and migration guides
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="workflows" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="workflows" className="gap-2">
                <Workflow className="w-4 h-4" />
                <span className="hidden sm:inline">Complete</span> Workflows
              </TabsTrigger>
              <TabsTrigger value="scripts" className="gap-2">
                <Code className="w-4 h-4" />
                <span className="hidden sm:inline">Script</span> Library
              </TabsTrigger>
              <TabsTrigger value="migration" className="gap-2">
                <ArrowRight className="w-4 h-4" />
                SWMM Migration
              </TabsTrigger>
            </TabsList>

            {/* Workflows Tab */}
            <TabsContent value="workflows" className="mt-4 space-y-4">
              {workflows.map((workflow) => (
                <Card key={workflow.id} className="bg-background/50 border">
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <h4 className="font-semibold text-foreground">{workflow.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{workflow.description}</p>
                        </div>
                        <Badge className={difficultyColors[workflow.difficulty]}>
                          {workflow.difficulty}
                        </Badge>
                      </div>

                      {/* Metadata */}
                      <div className="flex flex-wrap gap-3 text-sm">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          {workflow.totalTime}
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Users className="w-4 h-4" />
                          {workflow.staffNeeded}
                        </div>
                        <div className="flex gap-1">
                          {workflow.icmVersions.map((v) => (
                            <Badge key={v} variant="outline" className="text-xs">
                              {v}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Steps */}
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="steps" className="border-0">
                          <AccordionTrigger className="py-2 hover:no-underline">
                            <span className="text-sm font-medium">
                              View {workflow.steps.length} Detailed Steps
                            </span>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-3 pt-2">
                              {workflow.steps.map((step) => (
                                <div key={step.step} className="p-3 bg-muted/30 rounded-lg border border-border/50">
                                  <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                                      {step.step}
                                    </div>
                                    <div className="flex-1 space-y-2">
                                      <div className="flex items-center justify-between">
                                        <h5 className="font-medium text-foreground">{step.title}</h5>
                                        <Badge variant="outline" className="text-xs gap-1">
                                          <Clock className="w-3 h-3" />
                                          {step.duration}
                                        </Badge>
                                      </div>
                                      <p className="text-sm text-muted-foreground">{step.description}</p>
                                      
                                      {step.tips && step.tips.length > 0 && (
                                        <div className="space-y-1">
                                          {step.tips.map((tip, i) => (
                                            <div key={i} className="flex items-start gap-2 text-xs p-2 bg-green-500/10 rounded border border-green-500/20">
                                              <Lightbulb className="w-3.5 h-3.5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                                              <span className="text-green-700 dark:text-green-300">{tip}</span>
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                      
                                      {step.pitfalls && step.pitfalls.length > 0 && (
                                        <div className="space-y-1">
                                          {step.pitfalls.map((pitfall, i) => (
                                            <div key={i} className="flex items-start gap-2 text-xs p-2 bg-amber-500/10 rounded border border-amber-500/20">
                                              <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                                              <span className="text-amber-700 dark:text-amber-300">{pitfall}</span>
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Deliverables */}
                            <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
                              <h5 className="font-medium text-foreground mb-2 flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-primary" />
                                Deliverables
                              </h5>
                              <ul className="grid sm:grid-cols-2 gap-1">
                                {workflow.deliverables.map((d, i) => (
                                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Check className="w-3 h-3 text-primary" />
                                    {d}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Scripts Tab */}
            <TabsContent value="scripts" className="mt-4 space-y-4">
              <div className="p-3 bg-muted/30 rounded-lg border border-border/50 mb-4">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Note:</strong> These scripts require ICM Exchange for Ruby 
                  or external Python with exported data. Adapt paths and parameters for your environment.
                </p>
              </div>
              
              {scripts.map((script) => (
                <Card key={script.id} className="bg-background/50 border">
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-foreground">{script.title}</h4>
                            <Badge variant="outline" className="text-xs">
                              {script.language === "python" ? "Python" : "Ruby"}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{script.description}</p>
                        </div>
                      </div>

                      <div className="text-sm">
                        <span className="font-medium text-foreground">Use case:</span>{" "}
                        <span className="text-muted-foreground">{script.useCase}</span>
                      </div>

                      {script.dependencies && (
                        <div className="flex flex-wrap gap-1">
                          <span className="text-xs text-muted-foreground">Requires:</span>
                          {script.dependencies.map((dep, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {dep}
                            </Badge>
                          ))}
                        </div>
                      )}

                      <div className="relative">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="absolute top-2 right-2 h-8 gap-1 text-xs"
                              onClick={() => copyCode(script.code, script.id)}
                            >
                              {copiedCode === script.id ? (
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
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Copy script to clipboard</p>
                          </TooltipContent>
                        </Tooltip>
                        <ScrollArea className="h-[250px] w-full rounded-md border bg-muted/30 p-4">
                          <pre className="text-xs font-mono text-foreground whitespace-pre-wrap">
                            {script.code}
                          </pre>
                        </ScrollArea>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Migration Tab */}
            <TabsContent value="migration" className="mt-4 space-y-4">
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                <div className="flex items-start gap-3">
                  <BookOpen className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground">SWMM → ICM Migration Checklist</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Complete workflow for migrating EPA SWMM5 models to ICM. 
                      Total estimated time: <strong className="text-foreground">3-5 days</strong> depending on model complexity.
                    </p>
                  </div>
                </div>
              </div>

              {migrationGuide.map((phase, idx) => (
                <Card key={idx} className="bg-background/50 border">
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                            {idx + 1}
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground">{phase.phase}</h4>
                            <p className="text-xs text-muted-foreground">Duration: {phase.duration}</p>
                          </div>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <h5 className="text-sm font-medium text-foreground mb-2">Tasks</h5>
                          <ul className="space-y-1">
                            {phase.tasks.map((task, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <CheckCircle2 className="w-4 h-4 text-muted-foreground/50 flex-shrink-0 mt-0.5" />
                                {task}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="text-sm font-medium text-foreground mb-2">Validation Criteria</h5>
                          <ul className="space-y-1">
                            {phase.validation.map((v, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <Zap className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                                {v}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};
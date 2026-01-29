import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Download, 
  FileText, 
  Table, 
  DollarSign, 
  Handshake, 
  Clock, 
  Calendar,
  Users,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Copy,
  Check,
  Lightbulb
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface NegotiationTip {
  id: string;
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  timing?: string;
  details: string[];
}

const negotiationTips: NegotiationTip[] = [
  {
    id: "timing",
    title: "Fiscal Quarter Timing",
    description: "End-of-quarter (March, June, September, December) typically offers 10-25% better deals",
    impact: "high",
    timing: "Best: Last 2 weeks of quarter",
    details: [
      "Sales teams have quarterly targets and are more flexible near deadlines",
      "Autodesk's fiscal year ends January 31 - November-January often has best deals",
      "Avoid purchasing in Q1 (Feb-Apr) when sales teams have fresh quotas"
    ]
  },
  {
    id: "volume",
    title: "Volume Discount Thresholds",
    description: "Significant breaks at 5, 10, and 20+ seats",
    impact: "high",
    details: [
      "5+ seats: Typically 10-15% discount",
      "10+ seats: Typically 15-25% discount",
      "20+ seats: Custom enterprise pricing, negotiate maintenance separately",
      "Consider multi-year commits for additional 5-10% savings"
    ]
  },
  {
    id: "sector",
    title: "Sector-Specific Pricing",
    description: "Government, education, and non-profits get substantial discounts",
    impact: "high",
    details: [
      "Government agencies: 30-50% off list price (GSA schedule pricing)",
      "Academic institutions: 80-90% off for educational use",
      "Non-profit organizations: 20-40% discounts available",
      "Startups may qualify for special programs - ask about Autodesk for Startups"
    ]
  },
  {
    id: "bundles",
    title: "Bundle Opportunities",
    description: "Combining with Civil 3D or other AEC products unlocks better pricing",
    impact: "medium",
    details: [
      "AEC Collection includes ICM and Civil 3D at combined pricing",
      "If you need both Civil 3D and ICM, bundling saves 15-30%",
      "Existing Autodesk customers often get loyalty pricing",
      "Ask about cross-grade pricing if switching from competitors"
    ]
  },
  {
    id: "flex",
    title: "Flex Token Strategy",
    description: "Use tokens for occasional needs, not as primary license",
    impact: "medium",
    timing: "For usage <80 days/year",
    details: [
      "Breakeven for Ultimate: ~80 days/year (subscription wins above this)",
      "Breakeven for Flood: ~81 days/year",
      "Breakeven for Sewer: ~76 days/year",
      "Buy tokens in bulk (500+) for ~10% discount on token cost"
    ]
  },
  {
    id: "multi-year",
    title: "Multi-Year Commitments",
    description: "3-year terms offer 25-30% savings vs. annual",
    impact: "medium",
    details: [
      "Lock in current pricing against potential increases",
      "Maintenance/support included throughout term",
      "May include upgrade rights to newer versions",
      "Negotiate payment terms (annual vs. upfront)"
    ]
  },
  {
    id: "reseller",
    title: "Reseller Competition",
    description: "Get quotes from multiple authorized resellers",
    impact: "medium",
    details: [
      "Resellers have different margin structures and flexibility",
      "Some specialize in water/infrastructure and offer better support",
      "Ask about value-adds: training credits, implementation support",
      "Large purchases may qualify for direct Autodesk enterprise deals"
    ]
  }
];

const impactColors = {
  high: "bg-primary/20 text-primary border-primary/30",
  medium: "bg-amber-500/20 text-amber-700 dark:text-amber-400 border-amber-500/30",
  low: "bg-muted text-muted-foreground border-border"
};

export const AnalysisExport = () => {
  const [copiedTip, setCopiedTip] = useState<string | null>(null);

  const copyTipToClipboard = (tip: NegotiationTip) => {
    const text = `${tip.title}\n\n${tip.description}\n\n${tip.details.join('\n')}`;
    navigator.clipboard.writeText(text);
    setCopiedTip(tip.id);
    toast({
      title: "Copied!",
      description: "Negotiation tip copied to clipboard"
    });
    setTimeout(() => setCopiedTip(null), 2000);
  };

  const generateAnalysisSummary = () => {
    const summary = `ICM SOFTWARE ANALYSIS SUMMARY
Generated: ${new Date().toLocaleDateString()}
===================================

NEGOTIATION CHECKLIST:
${negotiationTips.map(t => `□ ${t.title}: ${t.description}`).join('\n')}

KEY DISCOUNT OPPORTUNITIES:
• Fiscal quarter timing: 10-25% savings
• Volume discounts (5+, 10+, 20+ seats)
• Sector pricing (Government: 30-50%, Academic: 80-90%)
• Multi-year commitments: 25-30% savings
• Bundle with other Autodesk products

FLEX TOKEN BREAKEVEN POINTS:
• ICM Ultimate: ~80 days/year
• ICM Flood: ~81 days/year  
• ICM Sewer: ~76 days/year

NEXT STEPS:
1. Complete needs assessment in Project Planner
2. Run breakeven analysis with your usage estimate
3. Get quotes from multiple resellers
4. Time purchase near end of fiscal quarter

---
Generated by ICM Software Guide - BobSWMM Legacy
`;
    
    const blob = new Blob([summary], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'icm-analysis-summary.txt';
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Analysis Exported!",
      description: "Your analysis summary has been downloaded"
    });
  };

  const exportComparisonMatrix = () => {
    const csv = `Feature,ICM Sewer,ICM Flood,ICM Ultimate,ICM Viewer
Sewer Network Modeling,Yes,No,Yes,No
Stormwater Modeling,Yes,Yes,Yes,No
2D Surface Flooding,No,Yes,Yes,No
Integrated 1D/2D Modeling,No,Yes,Yes,No
River/Channel Modeling,No,Yes,Yes,No
InfoWorks Network Support,Yes,Yes,Yes,Yes
SWMM Network Support,Yes,Yes,Yes,Yes
Hydraulic Analysis,Yes,Yes,Yes,No
Water Quality Modeling,Yes,No,Yes,No
Scenario Management,Yes,Yes,Yes,No
Risk Assessment,No,Yes,Yes,No
Real-Time Control,Yes,No,Yes,No
3D Visualization,Yes,Yes,Yes,Yes
Animation Playback,Yes,Yes,Yes,Yes
Thematic Mapping,Yes,Yes,Yes,Yes
Profile Plots,Yes,Yes,Yes,Yes
Model Editing,Yes,Yes,Yes,No
Data Import/Export,Yes,Yes,Yes,No
Report Generation,Yes,Yes,Yes,No

Annual Subscription (approx.),$5500,$7500,$18000,Free
Flex Tokens/Day,24,31,75,N/A
Flex Cost/Day,$72,$93,$225,Free`;

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'icm-feature-comparison.csv';
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Comparison Exported!",
      description: "Feature comparison matrix downloaded as CSV"
    });
  };

  return (
    <TooltipProvider>
      <Card className="bg-gradient-card shadow-medium border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="w-5 h-5 text-primary" />
            Export Your Analysis
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Get immediate value before requesting quotes - download your analysis and negotiation guidance
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Export Actions */}
          <div className="grid sm:grid-cols-2 gap-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  className="h-auto p-4 flex flex-col items-start gap-2 text-left"
                  onClick={generateAnalysisSummary}
                >
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    <span className="font-semibold">Analysis Summary</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Download complete analysis with negotiation checklist
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Export your ICM analysis as a text file with all key insights</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  className="h-auto p-4 flex flex-col items-start gap-2 text-left"
                  onClick={exportComparisonMatrix}
                >
                  <div className="flex items-center gap-2">
                    <Table className="w-5 h-5 text-primary" />
                    <span className="font-semibold">Comparison Matrix</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Download feature comparison as CSV for spreadsheets
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Export the complete feature matrix to Excel or Google Sheets</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Negotiation Tips Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Handshake className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Vendor Negotiation Tips</h3>
              <Badge variant="feature" className="text-xs">Save 10-50%</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Insider guidance to get the best possible pricing from Autodesk resellers
            </p>

            <Accordion type="single" collapsible className="w-full space-y-2">
              {negotiationTips.map((tip) => (
                <AccordionItem
                  key={tip.id}
                  value={tip.id}
                  className="border rounded-lg px-4 bg-background/50"
                >
                  <AccordionTrigger className="hover:no-underline py-3">
                    <div className="flex items-center gap-3 flex-1">
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${impactColors[tip.impact]}`}
                      >
                        {tip.impact === "high" ? "High Impact" : tip.impact === "medium" ? "Medium Impact" : "Low Impact"}
                      </Badge>
                      <div className="flex-1 text-left">
                        <span className="font-medium text-foreground">{tip.title}</span>
                        <p className="text-xs text-muted-foreground mt-0.5">{tip.description}</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 pb-2">
                      {tip.timing && (
                        <div className="flex items-center gap-2 p-2 rounded bg-primary/5 border border-primary/20 text-sm">
                          <Clock className="w-4 h-4 text-primary" />
                          <span className="text-foreground">{tip.timing}</span>
                        </div>
                      )}
                      
                      <ul className="space-y-2">
                        {tip.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <ChevronRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="gap-1 mt-2"
                            onClick={() => copyTipToClipboard(tip)}
                          >
                            {copiedTip === tip.id ? (
                              <>
                                <Check className="w-3 h-3" />
                                Copied!
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                Copy tip
                              </>
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Copy this tip to share with your team</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Quick Summary Card */}
          <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-foreground mb-1">Maximum Savings Strategy</h4>
                <p className="text-sm text-muted-foreground">
                  Combine <strong className="text-foreground">end-of-quarter timing</strong> + {" "}
                  <strong className="text-foreground">volume discounts</strong> + {" "}
                  <strong className="text-foreground">multi-year commitment</strong> for potential savings of 35-45% off list price.
                  Government and academic users can achieve 50-90% discounts.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};
import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, Users, Clock, DollarSign, TrendingUp, AlertCircle, Check, Scale } from "lucide-react";

type LicenseType = "subscription" | "perpetual";
type LicenseTerm = "monthly" | "annual" | "3year";

interface PricingTier {
  id: string;
  name: string;
  description: string;
  monthlyBase: number;
  annualDiscount: number;
  threeYearDiscount: number;
  perpetualMultiplier: number;
  maintenanceRate: number;
  features: string[];
  recommended?: boolean;
  isFree?: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    id: "viewer",
    name: "ICM Viewer",
    description: "View-only access for stakeholders",
    monthlyBase: 0,
    annualDiscount: 0,
    threeYearDiscount: 0,
    perpetualMultiplier: 0,
    maintenanceRate: 0,
    features: ["View models & results", "Animation playback", "Report viewing", "No editing capabilities"],
    isFree: true
  },
  {
    id: "sewer",
    name: "ICM Sewer",
    description: "Sewer & stormwater networks",
    monthlyBase: 539,
    annualDiscount: 0.15,
    threeYearDiscount: 0.25,
    perpetualMultiplier: 24,
    maintenanceRate: 0.18,
    features: ["1D sewer modeling", "Stormwater drainage", "Water quality", "RTC simulation", "SWMM support"]
  },
  {
    id: "flood",
    name: "ICM Flood",
    description: "2D surface flooding analysis",
    monthlyBase: 735,
    annualDiscount: 0.15,
    threeYearDiscount: 0.25,
    perpetualMultiplier: 24,
    maintenanceRate: 0.18,
    features: ["2D surface flooding", "1D/2D integration", "River modeling", "Risk assessment", "Flood mapping"]
  },
  {
    id: "ultimate",
    name: "ICM Ultimate",
    description: "Complete 4-in-1 solution",
    monthlyBase: 1765,
    annualDiscount: 0.15,
    threeYearDiscount: 0.25,
    perpetualMultiplier: 22,
    maintenanceRate: 0.16,
    features: ["All Sewer features", "All Flood features", "Maximum flexibility", "Best value for mixed projects"],
    recommended: true
  }
];

export const PricingCalculator = () => {
  const [teamSize, setTeamSize] = useState(1);
  const [licenseType, setLicenseType] = useState<LicenseType>("subscription");
  const [licenseTerm, setLicenseTerm] = useState<LicenseTerm>("annual");
  const [selectedTier, setSelectedTier] = useState<string>("ultimate");
  const [usageDays, setUsageDays] = useState(100);

  // Flex token pricing data
  const flexPricing = {
    sewer: { tokensPerDay: 24, costPerDay: 72 },
    flood: { tokensPerDay: 31, costPerDay: 93 },
    ultimate: { tokensPerDay: 75, costPerDay: 225 }
  };

  // Annual subscription costs (at annual term)
  const annualSubscription = {
    sewer: 5498,
    flood: 7497,
    ultimate: 18003
  };

  const calculations = useMemo(() => {
    return pricingTiers.map(tier => {
      let costPerSeat: number;
      let totalCost: number;
      let period: string;
      let savings: number = 0;

      if (licenseType === "subscription") {
        const baseMonthly = tier.monthlyBase;
        
        if (licenseTerm === "monthly") {
          costPerSeat = baseMonthly;
          totalCost = costPerSeat * teamSize;
          period = "/month";
        } else if (licenseTerm === "annual") {
          const annualTotal = baseMonthly * 12 * (1 - tier.annualDiscount);
          costPerSeat = annualTotal;
          totalCost = costPerSeat * teamSize;
          savings = (baseMonthly * 12 - annualTotal) * teamSize;
          period = "/year";
        } else {
          const threeYearTotal = baseMonthly * 36 * (1 - tier.threeYearDiscount);
          costPerSeat = threeYearTotal;
          totalCost = costPerSeat * teamSize;
          savings = (baseMonthly * 36 - threeYearTotal) * teamSize;
          period = "/3 years";
        }
      } else {
        // Perpetual license
        costPerSeat = tier.monthlyBase * tier.perpetualMultiplier;
        const annualMaintenance = costPerSeat * tier.maintenanceRate;
        totalCost = (costPerSeat + annualMaintenance) * teamSize;
        period = " (one-time + annual maintenance)";
      }

      return {
        ...tier,
        costPerSeat: Math.round(costPerSeat),
        totalCost: Math.round(totalCost),
        period,
        savings: Math.round(savings),
        isSelected: tier.id === selectedTier
      };
    });
  }, [teamSize, licenseType, licenseTerm, selectedTier]);

  const selectedCalculation = calculations.find(c => c.id === selectedTier);
  const cheapestOption = [...calculations].sort((a, b) => a.totalCost - b.totalCost)[0];

  // Calculate combo savings (Sewer + Flood vs Ultimate)
  const comboAnalysis = useMemo(() => {
    const sewer = calculations.find(c => c.id === "sewer")!;
    const flood = calculations.find(c => c.id === "flood")!;
    const ultimate = calculations.find(c => c.id === "ultimate")!;
    
    const separateCost = sewer.totalCost + flood.totalCost;
    const ultimateSavings = separateCost - ultimate.totalCost;
    const savingsPercent = Math.round((ultimateSavings / separateCost) * 100);
    
    return {
      separateCost,
      ultimateCost: ultimate.totalCost,
      savings: ultimateSavings,
      savingsPercent
    };
  }, [calculations]);

  return (
    <Card className="bg-gradient-card shadow-medium border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-primary" />
          Pricing Calculator
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          Estimates based on typical Autodesk pricing. Contact your reseller for exact quotes.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Configuration Controls */}
        <div className="grid sm:grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
          {/* Team Size */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Team Size
              </Label>
              <Badge variant="secondary">{teamSize} {teamSize === 1 ? "seat" : "seats"}</Badge>
            </div>
            <Slider
              value={[teamSize]}
              onValueChange={(value) => setTeamSize(value[0])}
              min={1}
              max={20}
              step={1}
              className="w-full"
            />
          </div>

          {/* License Type */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              License Type
            </Label>
            <Select value={licenseType} onValueChange={(v) => setLicenseType(v as LicenseType)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="subscription">Subscription</SelectItem>
                <SelectItem value="perpetual">Perpetual</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Term Length */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {licenseType === "subscription" ? "Term Length" : "Includes Maintenance"}
            </Label>
            {licenseType === "subscription" ? (
              <Select value={licenseTerm} onValueChange={(v) => setLicenseTerm(v as LicenseTerm)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="annual">Annual (15-20% off)</SelectItem>
                  <SelectItem value="3year">3-Year (25-30% off)</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <div className="h-10 flex items-center text-sm text-muted-foreground">
                First year included
              </div>
            )}
          </div>
        </div>

        {/* Pricing Tiers Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {calculations.map((tier) => (
            <div
              key={tier.id}
              onClick={() => setSelectedTier(tier.id)}
              className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                tier.isSelected
                  ? "border-primary bg-primary/5 shadow-lg"
                  : "border-border hover:border-primary/50 bg-background/50"
              }`}
            >
              {tier.recommended && (
                <Badge className="absolute -top-2 right-2 bg-primary text-primary-foreground text-xs">
                  Best Value
                </Badge>
              )}
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-foreground">{tier.name}</h4>
                  <p className="text-xs text-muted-foreground">{tier.description}</p>
                </div>
                
                <div className="space-y-1">
                  {tier.isFree ? (
                    <>
                      <div className="text-2xl font-bold text-primary">
                        FREE
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Download from Autodesk
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-2xl font-bold text-foreground">
                        ${tier.costPerSeat.toLocaleString()}
                        <span className="text-sm font-normal text-muted-foreground">/seat</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {tier.period}
                      </div>
                    </>
                  )}
                </div>

                {tier.savings > 0 && (
                  <Badge variant="outline" className="text-primary border-primary/30 bg-primary/10">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Save ${tier.savings.toLocaleString()}
                  </Badge>
                )}

                <div className="pt-2 border-t space-y-1">
                  {tier.features.slice(0, 3).map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Check className="w-3 h-3 text-primary" />
                      {feature}
                    </div>
                  ))}
                  {tier.features.length > 3 && (
                    <div className="text-xs text-muted-foreground">
                      +{tier.features.length - 3} more features
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Section */}
        <div className="grid sm:grid-cols-2 gap-4">
          {/* Selected Tier Summary */}
          {selectedCalculation && (
            <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-primary" />
                Your Estimate: {selectedCalculation.name}
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Per seat cost:</span>
                  <span className="font-medium">${selectedCalculation.costPerSeat.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Number of seats:</span>
                  <span className="font-medium">{teamSize}</span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="font-medium">Total investment:</span>
                  <span className="text-xl font-bold text-primary">
                    ${selectedCalculation.totalCost.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Ultimate Value Insight */}
          <div className="p-4 bg-accent/30 rounded-lg border border-accent/50">
            <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              Ultimate vs. Separate Licenses
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sewer + Flood separately:</span>
                <span className="font-medium">${comboAnalysis.separateCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">ICM Ultimate:</span>
                <span className="font-medium">${comboAnalysis.ultimateCost.toLocaleString()}</span>
              </div>
              <div className="pt-2 border-t text-xs text-muted-foreground">
                <strong className="text-foreground">Why choose Ultimate?</strong> Unified workflow, 
                seamless 1D/2D integration, single license management, and full flexibility for 
                mixed sewer/flood projects without switching products.
              </div>
            </div>
          </div>
        </div>

        {/* Flex Token Pricing */}
        <div className="p-4 bg-muted/30 rounded-lg border border-border/40">
          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            Autodesk Flex Token Pricing
          </h4>
          <p className="text-xs text-muted-foreground mb-3">
            Pay-as-you-go option using Autodesk Flex tokens ($3/token)
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/40">
                  <th className="text-left py-2 font-medium text-foreground">Product Edition</th>
                  <th className="text-right py-2 font-medium text-foreground">Tokens/Day</th>
                  <th className="text-right py-2 font-medium text-foreground">Cost/Day</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/20">
                  <td className="py-2 text-muted-foreground">InfoWorks ICM Sewer</td>
                  <td className="text-right py-2 font-medium">24</td>
                  <td className="text-right py-2 font-medium">$72.00</td>
                </tr>
                <tr className="border-b border-border/20">
                  <td className="py-2 text-muted-foreground">InfoWorks ICM Flood</td>
                  <td className="text-right py-2 font-medium">31</td>
                  <td className="text-right py-2 font-medium">$93.00</td>
                </tr>
                <tr>
                  <td className="py-2 text-muted-foreground">InfoWorks ICM Ultimate</td>
                  <td className="text-right py-2 font-medium">75</td>
                  <td className="text-right py-2 font-medium">$225.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Breakeven Calculator */}
        <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Scale className="w-4 h-4 text-primary" />
            Subscription vs. Flex Breakeven Calculator
          </h4>
          <p className="text-xs text-muted-foreground mb-4">
            Find out which pricing model is more cost-effective based on your expected usage
          </p>
          
          {/* Usage Days Slider */}
          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Expected Usage Days per Year
              </Label>
              <Badge variant="secondary">{usageDays} days</Badge>
            </div>
            <Slider
              value={[usageDays]}
              onValueChange={(value) => setUsageDays(value[0])}
              min={1}
              max={260}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1 day</span>
              <span>~5 days/week = 260 days</span>
            </div>
          </div>

          {/* Breakeven Results */}
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { key: 'sewer', name: 'ICM Sewer', breakeven: Math.ceil(annualSubscription.sewer / flexPricing.sewer.costPerDay) },
              { key: 'flood', name: 'ICM Flood', breakeven: Math.ceil(annualSubscription.flood / flexPricing.flood.costPerDay) },
              { key: 'ultimate', name: 'ICM Ultimate', breakeven: Math.ceil(annualSubscription.ultimate / flexPricing.ultimate.costPerDay) }
            ].map((product) => {
              const flex = flexPricing[product.key as keyof typeof flexPricing];
              const sub = annualSubscription[product.key as keyof typeof annualSubscription];
              const flexCost = flex.costPerDay * usageDays;
              const isFlexBetter = flexCost < sub;
              const savings = Math.abs(sub - flexCost);
              
              return (
                <div key={product.key} className="p-3 rounded-lg bg-background/80 border border-border/40">
                  <div className="text-sm font-medium text-foreground mb-2">{product.name}</div>
                  <div className="text-xs text-muted-foreground mb-2">
                    Breakeven: <span className="font-medium text-foreground">{product.breakeven} days</span>
                  </div>
                  <div className={`text-xs font-medium ${isFlexBetter ? 'text-green-600 dark:text-green-400' : 'text-primary'}`}>
                    {isFlexBetter ? '✓ Flex is cheaper' : '✓ Subscription is cheaper'}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Save ${savings.toLocaleString()}/year
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-3 text-xs text-muted-foreground">
            <strong>Tip:</strong> If you use ICM more than the breakeven days, subscription saves money. For occasional use, Flex tokens are more economical.
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <a
            href="https://www.autodesk.com/resellers"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 p-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary-hover transition-colors font-medium"
          >
            <DollarSign className="w-4 h-4" />
            Get Official Quote from Reseller
          </a>
          <a
            href="https://www.autodesk.com/products/infoworks-icm/free-trial"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 p-3 rounded-lg border border-primary text-primary hover:bg-primary/10 transition-colors font-medium"
          >
            <Clock className="w-4 h-4" />
            Start 30-Day Free Trial
          </a>
        </div>

        {/* Disclaimer */}
        <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg text-sm text-muted-foreground">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <div>
            <p className="mb-2">
              <strong>Why estimates?</strong> Autodesk pricing varies by region, reseller discounts, volume licensing, 
              and promotional offers. These estimates are based on typical US pricing and help with initial budgeting.
            </p>
            <p>
              <strong>For accurate quotes:</strong> Contact an{" "}
              <a 
                href="https://www.autodesk.com/resellers" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                authorized Autodesk reseller
              </a>{" "}
              who can provide exact pricing for your organization and region.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
